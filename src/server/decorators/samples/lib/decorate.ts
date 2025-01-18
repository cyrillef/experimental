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

import DecoratorService from '@/decorators/decorators-service';
import RouteOptions from '@/decorators/samples/route-options';

export const decorate: (...args: any[]) => Function | void
	= (...args: any[]): Function | void => {
		const decoratorService: DecoratorService = new DecoratorService('controllers:router');
		const method: string = args.shift();

		if (args.length >= 2) {
			const target: Object = args[0];
			const name: string | symbol = args[1];
			const descriptor: TypedPropertyDescriptor<any> = args[2];
			decoratorService.decorate(target, name, descriptor);
			return;
		}

		return ((target: any, name: string, descriptor?: TypedPropertyDescriptor<any>) => {
			let options: RouteOptions = args[0];
			if (typeof options === 'string')
				options = { method, path: options, };
			else if (typeof options === 'object')
				options = { method, ...options, };
			decoratorService.decorate(
				target,
				name,
				descriptor,
				options
			);
		});
	}

export default decorate;
