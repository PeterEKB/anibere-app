import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { LoginComponent } from './features/login/pages/main/login.component';
import { ProfilePuckComponent } from './core/components/profile-puck/profile-puck.component';
import { MainFormComponent } from './features/login/components/main-form/main-form.component';
import { FullBtnComponent } from './core/components/full-btn/full-btn.component';
import { HeaderComponent } from './core/components/header/header.component';
import { NavComponent } from './core/components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    ProfilePuckComponent,
    MainFormComponent,
    FullBtnComponent,
    HeaderComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
