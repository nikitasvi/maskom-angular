import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "../users/components/users-list/users-list.component";
import { UsersDetailsComponent } from "../users/components/users-details/users-details.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
