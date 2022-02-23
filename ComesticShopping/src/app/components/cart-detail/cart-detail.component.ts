import { Cart } from './../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  listCart: Cart[] = [];
  totalAmount: number = 0;
  totalPrice: number = 0
  constructor(
    private cartService: CartService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.cartService.cartObservable().subscribe((listCart: Cart[]) => {
      this.listCart = listCart;
    });
    this.cartService.cartTotalObservable().subscribe((total: number) => {
      this.totalAmount = total;
    });
    this.cartService.totalPriceObservable().subscribe((total: number) =>{
      this.totalPrice = total
    })
  }

  calcTotalPricePerProduct(amount: number, price: number): string {
    return (amount * price).toString();
  }

  updateCartAmount(amount: string, productID: string) {
    try {
      if (amount !== '') {
        if(parseInt(amount) >= 0){
          this.cartService.updateCartAmount(productID, parseInt(amount));
          this.messageService.success('Cập nhật giỏ hàng thành công');
        }else{
          this.messageService.error('Số lượng phải lớn hơn hoặc bằng 0');
        }
      } else {
        this.messageService.error(
          'Cập nhật giỏ hàng thành thất bại, vui lòng kiểm tra số lượng nhập'
        );
      }
    } catch (err) {
      this.messageService.error(
        'Cập nhật giỏ hàng thành thất bại, vui lòng kiểm tra số lượng nhập'
      );
    }
  }

  deleteCart(productID: string){
    this.cartService.deleteCart(productID)
    this.messageService.success("Xoá thành công sản phẩm khỏi giỏ hàng")
  }
}
