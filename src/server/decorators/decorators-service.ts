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

type AttributeOptions = { [key: string]: any };

export class DecoratorService {

	public constructor(public ATTRIBUTE_KEY: string) {
	}

	// Returns model attributes from target by restoring this information from reflect metadata
	public getAttributesCopy<T extends AttributeOptions>(target: Object): T | undefined {
		const attributes: T = Reflect.getMetadata(this.ATTRIBUTE_KEY, target);
		if (attributes) {
			return (Object.keys(attributes).reduce((copy: any, key: string): any => {
				copy[key] = { ...(attributes as any)[key], };
				return (copy);
			}, {}));
		}
		return (undefined);
	}

	public getAttributes<T extends AttributeOptions>(target: Object): T | undefined {
		const attributes: T = Reflect.getMetadata(this.ATTRIBUTE_KEY, target);
		if (attributes)
			return ({ ...attributes });
		return (undefined);
	}

	// Sets attributes
	public setAttributes<T>(target: Object, attributes: T): void {
		Reflect.defineMetadata(this.ATTRIBUTE_KEY, { ...attributes }, target);
	}

	// Adds model attribute by specified property name and sequelize attribute options and stores this information through reflect metadata
	public addAttribute<T extends AttributeOptions>(target: any, name: string | symbol, options: Partial<T>): void {
		let attributes: T | undefined = this.getAttributes(target);
		if (!attributes)
			attributes = {} as T;
		(attributes as any)[name] = { ...options };
		this.setAttributes(target, attributes);
	}

	// Adds attribute options for specific attribute
	public addAttributeOptions<T extends AttributeOptions>(target: Object, name: string | symbol, options: Partial<T>): void {
		const attributes: T | undefined = this.getAttributes(target);
		if (!attributes || !(attributes as any)[name])
			throw new Error(`<%- missingAttributeMessage %>`);
		//throw new Error(`Annotation is missing for "${name.toString()}" of class "${target.constructor.name} or annotation order is incorrect!`);
		(attributes as any)[name] = deepAssign((attributes as any)[name], options);
		this.setAttributes(target, attributes);
	}

	// Decorates target with attribute options
	public decorate<T extends AttributeOptions>(target: Object, name: string | symbol, descriptor?: TypedPropertyDescriptor<any>, options?: T): void {
		let _options: T = { ...options, descriptor, } as unknown as T;
		this.addAttribute(target, name, _options);
	}

}

export default DecoratorService;