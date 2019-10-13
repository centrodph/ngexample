import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { BasicAuthInterceptor } from "./services/auth";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { HeaderComponent } from "./components/header/header.component";
import { OperationFormComponent } from "./components/operation-form/operation-form.component";
import { OperationListComponent } from "./components/operation-list/operation-list.component";
import { PropertiesListComponent } from "./components/properties-list/properties-list.component";
import { PropertyPipe } from "./utils/PropertyPipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    UserListComponent,
    UserFormComponent,
    HeaderComponent,
    OperationFormComponent,
    OperationListComponent,
    PropertiesListComponent,
    PropertyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
