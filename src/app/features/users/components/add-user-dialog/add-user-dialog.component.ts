import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-add-user-dialog',
	templateUrl: './add-user-dialog.component.html',
	styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {
	private formBuilder: FormBuilder = inject(FormBuilder);
	private dialogRef = inject(MatDialogRef<AddUserDialogComponent>);

	public userForm: FormGroup;
	public hidePassword: boolean = true;

	constructor() {
		this.userForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			middleName: [''],
			age: ['', [Validators.required, Validators.min(1)]],
			username: ['', Validators.required],
			password: ['', Validators.required],
			registrationDate: [{ value: new Date(), disabled: true }]
		});
	}

	public onSave() {
		if (this.userForm.valid) {
			this.dialogRef.close({
				username: this.userForm.get('username')?.value,
				password:	this.userForm.get('password')?.value,
				fullName:	`${this.userForm.get('firstName')?.value} ${this.userForm.get('lastName')?.value} ${this.userForm.get('middleName')?.value}`.trim(),
				age:	this.userForm.get('age')?.value,
				registrationDate: this.userForm.get('registrationDate')?.value
			});
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}
}
