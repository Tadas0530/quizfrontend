import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CategoryService } from './services/category.service';
import { SelectcategoryComponent } from './components/selectcategory/selectcategory.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IngameComponent } from './components/ingame/ingame.component';

const routes: Routes = [
  { path: 'start-game', component: SelectcategoryComponent },
  { path: 'in-game/:categoryId', component: IngameComponent },
  { path: '**', component: WelcomeComponent }


];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    SelectcategoryComponent,
    LeaderboardComponent,
    IngameComponent
  ],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
