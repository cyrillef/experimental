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

export interface ITestPartialClass {
	whoAmI(): void;
	whoAreYou?(): void;
}

export interface ITestPartialClassConstructor {
	new(params?: string): ITestPartialClass;
	myStatic(): void;
}

export class TestPartialClass implements ITestPartialClass {

	public constructor(private params?: string) {
	}

	public whoAmI(): void {
		console.log(`I am whoAmI() from TestPartialClass - [${this.params}]`);
	}

	public whoAreYou(): void {
		console.log(`I am whoAreYou() from TestPartialClass - [${this.params}]`);
	}

	public static myStatic(): void {
		console.log(`I am myStatic() from TestPartialClass`);
	}

}

export default TestPartialClass;

/*
ex:


const TestPartialClassWithStatic: ITestPartialClassConstructor = TestPartialClass;

const instance = new TestPartialClassWithStatic('example');
instance.whoAmI(); // Output: I am whoAmI() from TestPartialClass - [example]

TestPartialClassWithStatic.myStatic(); // Output: I am myStatic() from TestPartialClass

*/
