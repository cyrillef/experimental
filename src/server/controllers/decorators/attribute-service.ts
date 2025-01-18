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
import { deepAssign } from '@/libs/object';

const ATTRIBUTE_KEY: string = 'controllers:router'; // 'router:attribute';

// Returns model attributes from class by restoring this information from reflect metadata
export const getAttributes: (target: any) => any | undefined
	= (target: any): any | undefined => {
		const attributes: any = Reflect.getMetadata(ATTRIBUTE_KEY, target);
		if (attributes)
			return (Object.keys(attributes).reduce((copy: any, key: string): any => {
				copy[key] = { ...attributes[key] };
				return (copy);
			}, {}));
		return (undefined);
	};

// Sets attributes
export const setAttributes: (target: any, attributes: any) => void
	= (target: any, attributes: any): void =>
		Reflect.defineMetadata(ATTRIBUTE_KEY, { ...attributes }, target);

// Adds model attribute by specified property name and sequelize attribute options and stores this information through reflect metadata
export const addAttribute: (target: any, name: string | symbol, options: any) => void
	= (target: any, name: string | symbol, options: any): void => {
		let attributes: any | undefined = getAttributes(target);
		if (!attributes)
			attributes = {};
		attributes[name] = { ...options };
		setAttributes(target, attributes);
	};

// Adds attribute options for specific attribute
export const addAttributeOptions: <T>(target: any, name: string | symbol, options: Partial<T>) => void
	= <T>(target: any, name: string | symbol, options: Partial<T>): void => {
		const attributes: any | undefined = getAttributes(target);
		if (!attributes || !attributes[name])
			throw new Error(`@GET/POST/PATCH/DELETE/HEAD annotation is missing for "${name.toString()}" of class "${target.constructor.name}" or annotation order is wrong.`);
			//throw new Error(`Annotation is missing for "${name.toString()}" of class "${target.constructor.name} or annotation order is incorrect!`);
		attributes[name] = deepAssign(attributes[name], options);
		setAttributes(target, attributes);
	};
