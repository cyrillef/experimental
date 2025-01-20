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

function Visibility(visibility: 'public' | 'private' | 'protected') {
	return (function (target: any, propertyKey: string) {
		Reflect.defineMetadata('design:visibility', visibility, target, propertyKey);
	});
}

export default Visibility;

/*
ex:

class MyClass {

	@Visibility('public')
	public name: string;

	@Visibility('public')
	public constructor(name: string) {
		this.name = name;
	}

	@Visibility('protected')
	protected myMethod(): void {
		console.log('I am protected');
	}

}

const visibility: any = Reflect.getMetadata('visibility', target, propertyKey) || 'public';

*/
