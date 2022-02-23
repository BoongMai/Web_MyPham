import { CartDetailComponent } from './../cart-detail/cart-detail.component';
import { AuthComponent } from './../auth/auth.component';
import { DefaultComponent } from './../default/default.component';
import { ProductDetailComponent } from './../product-detail/product-detail.component';
import { ProductsComponent } from './../products/products.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { BannerComponent } from './banner/banner.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { IconModule } from './../icon/icon.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component'
import {NavbarComponent} from './navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {RouterModule} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';




@NgModule({
  declarations: [
    DefaultComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    BannerComponent,
    CartDetailComponent,
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    IconModule,
    NzDatePickerModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzTypographyModule,
    NzMenuModule,
    NzCardModule,
    NzBreadCrumbModule,
    NzToolTipModule,
    NzPaginationModule,
    NzPageHeaderModule,
    NzCarouselModule,
    NzSpaceModule,
    NzDividerModule,
    CarouselModule,
    NzImageModule,
    NzAffixModule,
    NzListModule,
    NzInputModule,
    NzRateModule,
    FormsModule,
    NzBadgeModule,
    NzTabsModule,
    NzFormModule,
    NzTableModule,
    NzSkeletonModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzPopoverModule,
    NzDrawerModule,
    NzMessageModule,
    SweetAlert2Module.forRoot(),
    ScrollingModule
  ],
  exports: [
    DefaultComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    BannerComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartDetailComponent,
  ]

})
export class ShareModule { }
