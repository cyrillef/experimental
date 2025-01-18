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

import 'module-alias/register';
import _path from 'path';
import _fs from 'fs/promises';
import ejs from 'ejs';

let root: string = _path.resolve(__dirname, '../src/server');
if (root.includes('/bin/'))
	root = _path.resolve(__dirname, '../../src/server');

const CONTROLLER_PATH: string = _path.resolve(root, 'controllers/decorators', 'attribute-service.ts');
const CONTROLLER_ROUTER_KEY: string = 'controllers:router';
const CONTROLLER_MISSING_ATTRIBUTE_MESSAGE: string = '@GET/POST/PATCH/DELETE/HEAD annotation is missing for "${name.toString()}" of class "${target.constructor.name}" or annotation order is wrong.';

const DEFAULT_MISSING_ATTRIBUTE_MESSAGE: string = '`Annotation is missing for "${name.toString()}" of class "${target.constructor.name}".`';
const ATTRIBUTE_SERVICE: string = _path.resolve(root, 'decorators', 'decorators-service-template.ts'); // .ejs

const generateAttributeServiceCode: (filename: string, attributeKey: string, missingAttributeMessage?: string, service?: string) => Promise<void>
	= async (filename: string, attributeKey: string, missingAttributeMessage: string = DEFAULT_MISSING_ATTRIBUTE_MESSAGE, service: string = ATTRIBUTE_SERVICE): Promise<void> => {
		await _fs.writeFile(filename, await ejs.renderFile(service, { attributeKey, missingAttributeMessage, }), 'utf8');
		console.log(`Generated: ${filename.substring(root.length)}`);
	};

(async () => {

	await generateAttributeServiceCode(CONTROLLER_PATH, CONTROLLER_ROUTER_KEY, CONTROLLER_MISSING_ATTRIBUTE_MESSAGE, ATTRIBUTE_SERVICE);

})();