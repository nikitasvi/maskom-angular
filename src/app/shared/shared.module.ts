import { NgModule } from "@angular/core";
import { LocalStorageService } from "./services/local-storage.service";
import { NoSpaceDirective } from "./directives/no-space.directive";
import { AngularMaterialModule } from "./modules/angular-material.module";

@NgModule({
	imports: [
		AngularMaterialModule,
	],
	providers: [
		LocalStorageService
	],
	exports: [
		NoSpaceDirective,
		AngularMaterialModule
	],
	declarations: [
		NoSpaceDirective
	]
})
export class SharedModule { }