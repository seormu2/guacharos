import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessComponent } from './components/access/access.component';
import { HomeComponent } from './components/home/home.component';
import { OffCanvasComponent } from './components/shared/off-canvas/off-canvas.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarMobileComponent } from './components/shared/sidebar-mobile/sidebar-mobile.component';
import { ProductsComponent } from './components/products/products.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    HomeComponent,
    OffCanvasComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    SidebarMobileComponent,
    ProductsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
