import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
	selector: 'app-users-details',
	templateUrl: './users-details.component.html',
	styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit, OnDestroy {
	private userService = inject(UserService);
	private dialog = inject(MatDialog);
	private activatedRoute = inject(ActivatedRoute);

	public users$!: Observable<any[]>;
	public selectedUser!: number;
	public user$!: Observable<any>;

	public ngOnInit(): void {
		console.log('Init');
		
		this.activatedRoute.params.subscribe(params => {
			this.selectedUser = +params['id'];
			this.onUserChange(this.selectedUser);
		});

		this.users$ = this.userService.users$;
		
		this.users$.subscribe(users => {
			if (users.length > 0) {
				this.onUserChange(this.selectedUser);
			}
		});
	}

	public ngOnDestroy(): void {
		// если лог не срабатывает значит routeReuseStrategy отрабатывает
		console.log('Destroy');	
	}

	public onUserChange(userId: number): void {
		this.user$ = this.userService.getUserById(userId);
	}

	public openEditModal(user: any) {
		const dialogRef = this.dialog.open(EditUserDialogComponent, {
			width: '500px',
			height: '700px',
			data: { isEditMode: true, user: user }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.userService.updateUser(user.id, result);
			}
		});
	}
}
