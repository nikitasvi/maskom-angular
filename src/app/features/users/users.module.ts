import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { UsersRoutingModule } from "./users-routing.module";
import { AngularMaterialModule } from "src/app/shared/modules/angular-material.module";
import { UsersFilterComponent } from './components/users-filter/users-filter.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { SharedModule } from "src/app/shared/shared.module";

@NgModule( {
	imports: [
		FormsModule,
		CommonModule,
		SharedModule,
		UsersRoutingModule,
		ReactiveFormsModule,
		AngularMaterialModule,
	],
	declarations: [
		UsersListComponent,
		UsersDetailsComponent,
		UsersFilterComponent,
		AddUserDialogComponent,
		EditUserDialogComponent
	]
})

export class UsersModule { }