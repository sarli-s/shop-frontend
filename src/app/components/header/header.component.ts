import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private router=inject(Router);
  userService=inject(UserService);
  


  conection(){
    if(this.userService.getCurrentUser())
    {
      Swal.fire({
            title: '?להתנתק',
            text: ` ${this.userService.getCurrentUser()!.UserFirstName} ${this.userService.getCurrentUser()!.UserLastName} את/ה כבר מחובר למערכת בשם  `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'להתנתק',
            cancelButtonText: 'להישאר מחובר'
          }).then((result) => {
            if (result.isConfirmed) {
              this.userService.logout();
              this.router.navigate(['/connection']);
            }
          });
      }
        else{
          this.router.navigate(['/connection']);
        }
    // console.log(this.userService.getCurrentUser());
  }

  editOrders(){
    this.router.navigate(['/order-history']);
  }
}
