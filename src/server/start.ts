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

import 'module-alias/register';
import _path from 'path';
import _fs from 'fs/promises';

// import AppSettings from '@/app-settings';
import { test as testGeneric } from '@/generic/generic/_test';
import { test as testGenericComplex } from '@/generic/generic-with-params/_test';
import { test as testDerived } from '@/partial/partial-derived/_test';
import { test as testMixins } from '@/partial/partial-mixins/_test';
import { test as testDecorated } from '@/partial/partial-decorated/_test';

const runTests: (tests: ((() => Promise<void>) | (() => void))[], title?: string) => Promise<void>
	= async (tests: ((() => Promise<void>) | (() => void))[], title: string = 'default'): Promise<void> => {
		console.log(title);
		const underline: string[] = new Array(title.length).fill('-');
		console.log(underline.join(''));

		for (let i = 0; i < tests.length; i++)
			await tests[i]();

		console.log(' ');
	};

(async () => {

	//#region Generic Classes
	await runTests([testGeneric, testGenericComplex], 'Generic Classes');
	//#endregion

	//#region Partial Classes
	await runTests([testDerived, testMixins], 'Partial Classes');
	//#endregion

	//#region DecoDecorators Partial Classesators
	await runTests([testDecorated], 'Decorators Partial Classes');
	//#endregion

})();