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

import _fs from 'fs/promises';
import _path from 'path';
import _ts from 'typescript';

type TSConfigParseResult = {
	config?: any;
	error?: _ts.Diagnostic;
};

const getAliasEquivalent: (absolutePath: string, tsconfig: _ts.ParsedCommandLine) => string | null
	= (absolutePath: string, tsconfig: _ts.ParsedCommandLine): string | null => {
		const baseUrl: string = tsconfig.options.rootDir || '';
		const paths: _ts.MapLike<string[]> = tsconfig.options.paths || {};

		let returnedPath: string | null = null;
		Object.entries(paths).forEach(([alias, aliasPaths]: [string, string[]]): void => {
			for (const aliasPath of aliasPaths) {
				const resolvedAliasPath: string = _path.resolve(baseUrl, aliasPath.replace('*', ''));
				if (absolutePath.startsWith(resolvedAliasPath)) {
					const relativePath: string = _path.relative(resolvedAliasPath, absolutePath);
					returnedPath = alias.replace('*', relativePath.replace(/\\/g, '/'));
					break;
				}
			}
		});
		return (returnedPath);
	};

// const resolveAlias: (aliasPath: string, configParseResult: _ts.ParsedCommandLine) => string | undefined
// 	= (aliasPath: string, configParseResult: _ts.ParsedCommandLine): string | undefined => {
// 		const baseUrl: string = configParseResult.options.baseUrl || '';
// 		const paths: _ts.MapLike<string[]> | undefined = configParseResult.options.paths || {};

// 		for (const alias in paths) {
// 			const aliasPattern: RegExp = new RegExp(`^${alias.replace('*', '(.*)')}$`);
// 			const match: RegExpMatchArray | null = aliasPath.match(aliasPattern);
// 			if (match) {
// 				const resolvedPath: string = paths[alias][0].replace('*', match[1]);
// 				return (_path.resolve(baseUrl, resolvedPath));
// 			}
// 		}
// 		return (undefined);
// 	};

// const createComment: (sourceFile: _ts.SourceFile, comments: string) => _ts.SourceFile
// 	= (sourceFile: _ts.SourceFile, comments: string): _ts.SourceFile => {
// 		const comment: _ts.NotEmittedStatement = _ts.factory.createNotEmittedStatement(_ts.factory.createIdentifier(comments));
// 		return (_ts.factory.updateSourceFile(sourceFile, [...sourceFile.statements, comment]));
// 	};

// const createImportNamespace: (sourceFile: _ts.SourceFile, node: _ts.ClassDeclaration) => _ts.SourceFile
// 	= (sourceFile: _ts.SourceFile, node: _ts.ClassDeclaration): _ts.SourceFile => {
// 		const importDeclaration: _ts.ImportDeclaration = _ts.factory.createImportDeclaration(
// 			undefined,
// 			_ts.factory.createImportClause(
// 				false,
// 				_ts.factory.createIdentifier(node.name?.text || 'unknown'),
// 				undefined
// 			),
// 			_ts.factory.createStringLiteral('./test'),
// 		);
// 		return (_ts.factory.updateSourceFile(sourceFile, [...sourceFile.statements, importDeclaration]));
// 	};

const createImportElement: (node: _ts.ClassDeclaration, sourceFile: _ts.SourceFile, tsconfig: _ts.ParsedCommandLine) => [_ts.ImportDeclaration, _ts.SourceFile]
	= (node: _ts.ClassDeclaration, sourceFile: _ts.SourceFile, tsconfig: _ts.ParsedCommandLine): [_ts.ImportDeclaration, _ts.SourceFile] => {
		const importSpecifier: _ts.ImportSpecifier = _ts.factory.createImportSpecifier(
			false,
			undefined,
			_ts.factory.createIdentifier(node.name?.text || 'unknown')
		);
		const namedImports: _ts.NamedImports = _ts.factory.createNamedImports([importSpecifier]);
		const importClause: _ts.ImportClause = _ts.factory.createImportClause(false, undefined, namedImports);

		const alias: string | null = getAliasEquivalent(node.getSourceFile().fileName, tsconfig);
		const importDeclaration: _ts.ImportDeclaration = _ts.factory.createImportDeclaration(
			undefined,
			importClause,
			_ts.factory.createStringLiteral(alias || node.getSourceFile().fileName),
		);
		const result: _ts.SourceFile = _ts.factory.updateSourceFile(sourceFile, [...sourceFile.statements, importDeclaration]);
		return ([importDeclaration, result]);
	};

