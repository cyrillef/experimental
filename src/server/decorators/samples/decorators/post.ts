//
// Copyright (c) Autodesk, Inc. All rights reserved
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM 'AS IS' AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
/*jshint esversion: 9 */

import RouteOptions from '@/decorators/samples/route-options';
import decorate from '@/decorators/samples/lib/decorate';

//#region POST

// target: The prototype of the class for a static method,
// 		   or the constructor function of the class for an instance method.
// methodName: The name of the method being decorated.
// descriptor: An object containing the property descriptor of the method being decorated.

// Ex:
// @POST('/Samples')
// @POST('/Samples/:id')
// @POST({ path: '/Samples', })

export function POST(path: string): Function;
export function POST(options: RouteOptions): Function;
export function POST(target: Object, name: string | symbol, descriptor?: TypedPropertyDescriptor<any>): void;
export function POST(...args: any[]): Function | void {
	return (decorate('POST', ...args));
}

// or
// import DecoratorService from '@/decorators/decorators-service';
//
// export function POST(...args: any[]): Function | void {
// 	if (args.length >= 2) {
// 		const target: Object = args[0];
// 		const name: string | symbol = args[1];
// 		const descriptor: TypedPropertyDescriptor<any> = args[2];
// 		annotate(target, name, descriptor);
// 		return;
// 	}
//
// 	return ((target: any, name: string, descriptor?: TypedPropertyDescriptor<any>) => {
// 		let options: RouteOptions = args[0];
// 		if (typeof options === 'string' )
// 			options = { method: 'POST', path: options, };
// 		else if (typeof options === 'object')
// 			options = { method: 'POST', ...options, };
// 		annotate(
// 			target,
// 			name,
// 			descriptor,
// 			options
// 		);
// 	});
// }

//#endregion
