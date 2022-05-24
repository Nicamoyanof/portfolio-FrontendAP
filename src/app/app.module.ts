import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import 'firebase/functions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StartComponent } from './components/start/start.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SkillsComponent } from './components/skills/skills.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartAdminComponent } from './components/admin/start-admin/start-admin.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EducationAdminComponent } from './components/admin/education-admin/education-admin.component';
import { ProyectoAdminComponent } from './components/admin/proyecto-admin/proyecto-admin.component';
import { SkillsAdminComponent } from './components/admin/skills-admin/skills-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    EducationComponent,
    ProjectsComponent,
    ContactComponent,
    SkillsComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    StartAdminComponent,
    EducationAdminComponent,
    ProyectoAdminComponent,
    SkillsAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
