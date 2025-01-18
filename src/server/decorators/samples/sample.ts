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

import BaseController from '@/controllers/_baseController';

import { HEAD } from '@/decorators/samples/decorators/head';
import { GET } from '@/decorators/samples/decorators/get';
import { POST } from '@/decorators/samples/decorators/post';
import { PATCH } from '@/decorators/samples/decorators/patch';
import { DELETE } from '@/decorators/samples/decorators/delete';

import { Router } from '@/decorators/samples/router';

@Router({
	path: '/Samples',
	permissions: ['Admin'],
})
export class Samples extends BaseController {

	public constructor() {
		super('/Samples', ['Admin']);
	}

	//#region Samples
	@HEAD('/Samples')
	// @GET({ path: '/Samples', })
	private headSamples(): void {
		this.compilerFix();
	}

	@GET('/Samples')
	// @GET({ path: '/Samples', })
	private getSamples(): void {
		this.compilerFix();
	}

	@GET('/Samples/:id')
	// @GET({ path: '/Samples/:id', })
	private getSample(): void {
		this.compilerFix();
	}

	@POST('/Samples')
	// @POST({ path: '/Samples', })
	private postSample(): void {
		this.compilerFix();
	}

	@PATCH('/Samples')
	// @PATCH({ path: '/Samples', })
	private patchSample(): void {
		this.compilerFix();
	}

	@DELETE('/Samples')
	// @DELETE({ path: '/Samples', })
	private deleteSample(): void {
		this.compilerFix();
	}
	//#endregion

	//#region Compiler fix
	private compilerFix(): void {
		return;
		this.headSamples();
		this.getSamples();
		this.getSample();
		this.postSample();
		this.patchSample();
		this.deleteSample();
		this.compilerFix();
	}

	public whoAmI(): void {
		console.log('I am whoAmI() from Samples');
	}
	//#endregion

}

export default Samples;