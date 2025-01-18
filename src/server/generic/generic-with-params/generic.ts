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

import { ITestClass } from '@/generic/generic/test-class';

// Define an interface with a constructor signature
interface Constructor<T extends ITestClass> {
	new(...args: any[]): T;
}

export class GenericComplexClassWithParams<T extends ITestClass> {

	public constructor(private ctor: Constructor<T>, private params?: string) {
	}

	// public createInstance(...args: any[]): T {
	// 	return (new this.ctor(...args));
	// }
	public createInstance(params?: string): T {
		return (new this.ctor(params));
	}

	public callWhoAmI(): void {
		const t: T = this.createInstance(this.params);
		if ('whoAmI' in t)
			t.whoAmI();
		else
			console.log('whoAmI method not found');
	}

}

export default GenericComplexClassWithParams;
