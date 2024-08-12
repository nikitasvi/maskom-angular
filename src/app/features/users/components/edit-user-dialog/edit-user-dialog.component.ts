import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';

@Component({
	templateUrl: './edit-user-dialog.component.html',
	styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
	private formBuilder: FormBuilder = inject(FormBuilder);
	private dialogRef = inject(MatDialogRef<EditUserDialogComponent>);
	private data = inject(MAT_DIALOG_DATA);

	public userForm: FormGroup;
	public hidePassword: boolean = true;

	constructor() {
		const fullName: string = this.data.user.fullName.trim();
		const [lastName, firstName, middleName] = fullName.split(' ');

		this.userForm = this.formBuilder.group({
			firstName: [firstName || '', Validators.required],
			lastName: [lastName || '', Validators.required],
			middleName: [middleName || ''],
			age: [this.data.user?.age || '', [Validators.required, Validators.min(1)]],
			username: [this.data.user?.username || '', Validators.required],
			password: [this.data.user?.password || '', Validators.required],
		});
	}

	public onSave() {
		if (this.userForm.valid) {
			this.dialogRef.close(
				new User(
					this.data.user.id,
					this.userForm.get('username')?.value,
					this.userForm.get('password')?.value,
					`${this.userForm.get('firstName')?.value} ${this.userForm.get('lastName')?.value} ${this.userForm.get('middleName')?.value}`.trim(),
					this.userForm.get('age')?.value,
					this.data.user.registrationDate
				)
			);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}
}
