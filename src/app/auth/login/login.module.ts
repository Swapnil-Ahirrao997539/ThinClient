import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
	imports: [CommonModule, LoginRoutingModule, ButtonModule, CheckboxModule, InputTextModule, FormsModule, PasswordModule, ReactiveFormsModule, ToastModule, SharedModule.forRoot()],
	declarations: [LoginComponent]
})
export class LoginModule {}
