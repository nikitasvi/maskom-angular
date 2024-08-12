import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-users-filter',
	templateUrl: './users-filter.component.html',
	styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent {
	private formBuilder: FormBuilder = inject(FormBuilder);

	@Output() filter = new EventEmitter<any>();

	public filterForm: FormGroup;
	public maxDate: Date = new Date();
	public minAgeTo: number | null = null;

	constructor() {
		this.filterForm = this.formBuilder.group({
			dateFrom: null,
			dateTo: null,
			ageFrom: null,
			ageTo: null,
			fullName: ''
		});
	}

	public onFilter(): void {
		const { dateFrom, dateTo, ageFrom, ageTo } = this.filterForm.value;

		if (dateFrom && dateTo && dateFrom > dateTo) {
			this.filterForm.patchValue({ dateTo: null });
		}

		if (ageFrom && ageTo && ageFrom > ageTo) {
			this.filterForm.patchValue({ ageTo: null });
		}

		this.filter.emit(this.filterForm.value);
	}

	public onClear(): void {
		this.filterForm.reset();
		this.filter.emit(this.filterForm.value);
	}

	public onAgeFromChange(): void {
		const ageFrom = this.filterForm.get('ageFrom')?.value;
		
		if (ageFrom !== null) {
			this.minAgeTo = ageFrom;

			const ageTo = this.filterForm.get('ageTo')?.value;
			if (ageTo !== null && ageTo < ageFrom) {
				this.filterForm.get('ageTo')?.setValue(null);
			}
		} else {
			this.minAgeTo = null;
		}
	}

	public onDateFromChange(): void {
		const dateFrom = this.filterForm.get('dateFrom')?.value;
		if (dateFrom) {
			this.filterForm.get('dateTo')?.setValue(null);
		}
	}

	public dateToFilter = (date: Date | null): boolean => {
		const dateFrom = this.filterForm.get('dateFrom')?.value;
		return date ? (!dateFrom || date >= dateFrom) && date <= this.maxDate : true;
	}
}
