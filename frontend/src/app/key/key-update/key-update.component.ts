import { Key } from "../shared/key";
import { Router, ActivatedRoute } from "@angular/router";
import { KeyService } from "../shared/key.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';

@Component({
  selector: "app-key-update",
  templateUrl: "./key-update.component.html",
  styleUrls: ["./key-update.component.css"],
})
export class KeyUpdateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  key: Key = {};

  constructor(
    private keyService: KeyService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    protected alertService: AlertService) {
    activeRoute.params.subscribe(params => {
      const id = params["id"];
      if (id != null) {
        this.keyService.readById(id).subscribe(key => {
          this.key = key!
        })
      }
    })
  }

  ngOnInit(): void {}

  save(): void {
    this.keyService.update(this.key).subscribe(() => {
      this.router.navigate(["/key"]);
      this.alertService.success('Sucesso: Chave Atualizada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/key"]);
  }

  onChangeAge(value: any): void {
    this.key.ages = value
  }

  onChangeCategory(value: any): void {
    this.key.categories = value
  }
}
