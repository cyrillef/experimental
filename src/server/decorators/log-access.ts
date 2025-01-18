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

export function LogAccess(_target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
	const originalGet: any | undefined = descriptor.get;

	descriptor.get = function (): any {
		console.log(`Getting value of ${propertyKey}`);
		return (originalGet && originalGet.apply(this));
	};

	return (descriptor);
}

export default LogAccess;

/*
ex:

class MyClass {

    public constructor(private _name: string) {
    }

    @LogAccess
    public get name() {
        return (this._name);
    }

    public set name(value: string) {
        this._name = value;
    }
		
}

const myInstance: MyClass = new MyClass('Example');
console.log(myInstance.name); // Output: Getting value of name

*/
