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

// Extract Instance Methods and Properties: Use keyof and conditional types to extract instance methods and properties.

type InstanceKeys<T> = {
	[K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type InstanceMethods<T> = {
	[K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type InstanceProperties<T> = Pick<T, InstanceKeys<T>>;
type InstanceMethodTypes<T> = Pick<T, InstanceMethods<T>>;

// Extract Static Methods and Properties: Use typeof to extract static methods and properties.

type StaticKeys<T> = {
	[K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type StaticProperties<T> = {
	[K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type StaticMethodTypes<T> = Pick<T, StaticKeys<T>>;
type StaticPropertyTypes<T> = Pick<T, StaticProperties<T>>;

// Combine Everything: Combine instance and static types to create a comprehensive type.

type DynamicType<T> = {
	instanceMethods: InstanceMethodTypes<T>;
	instanceProperties: InstanceProperties<T>;
	staticMethods: StaticMethodTypes<T>;
	staticProperties: StaticPropertyTypes<T>;
};

export default DynamicType;

/*
ex:

type ExampleClassType = DynamicType<ExampleClass>;

*/
