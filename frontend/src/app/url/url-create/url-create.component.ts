import { Url } from "../shared/url";
import { Router, ActivatedRoute } from "@angular/router";
import { UrlService } from "../shared/url.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';
import { Category } from "src/app/category/shared/category";
import { CategoryService } from "src/app/category/shared/category.service";

@Component({
  selector: "app-url-create",
  templateUrl: "./url-create.component.html",
  styleUrls: ["./url-create.component.css"],
})
export class UrlCreateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  url: Url = {}
  categories: Category[] = new Array<Category>()

  constructor(
    private urlService: UrlService,
    private categoryService: CategoryService,
    private router: Router,
    activeRoute: ActivatedRoute,
    protected alertService: AlertService) {

    this.categoryService.getAll().subscribe(data => {
      this.categories = data!
    })

  }

  ngOnInit(): void {
  }

  save(): void {
    this.urlService.save(this.url).subscribe(() => {
      this.router.navigate(["/url"]);
      this.alertService.success('Sucesso: Url Criada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/url"]);
  }

  onChangeAge(value : any): void {
    this.url.ages = value
  }

  onChangeCategory(value : any): void {
    this.url.categories = value
  }
}
