import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { IUser, User } from '../models/user.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private localeStorageService = inject(LocalStorageService);
	private localeStorageKey = 'users';

	private usersSubject = new BehaviorSubject<User[]>([]);
	public users$ = this.usersSubject.asObservable();

	private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

	constructor() {
		this.loadUsers();
	}

	private loadUsers(): void {
		const storedUsers = this.localeStorageService.getItem<User[]>(this.localeStorageKey);

		if (storedUsers) {
			const users = storedUsers.map((user: IUser) => {
				user.registrationDate = new Date(user.registrationDate);
				return user;
			});
			this.usersSubject.next(users);
		} else {
			const initialUsers = TestUserData.map(
				(user) =>
					new User(
						user.id,
						user.username,
						user.password,
						user.fullName,
						user.age,
						new Date(user.registrationDate)
					)
			);
			this.localeStorageService.setItem(this.localeStorageKey, initialUsers);
			this.usersSubject.next(initialUsers);
		}
	}

	public getUsers(): Observable<User[]> {
		return this.users$;
	}

	public getCurrentUser(): Observable<User | null> {
		return this.currentUser$;
	}

	public getUserById(id: number): Observable<User | undefined> {
		return this.users$.pipe(
			map(users => users.find(user => user.id === id))
		);
	}

	public addUser(user: any): void {
		const users = this.usersSubject.getValue();
		user.id = users.length + 1;
		// user.registrationDate = new Date();
		this.usersSubject.next([...users, user]);
		this.localeStorageService.setItem(this.localeStorageKey, [...users, user]);
	}
	

	public updateUser(id: number, updatedUser: User): void {
		const users = this.usersSubject.getValue();
		const index = users.findIndex(u => u.id === id);
		if (index !== -1) {
			users[index] = { ...users[index], ...updatedUser };
			this.localeStorageService.setItem(this.localeStorageKey, users);
			this.usersSubject.next([...users]);
		}
	}

	public login(username: string, password: string): boolean {
		const users = this.usersSubject.getValue();
		const user = users.find((u) => u.username === username && u.password === password);

		if (user) {
			this.currentUserSubject.next(user);
			return true;
		}
		return false;
	}

	public logout(): void {
		this.currentUserSubject.next(null);
	}

	public isLoggedIn(): boolean {
		return this.currentUserSubject.getValue() !== null;
	}
}

export const TestUserData = [
	{ id: 1, username: 'admin', password: 'admin123', fullName: 'Админ Админович', age: 30, registrationDate: '2024-01-01' },
	{ id: 2, username: 'john_doe', password: 'john2023', fullName: 'Джон Доу', age: 28, registrationDate: '2024-02-02' },
	{ id: 3, username: 'jane_smith', password: 'jane456', fullName: 'Джейн Смит', age: 25, registrationDate: '2024-03-03' },
	{ id: 4, username: 'alex_ivanov', password: 'alex789', fullName: 'Алексей Иванов', age: 35, registrationDate: '2024-03-10' },
	{ id: 5, username: 'maria_petrovna', password: 'maria321', fullName: 'Мария Петровна', age: 40, registrationDate: '2024-04-04' },
	{ id: 6, username: 'nikolay_sidorov', password: 'kolya111', fullName: 'Николай Сидоров', age: 32, registrationDate: '2024-05-05' },
	{ id: 7, username: 'anna_karpova', password: 'anna777', fullName: 'Анна Карпова', age: 29, registrationDate: '2024-06-06' },
	{ id: 8, username: 'sergey_ivanov', password: 'sergey333', fullName: 'Сергей Иванов', age: 37, registrationDate: '2024-07-07' },
	{ id: 9, username: 'elena_nikolaeva', password: 'elena123', fullName: 'Елена Николаева', age: 27, registrationDate: '2024-07-17' },
	{ id: 10, username: 'pavel_pavlov', password: 'pavel999', fullName: 'Павел Павлов', age: 31, registrationDate: '2024-08-08' },
	{ id: 11, username: 'viktor_smirnov', password: 'viktor555', fullName: 'Виктор Смирнов', age: 34, registrationDate: '2024-09-09' },
];