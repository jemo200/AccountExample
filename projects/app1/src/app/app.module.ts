import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GstLoginComponent } from './gst-login/gst-login.component';
import { AuthService } from './auth/auth.service';
import { GstAddComponent } from './gst-add/gst-add.component';

@NgModule({
  declarations: [
    AppComponent,
    GstLoginComponent,
    GstAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