const createModuleDeclaration: (path: string, children: _ts.Statement[], sourceFile: _ts.SourceFile, tsconfig: _ts.ParsedCommandLine) => [_ts.ModuleDeclaration, _ts.SourceFile]
	= (path: string, children: _ts.Statement[], sourceFile: _ts.SourceFile, tsconfig: _ts.ParsedCommandLine): [_ts.ModuleDeclaration, _ts.SourceFile] => {
		const alias: string | null = getAliasEquivalent(path, tsconfig);
		const moduleName: _ts.StringLiteral = _ts.factory.createStringLiteral(alias || path);
		const moduleBlock: _ts.ModuleBlock = _ts.factory.createModuleBlock(children);
		const moduleDeclaration: _ts.ModuleDeclaration = _ts.factory.createModuleDeclaration(
			undefined,
			//[_ts.factory.createModifier(_ts.SyntaxKind.DeclareKeyword)],
			moduleName,
			moduleBlock,
			_ts.NodeFlags.None
		);
		const result: _ts.SourceFile = _ts.factory.updateSourceFile(sourceFile, [...sourceFile.statements, moduleDeclaration]);
		return ([moduleDeclaration, result]);
	};

const createNamespace: (nsName: string, sourceFile: _ts.SourceFile, parent?: _ts.ModuleDeclaration) => [_ts.ModuleDeclaration, _ts.SourceFile]
	= (nsName: string, sourceFile: _ts.SourceFile, parent?: _ts.ModuleDeclaration): [_ts.ModuleDeclaration, _ts.SourceFile] => {
		const namespaceDeclaration: _ts.ModuleDeclaration = _ts.factory.createModuleDeclaration(
			[_ts.factory.createModifier(_ts.SyntaxKind.DeclareKeyword)],
			_ts.factory.createIdentifier(nsName),
			//_ts.factory.createModuleBlock(sourceFile.statements),
			undefined,
			_ts.NodeFlags.Namespace
		);

		let result: _ts.SourceFile = sourceFile;
		if (parent) {
			const updatedModuleBlock: _ts.ModuleBlock = _ts.factory.updateModuleBlock(
				parent.body as _ts.ModuleBlock,
				[namespaceDeclaration]
			);
			const updatedModuleDeclaration: _ts.ModuleDeclaration = _ts.factory.updateModuleDeclaration(
				parent,
				parent.modifiers,
				parent.name,
				updatedModuleBlock
			);

			const newStatements: _ts.Statement[] = sourceFile.statements.map((statement: _ts.Statement): _ts.Statement =>
				statement === parent ? updatedModuleDeclaration : statement
			);

			result = _ts.factory.updateSourceFile(sourceFile, newStatements);
		} else {
			result = _ts.factory.updateSourceFile(sourceFile, [...sourceFile.statements, namespaceDeclaration]);
		}
		return ([namespaceDeclaration, result]);
	};

type TSReplacer = (key: string, value: any) => any;

const circularReplacer: () => TSReplacer
	= (): TSReplacer => {
		const seen: WeakSet<any> = new WeakSet<any>();
		return ((key: string, value: any): any => {
			if (typeof value === 'object' && value !== null) {
				if (seen.has(value))
					return ('[Circular]');
				seen.add(value);
			}
			if (key === 'kind')
				return (_ts.SyntaxKind[value]);
			if (key === 'flags')
				return (_ts.NodeFlags[value]);
			if (key === 'modifierFlagsCache')
				return (_ts.ModifierFlags[value]);
			//return (_ts.SymbolFlags[value]);
			//InternalSymbolName
			//TypeFlags
			//ObjectFlags
			//ElementFlags
			// SignatureKind

			return (value);
		});
	};

