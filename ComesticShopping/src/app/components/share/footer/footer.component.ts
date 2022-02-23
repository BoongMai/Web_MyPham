import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  storeAddressData: any = [
    {
      district: 'Quận 3 Tp.HCM',
      addrInfo: '- Số 71, Đường số 3, Cư Xá Đô Thành, P4, Q3 - 0911 784 114'
    },
    {
      district: 'Q.Phú Nhuận Tp.HCM',
      addrInfo: '280 Phan Đình Phùng, P.3, Q.Phú Nhuận - 0911 384 114'
    },
    {
      district: 'Quận 9 Tp.HCM',
      addrInfo: '435 Lê Văn Việt, Tăng Nhơn Phú A, Q.9 - 0911.484.114'
    },
    {
      district: 'Q.Tân Phú Tp.HCM',
      addrInfo: '17 Nguyễn Sơn, Phú Thạnh, Q.Tân Phú 0911.174.114'
    },


  ]
  constructor() { }

  ngOnInit(): void {
  }

}
