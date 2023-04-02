import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { MainComponent } from './pages/main/main.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { NavComponent } from './components/nav/nav.component';
import { ServicesComponent } from './pages/services/services.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StylesComponent } from './pages/styles/styles.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { StyleCardComponent } from './components/style-card/style-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    MainComponent,
    BreadCrumbsComponent,
    NavComponent,
    StylesComponent,
    CategoriesComponent,
    ServicesComponent,
    CalendarComponent,
    ConfirmationComponent,
    StyleCardComponent,
  ],
  imports: [CommonModule, BookingsRoutingModule, IonicModule.forRoot({})],
})
export class BookingsModule {}
