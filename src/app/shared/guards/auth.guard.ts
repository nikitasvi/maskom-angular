import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "src/app/features/users/services/user.service";

export const AuthGuard: CanActivateFn = () => {
	const router = inject(Router);
	const userService = inject(UserService);
	
	if (userService.isLoggedIn()) {
		return true;
	} 

	router.navigate(['/login']);
	return false;
};
