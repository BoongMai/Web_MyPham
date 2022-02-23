import { Category } from './../../../models/category.model';
import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  categories: Category[] = [];
  isMobile = false;
  drawerNavbar = false;
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.isMobile = navigator.userAgent.toLowerCase().includes('mobile');
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((data: any) => {
      this.categories = data['categories'];
    });
  }

  openDrawerNavbar() {
    this.drawerNavbar = true;
  }
  closeDrawerNavbar() {
    this.drawerNavbar = false;
  }
}
