import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../shared/category.service'
import { Category } from '../shared/category';

@Component({
  selector: 'category-sel-component',
  templateUrl: './category-sel.component.html',
  styleUrls: ['./category-sel.component.css']
})
export class CategorySelComponent implements OnInit {

  @Input()
  categoriesSel?: string[] = new Array<string>()

  @Output()
  categoryChange = new EventEmitter<string>();

  categories: Category[] = new Array<Category>()

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data!
    })
  }

  ngOnInit(): void {
  }

  onChangeCategory(value : any) {
    this.categoryChange.emit(value)
  }

}
