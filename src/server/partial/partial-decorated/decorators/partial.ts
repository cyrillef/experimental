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

// import decorate from '@/decorators/samples/lib/decorate';
import assembleMixins from '@/libs/mixins';

// target: The prototype of the class for a static method,
// 		   or the constructor function of the class for an instance method.
// className: The name of the class being decorated.
// descriptor: An object containing the property descriptor of the method being decorated.

// Ex:
// @Partial('FinalDecoratedClass')
// class PartialOneClass {}
// @Partial('FinalDecoratedClass')
// class PartialTwoClass {}
// @Final
// class FinalClass {}

export type ClassDefinition = { new(...args: any[]): {} };
// export const PartialClasses: Map<string, Function[]> = new Map<string, Function[]>();
export const PartialClasses: Map<string, ClassDefinition[]> = new Map<string, ClassDefinition[]>();

export function Partial(name: string): Function {
	return (function (target: Object, _name: string | symbol, _descriptor?: TypedPropertyDescriptor<any>): void {
		if (!PartialClasses.has(name))
			PartialClasses.set(name, []);
		PartialClasses.get(name)?.push(target as ClassDefinition);
	});
}

// type Constructor<T = {}> = new (...args: any[]) => T;

export function Final<T extends { new(...args: any[]): {} }>(constructor: T): T {
	assembleMixins(constructor, PartialClasses.get(constructor.name) || []);
	return (constructor);
}

// export function Final(constructor: Function): Function {
// 	assembleMixins(constructor, PartialClasses.get(constructor.name) || []);
// 	// return (result as T);
// 	return (constructor);
// }

//#endregion
