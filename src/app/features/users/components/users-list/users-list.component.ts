import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
	private userService = inject(UserService);

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
		console.log('user', user);	
	}

	public applyFilter(filter: any) {
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
