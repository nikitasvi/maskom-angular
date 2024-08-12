import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
	private userService = inject(UserService);
	private dialog = inject(MatDialog);
	private router = inject(Router);

	public displayedColumns: string[] = ['index', 'fullName', 'age', 'registrationDate'];
	public users$!: Observable<User[]>;
	public filteredUsers: User[] = [];

	public ngOnInit(): void {
		this.users$ = this.userService.getUsers();
		this.users$.subscribe(
			users => this.filteredUsers = users
		);
	}

	public openUserDetails(user: User): void {
		this.router.navigate(['/users', user.id]);
	}

	public openAddUserDialog(): void {
		let newUserId = 0;

		this.users$.subscribe(users => newUserId = users.length + 1);
		const dialogRef = this.dialog.open(AddUserDialogComponent, {
			width: '500px',
			height: '790px',
			data: { id: newUserId }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.userService.addUser(result);
			}
		});
	}

	public applyFilter(filter: any): void {
		this.users$.subscribe(users => {
			this.filteredUsers = users.filter(user => {
				const matchesDate = (!filter.dateFrom || new Date(user.registrationDate) >= filter.dateFrom)
													&& (!filter.dateTo || new Date(user.registrationDate) <= filter.dateTo);
				const matchesAge = (!filter.ageFrom || user.age >= filter.ageFrom)
													&& (!filter.ageTo || user.age <= filter.ageTo);
				const matchesName = !filter.fullName || user.fullName.toLowerCase().includes(filter.fullName.toLowerCase());
				return matchesDate && matchesAge && matchesName;
			});
		});
	}
}
