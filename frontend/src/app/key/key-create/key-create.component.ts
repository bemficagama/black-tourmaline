import { Key } from "../shared/key";
import { Router, ActivatedRoute } from "@angular/router";
import { KeyService } from "../shared/key.service";
import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/_alert';

@Component({
  selector: "app-key-create",
  templateUrl: "./key-create.component.html",
  styleUrls: ["./key-create.component.css"],
})
export class KeyCreateComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  key: Key = {}

  constructor(
    private keyService: KeyService,
    private router: Router,
    activeRoute: ActivatedRoute,
    protected alertService: AlertService) {}

  ngOnInit(): void {

  }

  save(): void {
    this.keyService.save(this.key).subscribe(() => {
      this.router.navigate(["/key"]);
      this.alertService.success('Sucesso: Chave Criada!', this.options)
    });
  }

  cancel(): void {
    this.router.navigate(["/key"]);
  }

  onChangeAge(value : any): void {
    this.key.ages = value
  }

  onChangeCategory(value : any): void {
    this.key.categories = value
  }
}
