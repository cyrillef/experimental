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

// https://www.typescriptlang.org/docs/handbook/decorators.html
// https://www.npmjs.com/package/reflect-metadata
// https://techsparx.com/nodejs/typescript/decorators/reflection.html

import 'reflect-metadata';
//import { logType } from '@/decorators/debug';
import debugDecorator from '@/decorators/debug';
import Property from '@/decorators/property';

// export function decoratedClass(value: string): Function {
// 	// export function decoratedClass(target: Object, name: string | symbol, descriptor?: TypedPropertyDescriptor<any>): void;
// 	// export function decoratedClass(...args: any[]): Function | void {
// 	return (Reflect.metadata('decoratedClassr', value));
// }

export function logParamsType(target: Object, key: string): void {
	const t: any = Reflect.getMetadata('design:paramtypes', target, key);
	const r: any = Reflect.getMetadata('design:returntype', target, key);
	const s: any = t.map((a: any) => a.name).join();
	console.log(`${key} param types: ${s}, returns: ${r.name}`);
}

// Create a parameter decorator to add metadata to a parameter
function decoratedParameter(metadataValue: string): any {
	return (function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
		const existingParams: any[] = Reflect.getOwnMetadata('decoratedParameter', target, propertyKey) || [];
		existingParams.push({ index: parameterIndex, value: metadataValue });
		Reflect.defineMetadata('decoratedParameter', existingParams, target, propertyKey);
	});
}

// @decoratedClass('MyClassName')
@Reflect.metadata('decoratedClass', 'I am TestClass')
export class TestClass {

	//#region Constructor
	// No decorator here, constructor decorators are not allowed, but placed on the class definition
	public constructor();
	public constructor(param?: string) {
		this.myVar = param || 'I am myVar from TestClass';
	}

	// public constructor(public myVar?: string)
	// public constructor(public myVar: string = 'I am myVar from TestClass')

	//#endregion

	//#region Instance
	@Property
	@Reflect.metadata('decoratedProperty', 'property value')
	public myVar: string = 'I am myVar from TestClass';

	@Reflect.metadata('decoratedAccessor', 'accessor value')
	public get myAccessor(): string {
		return (this.myVar);
	}

	@Reflect.metadata('decoratedMethod', 'I am hello() from TestClass')
	public hello(): number {
		console.log('Hello, World!');
		return (1);
	}

	@Reflect.metadata('decoratedMethod', 'I am helloWithParam() from TestClass with params')
	public helloWithParam(
		@decoratedParameter('parameter 1st value') param1: string,
		_param2?: string,
		@decoratedParameter('parameter 3rd value') _param3?: string
	): void {
		console.log(`Hello, ${param1}!`);
	}
	//#endregion

	//#region Static
	@Reflect.metadata('decoratedStaticProperty', 'static property value')
	public static myStaticVar: string = 'I am myStaticVar from TestClass';

	@Reflect.metadata('decoratedStaticAccessor', 'static accessor value')
	public static get myStaticAccessor(): string {
		return (TestClass.myStaticVar);
	}

	@Reflect.metadata('decoratedStaticMethod', 'static method value')
	public static myStatic(): number {
		console.log('Hello, World! [static]');
		return (1);
	}

	@Reflect.metadata('decoratedStaticMethod', 'I am myStaticWithParam() from TestClass with params')
	public static myStaticWithParam(
		@decoratedParameter('parameter value') param: string
	): void {
		console.log(`Hello, ${param}! [static]`);
	}
	//#endregion

}

debugDecorator(TestClass, /*new TestClass(),*/ false);

export default TestClass;
