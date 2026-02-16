import { Routes } from '@angular/router';
import { connect } from 'rxjs';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { HomeComponent } from './components/home/home.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

export const routes: Routes = [
    
// 1. כשהאתר עולה (נתיב ריק) - תציג את עמוד הבית
  { path: '', component: HomeComponent }, 

  {path: 'products/:id', component: ProductCardComponent },
  {path: 'home', component: HomeComponent },
  {path: 'connection', component: ConnectionComponent },
  {path: 'order-history', component: OrderHistoryComponent},

  // 3. אופציונלי: "תופס" טעויות ושולח חזרה להתחלה
  { path: '**', redirectTo: '' }];
