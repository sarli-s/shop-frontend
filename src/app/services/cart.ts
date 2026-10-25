import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private items: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem('my_cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

// עדכון הכמות בתוך הסל
updateQuantity(product: any, delta: number) {
  const item = this.items.find(i => 
    i.name === product.name && 
    i.color === product.color && 
    i.customText === product.customText
  );

  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => i !== item);
    }
  }
  this.saveToLocalStorage();
}

  addToCart(product: any) {
    // חיפוש מוצר זהה לחלוטין (שם, צבע ומשפט)
    const existingItem = this.items.find(item => 
      item.name === product.name && 
      item.color === product.color && 
      item.customText === product.customText
    );
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // מוסיפים מוצר חדש עם כל הפרטים האישיים
      this.items.push({ 
        ...product, 
        quantity: 1 
      });
    }
    this.saveToLocalStorage();
  }

  getItems() {
    return this.items;
  }

  // כתובת התמונה של פריט בסל. בסל נשמר רק שם הקובץ (למשל bag.jpg),
  // אבל פריטים ישנים נשמרו עם נתיב - לכן לוקחים רק את החלק האחרון
  imageSrc(item: any): string {
    const fileName = (item?.imageUrl ?? '').split('/').pop();
    return fileName ? environment.imgPath + fileName : '';
  }

  private saveToLocalStorage() {
    localStorage.setItem('my_cart', JSON.stringify(this.items));
  }

  removeItem(product: any) {
    // אנחנו אומרים למערך: תשמור רק את מי ש-לא- שווה למוצר שבחרנו
    this.items = this.items.filter(item => 
      !(item.name === product.name && 
        item.color === product.color && 
        item.customText === product.customText)
    );
  }
  get totalItemsCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
  // בתוך קובץ cart.service.ts
  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
  }

  // פונקציית עזר לחישוב הסכום הכולל עבור השרת
  getTotalSum(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
