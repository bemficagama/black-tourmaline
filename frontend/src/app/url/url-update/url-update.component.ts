import { Url } from "../shared/url";
import { Router, ActivatedRoute } from "@angular/router";
import { UrlService } from "../shared/url.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';

@Component({
  selector: "app-url-update",
  templateUrl: "./url-update.component.html",
  styleUrls: ["./url-update.component.css"],
})
export class UrlUpdateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  url: Url = {};

  constructor(
    private urlService: UrlService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    protected alertService: AlertService) {
    activeRoute.params.subscribe(params => {
      let id = params["id"];
      if (id != null) {
        this.urlService.readById(id).subscribe(url => {
          this.url = url!
        })
      }
    })
  }

  ngOnInit(): void { }

  save(): void {
    this.urlService.update(this.url).subscribe(() => {
      this.router.navigate(["/url"]);
      this.alertService.success('Sucesso: URL Atualizada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/url"]);
  }

  onChangeAge(value: any): void {
    this.url.ages = value
  }

  onChangeCategory(value: any): void {
    this.url.categories = value
  }
}
