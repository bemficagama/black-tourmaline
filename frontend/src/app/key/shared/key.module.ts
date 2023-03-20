import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KeyReadComponent } from '../key-read/key-read.component';
import { KeyCreateComponent } from '../key-create/key-create.component';
import { KeyUpdateComponent } from '../key-update/key-update.component';
import { KeyService } from './key.service';
import { AgeModule } from 'src/app/shared/age/age.module';
import { CategoryModule } from 'src/app/category/shared/category.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, AgeModule, CategoryModule, FontAwesomeModule],
    providers:    [ KeyService ],
    declarations: [ KeyReadComponent, KeyCreateComponent, KeyUpdateComponent],
    exports: []
})
export class KeyModule { }