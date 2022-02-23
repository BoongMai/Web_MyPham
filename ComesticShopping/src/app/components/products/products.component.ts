import { CartService } from '../../services/cart.service';
import { Category } from './../../models/category.model';
import { CategoriesService } from './../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productData: Product[] = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoWidth: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    startPosition: 1,
    navSpeed: 500,
    autoplayTimeout: 2500,
    center: false,
    navText: ['<<<', '>>>'],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
      1600: {
        items: 5,
      },
    },
    nav: true,
  };

  isMobile = false;
  isLoading = true;
  page = 1;
  total_result = 0;
  entries_per_page = 12;
  category_id = '';
  category_text = 'Tất cả sản phẩm';
  isFirstLoad = true;

  constructor(
    private prodService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService,
    private cartService: CartService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    if (navigator.userAgent.includes('Mobile')) {
      this.isMobile = true;
    }
    combineLatest([this.route.queryParamMap.pipe(), this.route.paramMap.pipe()])
      .pipe(
        map(([query, param]) => {
          return {
            page: query.get('page'),
            categoryID: param.get('category_id'),
          };
        })
      )
      .subscribe(({ page, categoryID }) => {
        this.page = page ? parseInt(page.toString()) : 1;
        this.category_id = categoryID ? categoryID : '';
        this.getProducts(this.category_id, this.page);

        if (categoryID) {
          this.categoryService
            .getCategoryDetail(categoryID)
            .subscribe((data: any) => {
              if (data) {
                let cate: Category = data['categories'][0];
                this.category_text =
                  cate.cat_id == this.category_id
                    ? cate.cat_text
                    : cate.cat_child.filter(
                        (childCate: Category) => childCate.cat_id == categoryID
                      )[0].cat_text;
              }
            });
        }
      });
  }

  getProducts(categoryID: string, page: number) {
    this.prodService
      .searchProducts({ page: page, category_id: categoryID })
      .subscribe((data: any) => {
        this.productData = data['products'];
        this.entries_per_page = data['entries_per_page'];
        this.total_result = data['total_result'];
        this.isLoading = false;
      });
  }

  handlePageIndexChange(index: number) {
      this.router.navigate([], { queryParams: { page: index } });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(new Cart(product, 1));
    this.message.success('Một sản phẩm vừa được thêm vào giỏ hàng của bạn', {
      nzAnimate: true,
    });
  }

  buyClick(product: Product) {
    this.addToCart(product);
    setTimeout(() => {
      this.router.navigate(['/default', 'cart-detail']);
    }, 1000);
  }
}
