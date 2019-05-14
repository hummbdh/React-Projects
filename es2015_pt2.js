// COURSE - The Advanced Web Developer Bootcamp

// LECTURE Introdcution to the 'class' Keyword
/*
1) A new reserved keyword provided by ES2015.
2) The class keyword creates a constant - can not be
redeclared.
3) The class keyword is an abstraction of constructor 
functions and prototypes.  Javascript does not have
built in support for object oriented programming
4) The class keyword does not hoist
5) Still use 'new' keyword to create objects
*/

/* Example of Object being created in ES5 
   1) Creates a constructor function
   2) Uses the 'new' keyword to create objects
*/ 
function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

var elie = new Student('Elie', 'Schoppik'); // ES5

/* Example of Object being created in ES2015 
   1) Use the 'class' keyword instead of creating 
   a function
   2) Inside, use a special method constructor which
   is run when 'new' is used
   3) Use the 'new' keyword to create objects
*/
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

var elie = new Student('Elie', 'Schoppik');

// LECTURE Instance Methods
/* Before ES2015 Instance method and properties were
typically placed on the prototype object, see example
below: */

function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Shared methods and properties placed directly
// on the function's prototype property
Student.prototype.sayHello = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}

/* In ES2015, place prototype methods inside of the 
class.  Under the hood methods are being placed on 
the prototype object */
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello() {
        return 'Hello ${this.firstName} ${this.lastName}';
    }
}

/* Example below place methods directly on the 
constructor function, so in this sense they are 
class methods */

// ES5 Example
function Student(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

Student.prototype.sayHello = function() {
    return "Hello " + this.firstName + " " + this.lastName;
}

// isStudent method that returns true if object
// passed to it has the  Student constructor property
Student.isStudent = function(obj) {
    return obj.constructor === Student;
}

// LECTURE Class Methods

// ES2015 Example
// Methods and properties that are added directly
// onto a class use the 'static' keyword.  Static
// methods are useful because sometimes we don't 
// want every object created from a class to have
// its own method
class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello() {
        return 'Hello ${this.firstName} ${this.lastName}';
    }
    // add a static method on class
    static isStudent(obj) {
        return obj.constructor === Student;
    }
}

// LECTURE Inheritance with ES2015
/* Passing along methods and properties from one 
class to another */

// Example in ES5
function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.sayHello() {
    return "Hello " + this.firstName + " " + this.lastName;
}

function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Inhertiance accomplished by setting the 
// prototype property of a constructor to be
// an objet created from another prorotype 
// property.  Reset the constructor property on
// a constructor function
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// Example in ES2015, accomplishment mostly
// through the use of the 'extends' keyword
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello(){
        return 'Hello ${this.firstName} ${this.lastName}';
    }
}

class Student extends Person {
    
}

// LECTURE - Super

/* Consider duplication present in two different
constructor functions: */

function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.sayHello() {
    return "Hello " + this.firstName + " " + this.lastName;
}

function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

/* Can we borrow the code from the Person function
and use it in the Student function? 
We can use call() or apply() */

// rewrite Student
function Student() {
    Person.apply(this, arguments);
}

// ES2015 Rewrite

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello(){
        return 'Hello ${this.firstName} ${this.lastName}';
    } 
}

// Student is child class and Person is parent class
class Student extends Person {
    constructor(firstName, lastName) {
        // super() must be used here and it can only be
        // used if a methods by the same name is implemented
        // in the parent class
        super(firstName, lastName);
    }
}

// LECTURE Maps

/* Map also called "hash maps" in other languages.  Until
ES2015 - objects were replacements for maps.  Similar to
objects, except the keys can be ANY data type. Created
using the 'new' keyword.

Can easily iterate over values of a map since Map comes
with a forEach method 

Maps implement a Symbol.iterator which means we can 
use a for... of loop: */

mapping.values(); // MapIterator of values
mapping.keys(); // MapIterator of keys

/* Reasons to use Map:

1) Compared to an object, findind the size is easy
2) Keys can be any data type
3) Maps do not have their own prototype object so you 
don't have to worry about accidentally overwriting keys
on the Object.prototype in an object you make
4) Iterating over keys and values in a map is quite 
easy as well */

