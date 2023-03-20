import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AgeComponent } from 'src/app/shared/age/age.component';
import { AgeService } from './age.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    providers:    [ AgeService ],
    declarations: [AgeComponent],
    exports: [ AgeComponent ]
})
export class AgeModule { }