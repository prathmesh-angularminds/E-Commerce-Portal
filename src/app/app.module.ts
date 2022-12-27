import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./components/error/error.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LayoutsModule } from "./layouts/layouts.module";
import { FormsModule } from "@angular/forms";
import { CommonInterceptor } from "./services/common.interceptor";

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutsModule,
    FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: CommonInterceptor,multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
