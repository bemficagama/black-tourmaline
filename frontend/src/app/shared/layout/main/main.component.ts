import { Component, OnInit } from '@angular/core';
import { faObjectGroup, faFile, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faLink, faTags, faChartBar, faLayerGroup, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  faObjectGroup = faObjectGroup
  faTags = faTags
  faLink = faLink
  faChartBar = faChartBar
  faLayerGroup = faLayerGroup
  faFile = faFile
  faPlusCircle = faPlusCircle

  analiticos!: Array<{title: string, counter: any, routesinsert: string, routeslist: string, icon: any}>

  constructor(private mainService: MainService) {
    this.getCount()
  }

  ngOnInit(): void {
    this.getCount()
  }

  getCount(): void {
    let count: number = 0;
    this.mainService.getCount()
      .subscribe(data => {
        this.analiticos = [
          { title: "Categorias", icon: 0, counter: data!.category, routesinsert: "/category/category-create", routeslist: "/category" },
          { title: "Chaves", icon: 1, counter: data!.key, routesinsert: "/key/key-create", routeslist: "/key" },
          { title: "URLs", icon: 2, counter: data!.url, routesinsert: "/url/url-create", routeslist: "/url" }
        ]
      })
  }


}
