import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {CrisisListComponent} from './crisis-list/crisis-list.component';
import {HeroListComponent} from './hero-list/hero-list.component';
import {ComposeMessageComponent} from './compose-message/compose-message.component';

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent, data: {animation: 'heroes'}},
  {path: 'dashboard', component: DashboardComponent, data: {animation: 'hero'}},
  {path: 'detail/:id', component: HeroDetailComponent, data: {animation: 'heroes'}},
  {path: 'crisis-center', component: CrisisListComponent, data: {animation: 'hero'}},
  {path: 'heroesList', component: HeroListComponent, data: {animation: 'heroes'}},
  {path: 'compose', component: ComposeMessageComponent, outlet: 'popup'},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full', data: {animation: 'hero'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
