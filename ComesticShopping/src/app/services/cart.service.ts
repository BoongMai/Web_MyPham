import { Cart } from '../models/cart.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new Rx.BehaviorSubject([] as Cart[]);
  private cartTotalSubject = new Rx.BehaviorSubject(0);
  private totalItemSubject = new Rx.BehaviorSubject(0);
  private totalPriceSubject = new Rx.BehaviorSubject(0);

  cartTotalObservable(): Observable<number> {
    return this.cartTotalSubject.asObservable();
  }
  cartObservable(): Observable<Cart[]> {
    return this.cartSubject.asObservable();
  }

  constructor() {
    const listCartInStorage = localStorage.getItem('cart-list');
    if (listCartInStorage) {
      const listCart: Cart[] = JSON.parse(listCartInStorage);
      this.cartSubject.next(listCart);
      this.cartTotalSubject.next(this.cartSubject.value.length);
      this.updateTotalItem(listCart);
      this.updateTotalPrice(listCart);
    }
  }

  updateTotalItem(listCart: Cart[]): void {
    let sumTotalItem = () => {
      let totalItem = 0;
      return new Promise((reslove, reject) => {
        listCart.forEach((cart: Cart) => {
          totalItem += cart.amount;
        });
        reslove(totalItem);
      });
    };

    sumTotalItem().then((sum: any) => {
      this.totalItemSubject.next(sum);
    });
  }

  updateTotalPrice(listCart: Cart[]) {
    const getTotalPrice = () => {
      let totalPrice: number = 0;
      return new Promise((reslove, reject) => {
        listCart.forEach((cart: Cart) => {
          totalPrice += cart.amount * cart.product.product_price;
        });
        reslove(totalPrice)
      });
    };
    getTotalPrice().then((totalPrice: any) =>{
      this.totalPriceSubject.next(totalPrice)
    })
  }

  updateCartAmount(productID: string, amount: number) {
    let listCart: Cart[] = this.cartSubject.value;
    if (amount > 0) {
      listCart.map((cart: Cart) => {
        if (cart.product._id === productID) {
          cart.amount = amount;
        }
      });
      this.updateCart(listCart);
    } else if (amount === 0) {
      let newListCart: Cart[] = listCart.filter((cart: Cart) => {
        return cart.product._id !== productID;
      });
      this.updateCart(newListCart);
    } else {
      return;
    }
  }

  updateCart(listCart: Cart[]): void {
    this.cartSubject.next(listCart);
    this.cartTotalSubject.next(listCart.length);
    this.updateTotalItem(listCart);
    this.updateTotalPrice(listCart)
    localStorage.setItem('cart-list', JSON.stringify(this.cartSubject.value));
  }

  deleteCart(productID: string): void {
    let listCart: Cart[] = this.cartSubject.value;

    let newListCart: Cart[] = listCart.filter((cart: Cart) => {
      return cart.product._id !== productID;
    });

    this.updateCart(newListCart);
  }

  addToCart(cart: Cart) {
    let listCart = this.cartSubject.value;
    const checkCartExistIndex = () => {
      let index: number = -1;
      return new Promise((reslove, reject) => {
        try {
          for (let i = 0; i < listCart.length; i++) {
            if (listCart[i].product._id === cart.product._id) {
              index = i;
            }
          }
          reslove(index);
        } catch (error) {
          reject(error);
        }
      });
    };
    checkCartExistIndex().then((index: any) => {
      if (index !== -1) {
        listCart[index].amount = cart.amount + listCart[index].amount;
      } else {
        listCart.push(cart);
      }

      this.updateCart(listCart);
    });
  }
  totalItemObservable(): Observable<number> {
    return this.totalItemSubject.asObservable();
  }

  totalPriceObservable():Observable<number>{
    return this.totalPriceSubject.asObservable()
  }
}