const onFileChange: (filePath: string, configPath: string) => Promise<void>
	= async (filePath: string, configPath: string): Promise<void> => {

		const fileContent: string = await _fs.readFile(filePath, 'utf8');
		const sourceFile: _ts.SourceFile = _ts.createSourceFile(filePath, fileContent, _ts.ScriptTarget.Latest, true);
		await createJsonFile(filePath, sourceFile);

		const dtsFilePath: string = filePath.replace(/\.ts$/, '.d.ts');
		const comments: string = '// Do not modify this file. It is auto-generated from the original file.\n/*jshint esversion: 9 */\nconst version: string = \'1.0.0.0\'\n';
		// const comments: string = '// Do not modify this file. It is auto-generated from the original file.\n/*jshint esversion: 9 */\n\n';
		let targetSource: _ts.SourceFile = _ts.createSourceFile(dtsFilePath, comments, _ts.ScriptTarget.Latest, false, _ts.ScriptKind.TS);
		// const comments: string = '// Do not modify this file. It is auto-generated from the original file.\nconst _version: string = \'1.0.0.0\'\n';
		// targetSource = createComment(targetSource, comments);

		const configFile: TSConfigParseResult = _ts.readConfigFile(configPath, _ts.sys.readFile);
		const configParseResult: _ts.ParsedCommandLine = _ts.parseJsonConfigFileContent(configFile.config, _ts.sys, _path.dirname(configPath));

		let containsFinalDecorator: boolean = false;

		const hasDecorator: (node: _ts.ClassDeclaration, decoratorName?: string) => boolean
			= (node: _ts.ClassDeclaration, decoratorName: string = 'Final'): boolean => {
				for (let i = 0; node.modifiers && i < node.modifiers.length; i++) {
					if (_ts.isDecorator(node.modifiers[i])) { // node.modifiers[i].kind === _ts.SyntaxKind.Decorator
						const test: string = (node.modifiers[i] as _ts.Decorator).expression.getFullText(); // .expression.text
						if (test === decoratorName)
							return (true);
					}
				}
				return (false);
			};
			
		const visit: (node: _ts.Node) => void
			= (node: _ts.Node): void => {
				let importDeclaration: _ts.ImportDeclaration;
				let moduleDeclaration: _ts.ModuleDeclaration;
				let namespaceDeclaration: _ts.ModuleDeclaration;
				if (_ts.isClassDeclaration(node) && hasDecorator(node, 'Final')) {
					containsFinalDecorator = true;
					[importDeclaration, targetSource] = createImportElement(node, targetSource, configParseResult);
					// [moduleDeclaration, targetSource] = createModuleDeclaration(node.getSourceFile().fileName, targetSource, configParseResult);
					// [namespaceDeclaration, targetSource] = createNamespace(node.name?.text || 'unknown', targetSource, moduleDeclaration);
					[namespaceDeclaration, targetSource] = createNamespace(node.name?.text || 'unknown', targetSource);

					const children: _ts.Statement[] = [
						namespaceDeclaration,
					];
					[moduleDeclaration, targetSource] = createModuleDeclaration(node.getSourceFile().fileName, children, targetSource, configParseResult);

				}
				_ts.forEachChild(node, visit);
			};

		// const printer = _ts.createPrinter();
		// const result: string = printer.printFile(sourceFile);

		//const sss = _ts.getDecorators(sourceFile);
		// const sss = _ts.getConfigFileParsingDiagnostics(sourceFile);

		visit(sourceFile);

		if (containsFinalDecorator)
			createDtsFile(filePath, targetSource);

	};

const createJsonFile: (filePath: string, sourceFile: _ts.Node) => Promise<void>
	= async (filePath: string, sourceFile: _ts.Node): Promise<void> => {
		const jsonFilePath: string = filePath.replace(/\.ts$/, '.json');
		const jsonString = JSON.stringify(sourceFile, circularReplacer(), 4);
		await _fs.writeFile(jsonFilePath, jsonString);
	};

const createDtsFile: (filePath: string, targetSource: _ts.SourceFile) => Promise<void>
	= async (filePath: string, targetSource: _ts.SourceFile): Promise<void> => {
		const dtsFilePath: string = filePath.replace(/\.ts$/, '.d.ts');
		// const content: string = `// This file was generated because the original file contains the @Final decorator.\n`;
		// await _fs.writeFile(dtsFilePath, content);
		const printer: _ts.Printer = _ts.createPrinter(
			{
				removeComments: false,
				newLine: _ts.NewLineKind.LineFeed,
				omitTrailingSemicolon: false,
				noEmitHelpers: false,
			}
		);
		//const st = printer.printNode(_ts.EmitHint.Unspecified, targetSource, _ts.createSourceFile('temp.ts', '', _ts.ScriptTarget.Latest, true));

		const content: string = printer.printFile(targetSource);
		await _fs.writeFile(dtsFilePath, content);
	};

(async () => {

	const filePath: string = process.argv[2];
	const configPath: string = process.argv[3];
	console.log(`filePath = ${filePath}`);
	if (filePath)
		onFileChange(filePath, configPath);

})();
