import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	public setItem(key: string, value: any): void {
		try {
			const serializedValue = JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
		} catch (error) {
			console.error('Ошибка при сохранении в localStorage', error);
		}
	}

	public getItem<T>(key: string): T | null {
		try {
			const serializedValue = localStorage.getItem(key);
			return serializedValue ? JSON.parse(serializedValue) : null;
		} catch (error) {
			console.error('Ошибка при получении из localStorage', error);
			return null;
		}
	}

	public removeItem(key: string): void {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Ошибка при удалении из localStorage', error);
		}
	}

	public clear(): void {
		try {
			localStorage.clear();
		} catch (error) {
			console.error('Ошибка при очистке localStorage', error);
		}
	}
}