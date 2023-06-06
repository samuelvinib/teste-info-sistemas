// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

// External Libraries
import { TextMaskModule } from 'angular2-text-mask';
import { ToastrModule } from 'ngx-toastr';

// Components
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Request
import { HttpClientModule } from '@angular/common/http';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CreateCarComponent } from './pages/create-car/create-car.component';

// Pipes
import { PlacaPipe } from './pipes/placa';
import { PlacaDirective } from './pipes/placa';
import { ChassiPipe  } from './pipes/chassi';
import { ChassiDirective  } from './pipes/chassi';
import { RenavamPipe  } from './pipes/renavam';
import { RenavamDirective  } from './pipes/renavam';
import { AnoPipe  } from './pipes/ano';
import { AnoDirective  } from './pipes/ano';
import { MaxLengthDirective  } from './pipes/max-length';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormEditComponent } from './components/form-edit/form-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CardComponent,
    CarFormComponent,
    CreateCarComponent,
    PlacaPipe,
    PlacaDirective,
    ChassiPipe,
    ChassiDirective,
    RenavamPipe,
    RenavamDirective,
    AnoPipe,
    AnoDirective,
    MaxLengthDirective,
    ConfirmationDialogComponent,
    FormEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
