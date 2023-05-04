import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleGuard } from 'src/app/core/guards/style.guard';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { MainComponent } from './pages/main/main.component';
import { StylesComponent } from './pages/styles/styles.component';
import { ServicesComponent } from './pages/services/services.component';
import { CalendarGuard } from 'src/app/core/guards/calendar.guard';
import { TimeComponent } from './pages/time/time.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'styles',
        pathMatch: 'full',
      },
      {
        path: 'styles',
        children: [
          {
            path: '',
            redirectTo: 'categories',
            pathMatch: 'full',
          },
          {
            path: 'categories',
            component: CategoriesComponent,
          },
          {
            path: ':category',
            component: StylesComponent,
            // canActivate: [StyleGuard]
          },
        ],
      },
      {
        path: 'calendar',
        canActivate: [CalendarGuard],
        children: [
          {
            path: '',
            redirectTo: 'day',
            pathMatch: 'full',
          },
          {
            path: 'day',
            component: CalendarComponent,
          },
          {
            path: 'time',
            component: TimeComponent,
          },
        ],
      },
      {
        path: 'confirm',
        component: ConfirmationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsRoutingModule {}
