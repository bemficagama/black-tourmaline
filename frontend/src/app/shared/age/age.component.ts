import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgeService } from './age.service';
import { Age } from './age';

@Component({
  selector: 'age-component',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css']
})
export class AgeComponent implements OnInit {

  @Input()
  selAges?: string[]

  @Output()
  ageChange = new EventEmitter<string>();

  ages: Age[] = new Array<Age>()

  constructor(private ageService: AgeService) {
    this.ageService.getAges().subscribe(data => {
      this.ages = data!
    })
  }

  ngOnInit(): void {
  }

  onChangeAge(value : any) {
    this.ageChange.emit(value)
  }

}
