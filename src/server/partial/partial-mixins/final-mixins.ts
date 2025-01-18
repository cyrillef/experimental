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

import { ITestPartialClass } from '@/partial/partial-common/test-class';
import PartialOneClass from '@/partial/partial-mixins/partial-1';
import PartialTwoClass from '@/partial/partial-mixins/partial-2';
import assembleMixins from '@/libs/mixins';

// Then you create an interface which merges the expected mixins with the same name as your base
export class FinalMixinsClass implements ITestPartialClass {
	public whoAmI!: () => void;
	public whoAreYou!: () => void;

	//public static myStatic = PartialOneClass.myStatic; // without the enhanced mixins
	public /*declare*/ static myStatic: () => void; // with the enhanced mixins

	public static myFinalStatic(): void {
		console.log(`I am myFinalStatic() from FinalMixinsClass`);
	}

}

// Apply the mixins into the base class via the JS at runtime
assembleMixins(FinalMixinsClass, [PartialOneClass, PartialTwoClass]);

export default FinalMixinsClass;
