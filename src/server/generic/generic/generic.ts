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

export class GenericClass<T extends ITestClass> {

	public constructor(private ctor: { new(): T }) {
	}

	public createInstance(): T {
		return (new this.ctor());
	}

	public callWhoAmI(): void {
		const t: T = this.createInstance();
		if ('whoAmI' in t)
			t.whoAmI();
		else
			console.log('whoAmI method not found');
	}

}

export default GenericClass;