/* When to use Maps: If you need to look up keys 
dynamically (they ar enot hard coded strings), if you
need keys that are not strings, or if you are frequently
adding and removing key/value paris, and if you need to 
add or remove key-value pairs frequently then maps are
easier to move than objects.  

If you are operating on multipule keys at a time, then 
use a weak map, whcih is similar to a map, but all keys
MUST be objects.  Values in a WeakMap can be cleared from
memory if there is no reference to them.  Generally don't 
use them very much but they are more performant than maps, 
and they cannot be iterated over */

// LECTURE Sets

/* All values in a set are unique, any type of value can
exist in a set, and created using the 'new' keyword 

Example: */

// Create a new set, using the Set constructor
var s = new Set;
// Can also be created from an array
var s2 = new Set([3,1,4,1,2,1,5]);

// can add values to a set
s.add(10);
s.add(20);
s.add(10); // (10,20) 
s.size;    // 2

s.has(10); // true
s.delete(20); // true
s.size; // 1

s2[Symbol.iterator]; // function(){} ...
// We can use a for ... of loop

/* Weak Sets - Similar to a Set, but elements must all
be objects, and values can be cleared from memery if there
is no reference to them, finally we cannot iterate over a
weak set, just like we cannot for maps*/

// LECTURE Promises

/* Promise constructor helps managae Async code. Recall,
a promise is a one time guaranteed return of some future value.
We don't know what value of Async operation will be or when it
will finish executing.  Once the value is returned from a
promise, the promise is resolved/fulfilled or rejected.
The main use of promises is as a way to refactor callback code. */

/* Creating Promises - Use the new keyword, Every promise
constructor accepts a callback function tttttha contais two
parameters, resolve and reject.  You can call these parameters
whatever you like, resolve and reject are most common. These 
parameters are both function to be run if the promise is resolved
or rejected */

/* The returned value from a promise will always contain a .then
and .catch method which are functions to be executed when the 
promise is resolved or rejected */

function displayAtRandomTime() {
    // Return a new Promise that will run a setTimeout, and after
    // one second if the result of promise is affirmative, get
    // output 'yes'.  This example shows that we are running some
    // Async operation and we are waiting till it resolves or
    // rejects
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if(Math.random() > 0.5) {
                resolve('Yes!');
            }
            else
            {
                reject('No!');
            }
        }, 1000);
    });
}

// The displayAtRandomTime() function returns a promise that can be 
// resolved (evaluated) using '.then()', if promise is rejected then we can 
// evaluate using the '.catch()'

displayAtRandomTime().then(function(value){
    console.log(value);
}).catch(function(error){
    console.log(error);
})

/* Returning Promises - Since a promise always returns 
something that has a .then (thenable) we can change
promises together and return values from one promise
to another */
var years = [];
$.getJSON('https://omdbapi.com?t=titanic')

.then(function(movie) {
    years.push(movie.Year);
    return $.getJSON('https://omdbapi.com?t=shrek...');
})

.then(function(movie) {
    years.push(movie.Year);
    console.log(years);
})

console.log('All Done');

// 'All Done'
// ["1997", "2001"]

// LECTURE Promises Continued
/* Promise.all accepts an array of promises and resolves
all of them or rejects once a single one of the promises
has been rejected (fail fast behaviour).  If all of the
passed-in promises fulfill, Promise.all is fulfilled with 
an array of the values from the passed-in promises, in the
same order as the promises passed in.  These promises do
not resolve sequentially, but Promise.all waits for them*/

/* Example, notice no promise chaining using .then()'s */
function getMovie(title) {
    return $.getJSON('https://omdbapi.com?t={title}&apikey=thewdb');
}
var titanicPromise = getMovie('titanic');
var shrekPromise = getMovie('shrek');
var braveheartPromise = getMovie('braveheart');

// We can now resolve all of the promises using Promise.all
Promise.all([titanicPromise, braveheartPromise, shrekPromise]).then(function(movies) {
    return movies.forEach(function(value) {
        console.log(value.Year);
    });
});

// 1997
// 1995
// 2001

// LECTURES Generators
/* A special kind of function that can pause execution and
resume at any time.  Created using a '*'.  When invoked, a
generator object is returned to us with the keys of value
and done.  Value is what is returned form the paused function
using the 'yield' keyword. Done is a boolean which returns 
true when the function has completed */