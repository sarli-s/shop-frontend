import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConnectionComponent,RouterOutlet, ProductCardComponent,FooterComponent, HeaderComponent
    ,OrderHistoryComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gift-store';
}
