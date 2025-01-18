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

export function Property(target: Object, propertyKey: string) {
	const properties: string[] = Reflect.getMetadata('design:properties', target) || [];
	properties.push(propertyKey);
	Reflect.defineMetadata('design:properties', properties, target);
}

export default Property;

/*
ex:

class MyClass {

	@Property
	public name: string;

	public constructor(name: string) {
		this.name = name;
	}
		
}

*/