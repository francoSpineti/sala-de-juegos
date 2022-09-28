import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//componentes
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ErrorComponent } from './components/error/error.component';

//routing
import { IngresoRoutingModule } from './components/ingreso/ingreso-routing.module';
import { NavbarModule } from './components/navbar/navbar.module';

// Angular
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { VerEncuestasComponent } from './components/ver-encuestas/ver-encuestas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuienSoyComponent,
    EncuestaComponent,
    ErrorComponent,
    VerEncuestasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IngresoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule,
    NavbarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    AngularFireStorageModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
