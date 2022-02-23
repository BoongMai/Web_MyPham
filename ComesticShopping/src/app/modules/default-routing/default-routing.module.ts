import { CartDetailComponent } from '../../components/cart-detail/cart-detail.component';
import { DefaultComponent } from '../../components/default/default.component';
import { HeaderComponent } from '../../components/share/header/header.component';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductsComponent } from '../../components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const productRoutes: Routes = [
  {
    path: 'default',
    component: DefaultComponent,
    children: [
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full',
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            component: ProductsComponent,
          },
          {
            path: 'category/:category_id',
            component: ProductsComponent,
          },
          {
            path: 'product-detail/:product_id',
            component: ProductDetailComponent,
          },
        ],
      },
      { path: 'cart-detail', component: CartDetailComponent },
    ],
  },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
