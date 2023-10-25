import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UrlReadComponent } from '../url-read/url-read.component';
import { UrlCreateComponent } from '../url-create/url-create.component';
import { UrlUpdateComponent } from '../url-update/url-update.component';
import { UrlService } from './url.service';
import { CategoryModule } from 'src/app/category/shared/category.module';
import { AgeModule } from 'src/app/shared/age/age.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, CategoryModule, AgeModule, FontAwesomeModule],
    providers:    [ UrlService ],
    declarations: [UrlReadComponent, UrlCreateComponent, UrlUpdateComponent],
    exports: []
})
export class UrlModule { }