import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "../users/components/users-list/users-list.component";
import { UsersDetailsComponent } from "../users/components/users-details/users-details.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "src/app/shared/guards/auth.guard";

const routes: Routes = [
	{
		path: '',
		// canActivateChild: [AuthGuard],
		children: [
			{ 
				path: '', 
				component: UsersListComponent 
			},
			{ 
				path: ':id', 
				component: UsersDetailsComponent 
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }