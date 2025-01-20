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

import Visibility from '@/decorators/visibility';
import { Partial } from '@/partial/partial-decorated/decorators/partial';

@Partial('FinalDecoratedClass')
export class PartialOneClass {

	// public myVar!: string;
	declare public myVar: string;

	@Visibility('public')
	public static myStaticVar: string = `I am myStaticVar from PartialOneClass`;

	@Visibility('public')
	public whoAmI(): void {
		console.log(`I am whoAmI() from PartialOneClass`);
	}

	@Visibility('public')
	public static myStatic(): void {
		console.log(`I am myStatic() from PartialOneClass`);
	}

	@Visibility('public')
	public printMyVar(): void {
		console.log(`printing from PartialOneClass, this.myVar = ${this.myVar}`);
	}

}

export default PartialOneClass;
