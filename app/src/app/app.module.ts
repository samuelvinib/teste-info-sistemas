// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Forms
import { ReactiveFormsModule } from '@angular/forms';

// External Libraries
import { TextMaskModule } from 'angular2-text-mask';
import { CPFPipe } from './pipes/cpf';
import { PhonePipe } from './pipes/phone';


// Components
import { FormComponent } from './components/form/form.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Request
import { HttpClientModule } from '@angular/common/http';

// Pages
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RegisterComponent,
    HomeComponent,
    ListUsersComponent,
    EditUserComponent,
    CPFPipe,
    PhonePipe
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
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
