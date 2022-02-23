import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product = new Product
  selectImageIndex = 0;
  rate: number = 4;


  constructor(private route: ActivatedRoute, private prod: ProductService) { }

  ngOnInit(): void {
    this.getRoutePro(this.route.snapshot.params['product_id'])
  }

  getRoutePro(productID: number){
    this.prod.searchProducts(productID ?  {'product_id': productID, 'page': 1} : null).subscribe((data: any) =>{
      this.product = data['products'][0]
    })
  }

  changeSelectImageIndex(index: number){
   this.selectImageIndex = index;
  }


}
