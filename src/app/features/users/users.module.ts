import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { UsersRoutingModule } from "./users-routing.module";
import { AngularMaterialModule } from "src/app/shared/modules/angular-material.module";
import { UsersFilterComponent } from './components/users-filter/users-filter.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule( {
	imports: [
		CommonModule,
		UsersRoutingModule,
		AngularMaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		UsersListComponent,
		UsersDetailsComponent,
		UsersFilterComponent
	]
})

export class UsersModule { }