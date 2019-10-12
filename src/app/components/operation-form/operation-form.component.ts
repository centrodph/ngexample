import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { OperationCreateService } from "../../services/operation.create.service";
import { OPERATION_STATUS, PROPERTY_TYPE } from "../../models";

@Component({
  selector: "app-operation-form",
  templateUrl: "./operation-form.component.html",
  styleUrls: ["./operation-form.component.css"]
})
export class OperationFormComponent implements OnInit {
  constructor(
    private operationCreateService: OperationCreateService,
    private formBuilder: FormBuilder
  ) {}
  operationForm = this.formBuilder.group({
    status: new FormControl("", [Validators.required]),
    properties: new FormArray([
      this.formBuilder.group({
        property: ["", Validators.required],
        value: ["", [Validators.required]]
      }),
      this.formBuilder.group({
        property: ["", Validators.required],
        value: ["", [Validators.required]]
      }),
      this.formBuilder.group({
        property: ["", Validators.required],
        value: ["", [Validators.required]]
      })
    ])
  });
  error = null;
  loading = false;
  success = false;
  ngOnInit() {
    this.operationCreateService.operation.subscribe(operation => {
      this.success = Boolean(operation);
      this.operationForm.reset();
    });
    this.operationCreateService.error.subscribe(
      message => (this.error = message)
    );
    this.operationCreateService.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  get controls() {
    return this.operationForm.controls;
  }
  get dynamicProperties() {
    return this.controls.properties as FormArray;
  }
  get optionsStatus(): string[] {
    return Object.keys(OPERATION_STATUS);
  }
  optionsProperties(prop) {
    const used = this.dynamicProperties.value
      .map(i => i.property)
      .filter(i => i !== prop);
    return Object.keys(PROPERTY_TYPE).filter(type => !used.includes(type));
  }
  get status(): any {
    return this.operationForm.get("status");
  }

  update() {
    this.success = false;
  }
  onSubmit() {
    if (this.operationForm.invalid) {
      return;
    }
    this.error = null;
    this.loading = true;
    const properties = this.dynamicProperties.value.reduce((prev, prop) => {
      prev[prop.property] = prop.value;
      return prev;
    }, {});
    console.log(properties);
    this.operationCreateService.createOperation({
      status: this.status.value as OPERATION_STATUS,
      properties
    });
  }
}
