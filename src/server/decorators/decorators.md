# Decorators

https://www.typescriptlang.org/docs/handbook/decorators.html

## Introduction
With the introduction of Classes in TypeScript and ES6, there now exist certain scenarios that require additional features to support annotating or modifying classes and class members. Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.

## Decorators
A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

* class, 
* method, 
* accessor, 
* property, 
* parameter,

### Decorator Factories
If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.

We can write a decorator factory in the following fashion:

```ts
function color(value: string) {
	// this is the decorator factory, it sets up the returned decorator function
	return (function (target) {
		// this is the decorator do something with 'target' and 'value'...
	});
}
```

### Decorator Evaluation
There is a well defined order to how decorators applied to various declarations inside of a class are applied:

1. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
2. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
3. Parameter Decorators are applied for the constructor.
4. Class Decorators are applied for the class.

## Decorators

### Class Decorators
A Class Decorator is declared just before a class declaration. The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition. A class decorator cannot be used in a declaration file, or in any other ambient context (such as on a declare class).

***The expression for the class decorator will be called as a function at runtime, with the constructor of the decorated class as its only argument.***

```ts
function sealed(constructor: Function): Function | void
```

If the class decorator returns a value, it will replace the class declaration with the provided constructor function.

ex:
```ts
function mySubclassDecorator<T extends { new (...args: any[]): {} }>(constructor: T): Function | void {
	return (class extends constructor {
		...
	});
}
```

**Note** that the decorator _does not_ change the TypeScript type and so new properties or methods are not known to the type system.

ex:
```ts
export function AddMethod(): Function {
	return (function (target: any): void {
		target.prototype.newMethod = function () {};
		target.newStaticMethod = function () {};
	});
}

@AddMethod()
class MyClass { }

// Usage
const instance = new MyClass();
instance.newMethod(); // <<-- Property 'newMethod' does not exist on type 'MyClass'.
MyClass.newStaticMethod(); // <<-- Property 'newStaticMethod' does not exist on type 'typeof MyClass'.

// Extend the type of MyClass to include the new method
interface MyClass {
	newMethod(): void;
}
instance.newMethod(); // <<-- Ok

// Type assertion to extend the constructor type
interface MyClassConstructor {
	newStaticMethod(): void;
}
(MyClass as unknown as MyClassConstructor).newStaticMethod();
```

### Method Decorators
A Method Decorator is declared just before a method declaration. The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition. A method decorator cannot be used in a declaration file, on an overload, or in any other ambient context (such as in a declare class).

The expression for the method decorator will be called as a function at runtime, with the following three arguments:

1. Either
	* the constructor function of the class for a static member, 
	* or the prototype of the class for an instance member.
2. The name of the member.
3. The Property Descriptor for the member.

If the method decorator returns a value, it will be used as the Property Descriptor for the method.

### Accessor Decorators
An Accessor Decorator is declared just before an accessor declaration. The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor’s definitions. An accessor decorator cannot be used in a declaration file, or in any other ambient context (such as in a declare class).

***NOTE*** - TypeScript disallows decorating both the get and set accessor for a single member. Instead, all decorators for the member must be applied to the first accessor specified in document order. This is because decorators apply to a Property Descriptor, which combines both the get and set accessor, not each declaration separately.

The expression for the accessor decorator will be called as a function at runtime, with the following three arguments:

1. Either 
	* the constructor function of the class for a static member, 
	* or the prototype of the class for an instance member.
2. The name of the member.
3. The Property Descriptor for the member.

### Property Decorators
A Property Decorator is declared just before a property declaration. A property decorator cannot be used in a declaration file, or in any other ambient context (such as in a declare class).

The expression for the property decorator will be called as a function at runtime, with the following two arguments:

1. Either 
	* the constructor function of the class for a static member, 
	* or the prototype of the class for an instance member.
2. The name of the member.

***NOTE*** - A Property Descriptor is not provided as an argument to a property decorator due to how property decorators are initialized in TypeScript. This is because there is currently no mechanism to describe an instance property when defining members of a prototype, and no way to observe or modify the initializer for a property. The return value is ignored too. As such, a property decorator can only be used to observe that a property of a specific name has been declared for a class.

### Parameter Decorators
A Parameter Decorator is declared just before a parameter declaration. The parameter decorator is applied to the function for a class constructor or method declaration. A parameter decorator cannot be used in a declaration file, an overload, or in any other ambient context (such as in a declare class).

The expression for the parameter decorator will be called as a function at runtime, with the following three arguments:

1. Either 
	* the constructor function of the class for a static member, 
	* or the prototype of the class for an instance member.
2. The name of the member.
3. The ordinal index of the parameter in the function’s parameter list.

***NOTE*** - A parameter decorator can only be used to observe that a parameter has been declared on a method.
