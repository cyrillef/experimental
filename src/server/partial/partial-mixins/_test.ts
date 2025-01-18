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

//import TestPartialClass from '@/partial/partial-common/test-class';
import FinalMixinsClass from '@/partial/partial-mixins/final-mixins';

export const test: () => void
	= (): void => {
		const mixinsClassInstance = new FinalMixinsClass();
		mixinsClassInstance.whoAmI();
		mixinsClassInstance.whoAreYou();
		FinalMixinsClass.myFinalStatic();
		FinalMixinsClass.myStatic();
	};

export default test;
