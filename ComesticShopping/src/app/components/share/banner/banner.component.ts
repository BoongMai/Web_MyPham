import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  bannerHeight = '100vh';
  banners: any;
  constructor() {
    this.banners = [
      'assets/images/banners/118.jpg',
      'assets/images/banners/1160.jpg',
      'assets/images/banners/1764.jpg',
    ];
  }

  ngOnInit(): void {
    if(navigator.userAgent.includes('Mobile')){
      this.bannerHeight= '280px'
    }
  }

}
