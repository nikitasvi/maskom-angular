import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/features/users/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	private userService = inject(UserService);
	private formBuilder = inject(FormBuilder);
	private router = inject(Router);

	public loginForm: FormGroup;
	public hidePassword: boolean = true;
	public loginError: boolean = false;

	constructor() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', [Validators.required]]
		});
	}

	public login(): void {
		const { username, password } = this.loginForm.value;

		if (this.userService.login(username, password)) {
			this.loginError = false;
			this.router.navigate(['/users']);
		} else {
			this.loginError = true;
		}
	}
}
