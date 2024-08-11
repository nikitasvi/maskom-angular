import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		SharedModule,
		AuthRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [
		LoginComponent
	]
})

export class AuthModule { }
