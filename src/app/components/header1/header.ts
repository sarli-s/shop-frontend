import { ChangeDetectorRef, Component, inject, OnInit, computed, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Cart } from '../../services/cart';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product';
import { SemanticSearchResult } from '../../models/product.model';
import { debounceTime, distinctUntilChanged, filter, switchMap, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuModule, RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  private router = inject(Router);
  public userService = inject(UserService);
  public cart = inject(Cart);
  private productService = inject(ProductService);

  searchControl = new FormControl('');
  searchResults: SemanticSearchResult[] = [];
  showResults = false;
  private destroy$ = new Subject<void>();
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  // שימוש ב-computed כדי שהתפריט יתעדכן אוטומטית כשהמשתמש מתחבר/מתנתק
  profileMenuItems = computed<MenuItem[]>(() => {
    const user = this.userService.currentUser(); // גישה לסיגנל
    
    return [
      {
        items: [
          // הצגת התחברות רק אם אין משתמש
          { 
            label: 'התחברות', 
            icon: 'pi pi-sign-in', 
            visible: !user,
            command: () => this.router.navigate(['/connection']) 
          },
          { separator: true, visible: !user },
          
          // שדות שמופיעים רק אם יש משתמש
          { 
            label: 'פרופיל אישי', 
            icon: 'pi pi-user', 
            routerLink: '/profile', 
            visible: !!user 
          },
          { 
            label: 'הזמנות שלי', 
            icon: 'pi pi-shopping-bag', 
            routerLink: '/order-history', 
            visible: !!user 
          },
          { separator: true, visible: !!user },
          { 
            label: 'התנתקות', 
            icon: 'pi pi-power-off', 
            visible: !!user,
            command: () => this.disengagement() 
          }
        ]
      }
    ];
  });

  // פונקציה לבדיקת חיבור (אם בכל זאת תרצי להשתמש בה בכפתור חיצוני)
  conection() {
    const user = this.userService.currentUser(); // תיקון: שימוש בסיגנל
    if (user) {
      Swal.fire({
        title: '?להתנתק',
        text: `את/ה כבר מחובר למערכת בשם ${user.UserFirstName} ${user.UserLastName}`,
        icon: 'warning',
        iconColor: '#46d9e1',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#46d9e1',
        confirmButtonText: 'להתנתק',
        cancelButtonText: 'להישאר מחובר'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.logout();
          this.router.navigate(['/connection']);
        }
      });
    } else {
      this.router.navigate(['/connection']);
    }
  }

  disengagement() {
    Swal.fire({
      title: 'את/ה בטוח/ה?',
      text: 'תוכל/י לשוב ולהתחבר מחדש בהמשך',
      icon: 'warning',
      iconColor: '#46d9e1',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#46d9e1',
      confirmButtonText: 'להתנתק',
      cancelButtonText: 'להישאר מחובר'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(q => !!q && q.length > 2),
      switchMap(q => this.productService.semanticSearch(q!)),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.searchResults = res.results;
      this.showResults = true;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null) {
    if (!this.el.nativeElement.contains(target)) this.showResults = false;
  }

  onSearchBlur() {
    setTimeout(() => { this.showResults = false; }, 150);
  }

  goToProduct(id: string) {
    this.showResults = false;
    this.searchControl.setValue('', { emitEvent: false });
    this.searchResults = [];
    this.router.navigate(['/products', id]);
  }

  clearSearch() {
    this.showResults = false;
    this.searchResults = [];
    this.searchControl.setValue('', { emitEvent: false });
  }

  addNewProduct() {
    const productId = 0;
    this.router.navigate(['/products', productId]);
  }
}