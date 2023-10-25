import { Component, OnInit, Input } from '@angular/core';
import { faObjectGroup, faFile } from '@fortawesome/free-regular-svg-icons';
import { faLink, faTags, faChartBar, faLayerGroup, faPlusCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-analitico',
  templateUrl: './analitico.component.html',
  styleUrls: ['./analitico.component.css']
})
export class AnaliticoComponent implements OnInit {

  icons = [faObjectGroup, faTags, faLink, faChartBar, faLayerGroup, faFile, faPlusCircle, faCircleNotch]

  @Input() title: string = ""
  @Input() counter: string = ""
  @Input() routesinsert: string = ""
  @Input() routeslist: string = ""
  @Input() icon: string = ""
  @Input() data: {title: string, counter: any, routesinsert: string, routeslist: string, icon: any}

  indice: number = 0
  faObjectGroup = faObjectGroup
  faTags = faTags
  faLink = faLink
  faChartBar = faChartBar
  faLayerGroup = faLayerGroup
  faFile = faFile
  faPlusCircle = faPlusCircle
  faCircleNotch = faCircleNotch

  constructor() {
    this.data = {title: "", counter: "", routesinsert: "", routeslist: "", icon: 7}
  }

  ngOnInit(): void {
    this.indice = Number(this.icon)
  }

}
