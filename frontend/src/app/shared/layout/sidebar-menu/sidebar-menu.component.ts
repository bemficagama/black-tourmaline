import { Component, OnInit } from '@angular/core';
import { faObjectGroup, faFile} from '@fortawesome/free-regular-svg-icons';
import { faLink, faTags, faChartBar, faLayerGroup, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  faObjectGroup = faObjectGroup
  faTags = faTags
  faLink = faLink
  faChartBar = faChartBar
  faLayerGroup = faLayerGroup
  faFile = faFile
  faPlusCircle = faPlusCircle


  constructor() { }

  ngOnInit(): void {
  }

}
