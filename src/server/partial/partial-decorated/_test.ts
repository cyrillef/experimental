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

import PartialOneClass from '@/partial/partial-decorated/partial-1';
import PartialTwoClass from '@/partial/partial-decorated/partial-2';
import FinalDecoratedClass from '@/partial/partial-decorated/final';

export const test: () => void
	= (): void => {
		// const sample: Samples = new Samples();
		// sample.whoAmI();
		PartialOneClass.myStatic();
		PartialTwoClass.myStatic();

		(FinalDecoratedClass as any).myStatic();

		// interface FinalDecoratedClass {
		// 	whoAmI(): void;
		// }

		// Extend the class with the mixin methods
		// interface test //extends ReturnType<typeof FinalDecoratedClass> { }
		// 	extends InstanceType<ReturnType<typeof FinalDecoratedClass>> { }

		const finalDecoratedClass: FinalDecoratedClass = new FinalDecoratedClass();
		(finalDecoratedClass as any).whoAmI();
		// finalDecoratedClass.whoAmI();


		// const testDecoratedClass: TestDecoratedClass = new TestDecoratedClass();
		// testDecoratedClass.hello();
		// debugDecorator(TestDecoratedClass, /*new TestDecoratedClass(),*/ true);
	};

export default test;
