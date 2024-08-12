import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {

handlers: { [key: string]: DetachedRouteHandle } = {};

	public shouldDetach(route: ActivatedRouteSnapshot): boolean {
		return route.routeConfig?.path === ':id';
	}

	public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
		if (route.routeConfig?.path) {
		// @ts-ignore
		this.handlers[route.routeConfig?.path] = handle;
		}
	}

	public shouldAttach(route: ActivatedRouteSnapshot): boolean {
		// @ts-ignore
		return !!route.routeConfig && !!this.handlers[route.routeConfig?.path];
	}

	public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
		// @ts-ignore
		if (!route.routeConfig || !this.handlers[route.routeConfig?.path]) {
		return null;
		}
		
		// @ts-ignore
		return this.handlers[route.routeConfig.path];
	}

	public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		return future.routeConfig === curr.routeConfig;
	}
}
