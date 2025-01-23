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

/// <reference path='./admin.d.ts' />

import { IController } from '@/controllers/_baseController';
import BaseController from '@/controllers/_baseController';
import { Final } from 'partial-class';

export * from '@/controllers-tests/admin/contacts';
export * as X from '@/controllers-tests/admin/products';

@Final
class AdminController extends BaseController implements IController {

	public constructor(
		public path: string = '/admin',
		public permissions: string[] = ['admin']
	) {
		super(path, permissions);
		//this.initializeRoutes();
	}

}

export default AdminController;
