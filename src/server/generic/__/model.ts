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

export interface ITestClass {
	whoAmI(): void;
}

export interface ITestClassStatic {
	myStatic(): void;
}

export class TestClass implements ITestClass {

	public constructor() {
	}

	public whoAmI(): void {
		console.log('I am whoAmI() from TestClass');
	}

	public static myStatic(): void {
		console.log('I am myStatic() from TestClass');
	}

}

export class MyGeneric<T extends TestClass> {

	public constructor(private _value: T) {
	}

	public whoAmI(): void {
		console.log('I am whoAmI() from MyGeneric');
		this._value.whoAmI();
	}

	// public static myStatic<K extends ITestClassStatic>(cls: K): void {
	public static myStatic<K extends ITestClassStatic>(cls: K): void {
		console.log('I am myStatic() from MyGeneric');
		cls.myStatic();
	}

}

const instance: MyGeneric<TestClass> = new MyGeneric(new TestClass());
instance.whoAmI();
MyGeneric.myStatic(TestClass);
MyGeneric.myStatic<ITestClassStatic>(TestClass);
