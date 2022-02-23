import { Cart } from './../../../models/cart.model';
import { CartService } from '../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile = false;
  isLoggedIn = false;
  totalCart = 0;
  listCart: Cart[] = [];
  navItems: any;
  drawerListCart = false;
  drawerLoggedIn = false;
  constructor(
    private userService: UserService,
    private CartService: CartService
  ) {
    this.navItems = [
      { name: 'Trang chủ', path: '/' },
      { name: 'Giới thiệu', path: 'gioi-thieu' },
      { name: 'Hỗ trợ', path: 'ho-tro' },
      { name: 'Liên hệ', path: 'lien-he' },
    ];
  }

  ngOnInit(): void {
    if (navigator.userAgent.includes('Mobile')) {
      this.isMobile = true;
    }
    this.userService.isLoggedIn().subscribe({
      next: (val) => (this.isLoggedIn = val),
    });
    this.CartService.totalItemObservable().subscribe((totalCart: number) => {
      this.totalCart = totalCart;
    });
    this.CartService.cartObservable().subscribe((listCart: Cart[]) => {
      this.listCart = listCart;
    });
  }

  logOut() {
    this.userService.logOut();
  }

  openDrawerListCart(): void{
    if(this.isMobile){
      this.drawerListCart = true
    }
  }

  closeDrawerListCart(): void{
    this.drawerListCart = false
  }

openDrawerLoggedIn(): void{
    if(this.isMobile){
      this.drawerLoggedIn = true
    }
  }

  closeDrawerLoggedIn(): void{
    this.drawerLoggedIn = false
  }
}
