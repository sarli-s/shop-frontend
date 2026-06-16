import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject, Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ChatService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/chat`;
  
  constructor() {}

  send(message: string, history: { role: string; content: string }[]) {
    return this.http.post<{ reply: string }>(this.apiUrl, {
      message,
      history,
      products: []
    });
  }
}
