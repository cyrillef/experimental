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

export function LogExecutionTime(_target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
	const originalMethod: any | undefined = descriptor.value;

	descriptor.value = function (...args: any[]): any {
		const start: DOMHighResTimeStamp = performance.now();
		const result: any = originalMethod.apply(this, args);
		const end: DOMHighResTimeStamp = performance.now();
		console.log(`${propertyKey} executed in ${end - start}ms`);
		return (result);
	};

	return (descriptor);
}

export default LogExecutionTime;

/*
ex:

class MyClass {

    @LogExecutionTime
    public myMethod() {
        // Simulate a time-consuming task
        for (let i = 0; i < 1e6; i++) {}
    }

}

const myInstance: MyClass = new MyClass();
myInstance.myMethod(); // Output: myMethod executed in Xms

*/
