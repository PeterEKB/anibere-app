import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './pages/main/main.component';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';

@NgModule({
  declarations: [MainComponent, CollapsibleComponent, AppointmentCardComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
