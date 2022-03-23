import {Component, OnInit} from '@angular/core';
import {HomepageService} from "./homepage.service";
import {BodyType} from "../interfaca/body-type";
import {Observable} from "rxjs";
import {TypeEngine} from "../interfaca/type-engine";
import {Brand} from "../interfaca/brand";
import { Model } from '../interfaca/model';
import {Generation} from "../interfaca/generation";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  bodyTypes: BodyType[] | undefined;
  typeEngines: TypeEngine[] | undefined;
  brands: Brand[] | undefined;
  models: Model[] | undefined;
  idBrandSelector: BodyType | undefined;
  idModelSelector: Model | undefined;
  idBodyTypeSelector: BodyType | undefined;
  idTypeEnginesSelector: TypeEngine | undefined;
  generations: Generation[] | undefined;
  disabledModel: boolean;
  disabledGeneration: boolean;

  constructor(private homepage: HomepageService, private router: Router) {
    this.homepage.getTypeBody().subscribe((bodyTypes: BodyType[]) => {
        this.bodyTypes = bodyTypes;
      }
    );

    this.homepage.getTypeEngine().subscribe((typeEngine: TypeEngine[]) => {
        this.typeEngines = typeEngine;
      }
    );

    this.homepage.getBrand().subscribe((brands: Brand[]) => {
        this.brands = brands;
      }
    );
    this.disabledModel = false;
    this.disabledGeneration = false;
  }

  ngOnInit(): void {
  }

  search(searchForm: NgForm): void {
    // this.stateService.data = {searchForm};
    this.router.navigate(['/ogloszenia']);
  }

  getModel(brandId: number) {
    console.log(brandId)
    this.disabledModel = true;
    this.homepage.getModel(brandId).subscribe((models: Model[]) => {
        this.models = models;
      }
    );
  }

  getGeneration(modelId: number) {
    console.log(modelId)
    this.disabledGeneration = true;
    this.homepage.getGeneration(modelId).subscribe((generations: Generation[]) => {
        this.generations = generations;
      }
    );
  }
}
