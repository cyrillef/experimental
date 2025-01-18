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

import 'reflect-metadata';

export const LOG_PARAMETERS_KEY: string = 'log_parameters';

export function LogParameter(message: string): Function | void {
	return ((target: Object, propertyKey: string | symbol, parameterIndex: number): void => {
		const existingParameters: any[] = Reflect.getOwnMetadata(LOG_PARAMETERS_KEY, target, propertyKey) || [];
		existingParameters.push({ index: parameterIndex, message });
		Reflect.defineMetadata(LOG_PARAMETERS_KEY, existingParameters, target, propertyKey);
	});
}

export default LogParameter;

/*
ex:

class MyClass {

	public myMethod(
		@LogParameter('First parameter') param1: string,
		@LogParameter('Second parameter') param2: number
	) {
		console.log(param1, param2);
	}

}

const parameters: any[] = Reflect.getOwnMetadata(LOG_PARAMETERS_KEY, MyClass.prototype, 'myMethod');
console.log(parameters);
// Output: [{ index: 0, message: 'First parameter' }, { index: 1, message: 'Second parameter' }]

*/
