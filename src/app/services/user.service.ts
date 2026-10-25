import { computed, inject, Injectable, signal } from '@angular/core';
import { UserDTO } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Users`;

  // טעינה ראשונית מה-LocalStorage
  currentUser = signal<UserDTO | null>(this.getSavedUser());

  // מחושב - תמיד יתעדכן כש-currentUser משתנה
  isAdmin = computed(() => (this.currentUser()?.Role ?? (this.currentUser() as any)?.role)?.toLowerCase() === 'admin');

  constructor() { }

  /**
   * הרשמה
   */
  register(userData: UserDTO, password: string): Observable<UserDTO> {
    // השרת מצפה לסיסמה בתוך גוף הבקשה (UserWithPasswordDTO)
    return this.http.post<UserDTO>(this.apiUrl, { ...userData, UserPassword: password }).pipe(
      tap(user => this.saveToLocal(user))
    );
  }
  // בתוך user.service.ts
  checkPasswordStrength(password: string): Observable<{ thePassword: string, level: number }> {
    return this.http.post<{ thePassword: string, level: number }>(
      `${environment.apiUrl}/Password`, // ודאי שה-URL הזה נכון
      { thePassword: password }
    );
  }
  /**
   * התחברות
   */
  login(email: string, password: string): Observable<UserDTO | null> {
    const loginData = { userEmail: email, userPassword: password };

    // השרת מחזיר { user, token } (או 204 ריק כשהפרטים שגויים)
    return this.http.post<{ user: UserDTO, token: string } | null>(`${this.apiUrl}/login`, loginData).pipe(
      map(res => res?.user ?? null),
      tap(user => {
        if (user) this.saveToLocal(user);
      })
    );
  }

  /**
   * עדכון פרטים - שינוי קטן כאן: שומרים את ה-Response מהשרת
   */
  updateUser(id: number, userData: UserDTO, password: string): Observable<UserDTO> {
    // השרת מצפה לסיסמה בתוך גוף הבקשה (UserWithPasswordDTO)
    return this.http.put<UserDTO>(`${this.apiUrl}/${id}`, { ...userData, UserPassword: password }).pipe(
      tap(updatedUserFromServer => {
        // שומרים את מה שחזר מהשרת - זה הכי בטוח
        const dataToSave = updatedUserFromServer || userData;
        this.saveToLocal(dataToSave);
      })
    );
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/${id}`);
  }

  logout() {
    // מוחק את עוגיית ה-jwt בשרת
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({ error: () => {} });
    this.currentUser.set(null);
    localStorage.removeItem('loggedUser');
  }

  // --- עזר ---

  private saveToLocal(user: UserDTO) {
    this.currentUser.set(user);
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  private getSavedUser(): UserDTO | null {
    const saved = localStorage.getItem('loggedUser');
    if (!saved) return null;
    try {
      return JSON.parse(saved) as UserDTO;
    } catch (e) {
      console.error('Error parsing user from storage', e);
      return null;
    }
  }
}