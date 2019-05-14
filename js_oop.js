// LECTURE Into to OOP with JavaScript

// Constructor function for a house object
function House(bedrooms, bathrooms, numSqft) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}

var firstHouse = House(2,2,1000);
firstHouse // undefined

/* We get undefined above because we have not 
explicityly binded the keyword 'this' or placed
it inside of a declared object, so that value of
'this' is currently the global object */

// LECTURE The 'new' Keyword

/* The new keyword does 4 main things:
    1) creates an empty object
    2) Sets the keyword 'this' to be that
    empty object
    3) It adds the line 'return this' to
    the end of the function which follows it
    4) It adds a property onto the empty object
    called "__proto__", which links the
    prototype property on the constructor 
    function to the empty object
*/

// LECTURE Refactoring with Multiple Constructors

/* Consider creating two constructor functions, one
for a Car and one for a motorcycle.  Note that both
share many similar properties */
function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}

function Motorcycle(make, model, year){
    
    // using call() to change the context of the
    // keyword 'this', so that it now points to 
    // Car instead of Motorcycle and so that
    // Motorcycle "inherits" from Car, and the
    // properties of Car using the keyword 'this'
    // are properties of Motorcycle with their  
    // respective 'this' keyword pointing to
    // Motorcycle
    Car.call(this, make, model, year); 
    
    // Car.apply(this, [make,model,year]); This would also work
    // Car.apply(this, arguments)          This would also work
    this.numWheels = 2;
}

// LECTURE Intro to Prototypes

// LECTURE The Prototype Chain

// LECTURE Prototypal Inheritance
/* Passing methods and properites from one class
to another.  Used to mimic inheritance in OOP
languages. The main idea is that since the prototype
property is where all of the properties and methods
live, we need to have another constructor function 
to get all of those properties */

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.sayHi = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}

function Student(firstName, lastName) {
    return Person.apply(this, arguments);
}

// We don't need to redefine sayHi on the
// Student.prototype
Student.prototype.sayHi = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}

// Note that the below code is not good practice
Student.prototype.status = function() {
    return "I am currently a student!";
}

var elie = new Person('Elie', 'Schoppik');
elie.status(); // "I am currently a student!"

/* In general, we cannot assign one object to another
it will just create a reference.  If we change
Student.prototype, it will affect the Parent.prototype.
We still want all of the methods and prorperties from
the Parent.prototype, but we want two totally separate
objects - not a reference! In this case we can use
'Object.create', which creates a brand new function and
accepts as its first parameter, what the prototype 
object should be for the newly created object */
function Student(firstName, lastName) {
    return Person.apply(this, arguments);
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.status = function() {
    return "I am currently a student!"
}

var elie = new Person('Elie', 'Schoppik');

elie.status; // undefined, Student.prototype does
             // not effect Parent.prototype anymore

/* Why not use 'new' instead of 'Object.create'.
'new' will do almost the same thing, but add additional
unnecessary properties on the prototype object (since it
is creating an object with undefined properties just for 
the prototype) */ 
function Student(firstName, lastName) {
    return Person.apply(this, arguments);
}

Student.prototype = new Person;

/* Last porition of Prototype Inheritance - Recall,
every prototype object has a property on it called
constructor, which points back to the constructor
function */
Student.prototype.constructor;  // Person (Person constructor, need to reset this)
Student.prototype.constructor = Student;