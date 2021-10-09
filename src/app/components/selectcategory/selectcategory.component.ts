import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-selectcategory',
  templateUrl: './selectcategory.component.html',
  styleUrls: ['./selectcategory.component.css'],
})
export class SelectcategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categories: Category[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((data) => 
      this.categories = data);
  }
}
