import { DefaultRoutingModule } from './modules/default-routing/default-routing.module';
import { LoginGuard } from './helper/guard/login.guard';
import { AuthComponent } from './components/auth/auth.component';
import { DefaultComponent } from './components/default/default.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: '',  redirectTo: '/default/product', pathMatch: 'full'},
  {path: 'auth',canActivate: [LoginGuard],  component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}), DefaultRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
