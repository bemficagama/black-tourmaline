import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CategorySelComponent } from '../category-sel/category-sel.component'
import { CategoryReadComponent } from '../category-read/category-read.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { CategoryService } from './category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, FontAwesomeModule],
    providers:    [ CategoryService ],
    declarations: [CategoryReadComponent, CategoryCreateComponent, CategoryUpdateComponent, CategorySelComponent],
    exports: [ CategorySelComponent ]
})
export class CategoryModule { }