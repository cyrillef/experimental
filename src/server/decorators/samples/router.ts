// //
// // Copyright (c) Autodesk, Inc. All rights reserved
// //
// // Permission to use, copy, modify, and distribute this software in
// // object code form for any purpose and without fee is hereby granted,
// // provided that the above copyright notice appears in all copies and
// // that both that copyright notice and the limited warranty and
// // restricted rights notice below appear in all supporting
// // documentation.
// //
// // AUTODESK PROVIDES THIS PROGRAM 'AS IS' AND WITH ALL FAULTS.
// // AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// // MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// // DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// // UNINTERRUPTED OR ERROR FREE.
// //
// /*jshint esversion: 9 */

import BaseController from '@/controllers/_baseController';

import RouterOptions from '@/decorators/samples/router-options';

export interface IBaseControllerConstructor {
	new(): BaseController;
}

export const V2Controllers: IBaseControllerConstructor[] = [];

export const DEFAULT_PERMISSIONS: string[] = ['SU'];
export const CONTROLLER_NAME_KEY: string = 'controllers:name';
export const OPTIONS_KEY: string = 'controllers:options';

// //#region Router
export function Router(path: string): Function;
export function Router(options: RouterOptions): Function;
export function Router(target: Function): void;
export function Router(...args: any[]): Function | void {
	if (typeof args === 'function') {
		decorate(args);
	} else if (typeof args[0] === 'object') {
		const options: RouterOptions = { path: '/', permissions: ['SU'], ...args[0], };
		return ((target: any) => decorate(target, options));
	} else if (typeof args[0] === 'string') {
		const options: RouterOptions = { path: args[0] || '/', permissions: args[1] || DEFAULT_PERMISSIONS, };
		return ((target: any) => decorate(target, options));
	} else {
		const options: RouterOptions = { ...args } as RouterOptions;
		return ((target: any) => decorate(target, options));
	}
}

const decorate: (target: IBaseControllerConstructor, options?: RouterOptions) => void
	= (target: IBaseControllerConstructor, options: RouterOptions = {}): void => {
		V2Controllers.push(target);

		setRouterName(target.prototype, options.name || target.name);
		// addRouterOptions(target.prototype, options);
	};

// Sets router name from class by storing this information through reflect metadata
export const setRouterName: (target: any, modelName: string) => void
	= (target: any, modelName: string): void =>
		Reflect.defineMetadata(CONTROLLER_NAME_KEY, modelName, target);

// // Returns model name from class by restoring this information from reflect metadata
// export const getRouterName: (target: any) => string
// 	= (target: any): string =>
// 		Reflect.getMetadata(CONTROLLER_NAME_KEY, target);

// // Sets router define options to class prototype
// export const setRouterOptions: (target: any, options: RouterOptions) => void
// 	= (target: any, options: RouterOptions): void =>
// 		Reflect.defineMetadata(OPTIONS_KEY, { ...options }, target);



// //#endregion

// export default Router;
