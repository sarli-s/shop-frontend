import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private router=inject(Router);
  private userService=inject(UserService);
  
  isAdmin=this.userService.isAdmin();
  
  goToDetails(productId: number) {
  console.log('Navigating to product:', productId);
  this.router.navigate(['/products', productId]);
  }

  goToAddNewProduct(){
    console.log('Go to add new prouct');
    const id=0;
    this.router.navigate(['/products',id]);
  }
}
