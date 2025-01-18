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
import Dictionary from '@/libs/types';
import formatToJson from '@/libs/json';

// #region Utilities
interface IClassMembers {
	constructors?: string;
	properties: (string | symbol)[];
	accessors: string[];
	methods: string[];
}

const listStaticClassMembers: (target: Object) => IClassMembers
	= (target: Object): IClassMembers => {
		const names: string[] = Object.getOwnPropertyNames(target)
			.filter((name: string): boolean => !['length', 'constructor', 'name', 'prototype'].includes(name));
		const accessors: string[] = names.filter((name: string): boolean => {
			const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, name);
			return (!!(descriptor && (descriptor.get || descriptor.set)));
		});
		const methods: string[] = names.filter((name: string): boolean =>
			typeof (target as any)[name] === 'function' //|| target.hasOwnProperty(name))
			&& !accessors.includes(name)
		);
		const properties: (string | symbol)[] = Reflect.ownKeys(target)
			.filter((name: string | symbol): boolean =>
				![...accessors, ...methods].includes(name.toString())
				&& !['length', 'constructor', 'name', 'prototype'].includes(name.toString())
			);
		return ({
			properties,
			accessors,
			methods,
		});
	};

const listClassMembers: (target: Object) => IClassMembers
	= (target: Object): IClassMembers => {
		const constructors: string = (target as any).name;
		const names: string[] = Object.getOwnPropertyNames((target as any).prototype);
		const accessors: string[] = names.filter((name: string): boolean => {
			const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor((target as any).prototype, name);
			return (!!(descriptor && (descriptor.get || descriptor.set)));
		});
		const methods: string[] = names.filter((name: string): boolean =>
			name !== 'constructor' && typeof (target as any).prototype[name] === 'function'
		);
		// Properties are invisible from the prototype, can only be fetched from the instance
		//const properties = Object.getOwnPropertyNames((target as any).prototype);
		// Trying to fetch from a Property Decorator
		const properties = Reflect.getMetadata('design:properties', (target as any).prototype);
		return ({
			constructors,
			properties,
			accessors,
			methods,
		});
	};

// const listClassMembersFromInstance: (instance: Object) => IClassMembers
// 	= (instance: Object): IClassMembers => {
// 		const constructors: string = (instance as any).__proto__.constructor.name; // target.constructor.name;
// 		const names: string[] = Object.getOwnPropertyNames((instance as any).__proto__);
// 		const methods: string[] = names.filter((name: string): boolean =>
// 			name !== 'constructor' && typeof (instance as any).__proto__[name] === 'function'
// 		);
// 		const accessors: string[] = names.filter((name: string): boolean => {
// 			const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor((instance as any).__proto__, name);
// 			return (!!(descriptor && (descriptor.get || descriptor.set)));
// 		});
// 		const properties: (string | symbol)[] = Reflect.ownKeys(instance);

// 		return ({
// 			constructors,
// 			properties,
// 			accessors,
// 			methods,
// 		});
// 	};
//#endregion

// #region Decorator Debuggers
const classDecorator: (target: Object) => Dictionary<any>
	= (target: Object): Dictionary<any> => {
		const keys: (string | symbol)[] = Reflect.getMetadataKeys(target);

		const metadata: Dictionary<any> = {};
		keys.map((name: string | symbol): void => {
			metadata[name.toString()] = Reflect.getMetadata(name, target);
		});

		return ({
			keys,
			...metadata,
		});
	};

const propertiesDecorator: (instance: Object, names: (string | symbol)[]) => Dictionary<any>
	= (instance: Object, names: (string | symbol)[]): Dictionary<any> => {
		// const keys: (string | symbol)[] = Reflect.getMetadataKeys(instance);

		const metadata: Dictionary<any> = {};
		names.map((name: string | symbol): void => {
			const keys: (string | symbol)[] = Reflect.getMetadataKeys((instance as any).prototype || instance, name);
			metadata[name.toString()] = {
				keys,
			};
			keys.map((key: string | symbol): void => {
				metadata[name.toString()] = {
					...metadata[name.toString()],
					[key]: Reflect.getMetadata(key, (instance as any).prototype || instance, name),
				};
			});
		});

		return ({
			//keys,
			...metadata,
		});
	};

const methodsDecorator: (instance: Object, names: string[]) => Dictionary<any>
	= (instance: Object, names: string[]): Dictionary<any> => {
		// const keys: (string | symbol)[] = Reflect.getMetadataKeys(instance);

		// const metadataValue = Reflect.getOwnMetadata('ParameterDecorator', (instance as any).prototype, 'helloWithParam');
		// const metadataValue2 = Reflect.getMetadataKeys((instance as any).prototype, 'helloWithParam');

		// if ((instance as any).prototype) {
		// 	const jjj = Reflect.getMetadataKeys((instance as any).prototype, 'helloWithParam');
		// 	const param1Metadata = Reflect.getOwnMetadata('param2', (instance as any).prototype, 'helloWithParam');

		// 	console.log('Param1 Metadata:', param1Metadata); // Output: [0, 2]
		// } else  {
		// 	const jjj = Reflect.getMetadataKeys((instance as any).__proto__, 'helloWithParam');
		// 	const param1Metadata = Reflect.getOwnMetadata('param2', (instance as any).__proto__, 'helloWithParam');

		// 	console.log('Param1 Metadata:', param1Metadata); // Output: [0, 2]
		// }

		const metadata: Dictionary<any> = {};
		names.map((name: string): void => {
			const keys: (string | symbol)[] = Reflect.getMetadataKeys((instance as any).prototype || instance, name);
			metadata[name] = {
				keys,
			};
			keys.map((key: string | symbol): void => {
				metadata[name] = {
					...metadata[name],
					[key]: Reflect.getMetadata(key, (instance as any).prototype || instance, name),
				};
			});
			// Parameters
			// const parameterKeys: (string | symbol)[] = Reflect.getMetadataKeys((instance as any).__proto__, name);
			// parameterKeys
			// 	.filter((key: string | symbol): boolean => !['decoratedMethod', 'decoratedAccessor', 'design:paramtypes', 'design:type', 'design:returntype'].includes(key.toString()))
			// 	.map((key: string | symbol): void => {
			// 		const parameterMetadata: any[] = Reflect.getOwnMetadata(key, (instance as any).__proto__, name);
			// 		if (parameterMetadata && parameterMetadata.length > 0)
			// 			console.log(`Parameter ${name} Metadata ${key.toString()}:`, parameterMetadata);
			// 	});
		});

		return ({
			//keys,
			...metadata,
		});
	};

export const debugDecorator: (target: Object, /*instance: any,*/ format?: boolean) => void
	= (target: Object, /*instance: any,*/ format: boolean = false): void => {
		const staticMembers: IClassMembers = listStaticClassMembers(target);
		//const members: IClassMembers = listClassMembersFromInstance(instance);
		const members: IClassMembers = listClassMembers(target);

		const result: Dictionary<any> = {
			class: classDecorator(target),
			staticProperties: propertiesDecorator(target, staticMembers.properties),
			staticAccessors: methodsDecorator(target, staticMembers.accessors),
			staticMethods: methodsDecorator(target, staticMembers.methods),
			// properties: propertiesDecorator(instance, members.properties),
			// accessors: methodsDecorator(instance, members.accessors),
			// methods: methodsDecorator(instance, members.methods),
			properties: propertiesDecorator(target, members.properties),
			accessors: methodsDecorator(target, members.accessors),
			methods: methodsDecorator(target, members.methods),
		};

		console.debug(format ? formatToJson(result, 4) : result);
	};
//#endregion

export default debugDecorator;
