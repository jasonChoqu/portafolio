import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SkillComponent } from './components/skill/skill.component';
import { ContactComponent } from './components/contact/contact.component';
import { StadyComponent } from './components/stady/stady.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { OthersSkilsComponent } from './components/others-skils/others-skils.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavegationBarComponent } from './components/navegation-bar/navegation-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SkillComponent,
    ContactComponent,
    StadyComponent,
    AboutMeComponent,
    OthersSkilsComponent,
    FooterComponent,
    NavegationBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
