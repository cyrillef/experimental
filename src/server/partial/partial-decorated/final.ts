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

// import sealed from '@/decorators/sealed';
import { Final } from '@/partial/partial-decorated/decorators/partial';

// import { ITestClass } from '@/partial/test-class';

// export * from '@/partial-decorated/partial-1';
// export * from '@/partial-decorated/partial-2';

// import PartialOneClass from '@/partial-decorated/partial-1';
// import PartialTwoClass from '@/partial-decorated/partial-2';

// const FinalDecoratedClass = assemblePartials(PartialOneClass, PartialTwoClass);

// export default FinalDecoratedClass;


// function reportableClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T): T {
// 	return class extends constructor {
// 		reportingURL = "http://www...";
// 	};
// }

// @reportableClassDecorator
// class BugReport {
// 	type = "report";
// 	title: string;

// 	constructor(t: string) {
// 		this.title = t;
// 	}
// }

// const bug = new BugReport("Needs dark mode");
// console.log(bug.title); // Prints "Needs dark mode"
// console.log(bug.type); // Prints "report"


// function mySubclassDecorator<T extends { new(...args: any[]): {} }>(constructor: T): Function | void {
// 	return (class extends constructor {
// 		mymethod(): void {
// 			console.log(`I am 'mymethod' from mySubclassDecorator`);
// 		}
// 	});
// }

@Final
// @mySubclassDecorator
// @sealed
export class FinalDecoratedClass {

	public constructor() {}

}

export default FinalDecoratedClass;
