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

import TestClass from '@/generic/generic/test-class';
import GenericComplexClassWithParams from '@/generic/generic-with-params/generic';

export const test: () => void
	= (): void => {
		const genericInstanceWithParams = new GenericComplexClassWithParams<TestClass>(TestClass, 'cyrille');
		genericInstanceWithParams.callWhoAmI();

		const instance: TestClass = genericInstanceWithParams.createInstance('simon');
		instance.whoAmI();
	};

export default test;
