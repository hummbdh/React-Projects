// COURSE - The Advanced Web Developer Bootcamp
// LECTURE Const

// We can never redeclare a variable by the same name
const anotherInstructor = "Tim";
anotherInstructor = "Elie"; // TypeError
const anotherInstructor = "New"; // SyntaxError

/* This can be done, even though numbers is a const
Can mutate variable if it is an object, but
not declare it again.  Const also does not make
objects immuatable */
const numbers = [1,2,3,4]
numbers.push(10);


// LECTURE Let
/* let is mostly used to change scope.  When it is
used inside of functions it does not behave like
the var keyword.  Blocks create scope, so does 'let'
*/

let anotherInstructor = "Tim";
anotherInstructor = "Elie"; // No problems here!

let anotherInstructor = "Tim"; // SyntaxError

var instructor = "Elie";

if (instructor === "Elie") {
    let funFact = "Plays the cello";
}

funFact; // ReferenceError

/*
Hoisting - Used to explain behavior of 'var' does.
Hoisiting means that variable defined using the 'var'
keyword will have their variable declaration lifted
to the top of the scope that they are in
*/
function helloInstructor() {
    var elie;
    return elie;
    elie = "Me!";
}

helloInstructor() // undefined

/* let hoists variables, but we do not have access to
the value of the variable.  Let puts the variable in a 
Temporal Dead Zone. */

function helloSecondInstructor() {
    return colt;
    let colt = "HIM!";
}

helloSecondInstructor() // ReferenceError

/* Use let inside of a block when we don't want the
variables defined inside of the block to be accessible
outside of the block */

/* Example */
for(var i = 0; i<5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

/* The for loop above will print out '5'. It effectively
runs the loop 5 times, so the variable i gets redeclared
5 times */

for(let i = 0; i<5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

/* The for loop above will print out the numbers 1
through 5.  The loop runs 5 times. But redeclares 
the variable in the for loop only once*/

// Note - We cannot redeclare the let keyword 
// after having already declared it

// LECTURE Template Strings
/* Used to concate strings. Use backticks "`" to write
multiline strings */
var firstName = "Elie";
var lastName = "Schoppik";
console.log('Hello ${firstName} ${lastName}');

// LECTURE Introduction to Arrow Functions
var add = function(a,b) {
    return a+b;
}

/* arrow functions mostly replace the keyword function
with => */

var add = (a,b) => a+b;

/* Another example that replaces the map() function 
which iterates over an array */
[1,2,3].map(function(value) {
    return value*2;
}); // [2,4,6]

[1,2,3].map(value => value * 2); // [2,4,6]

/* Second Example */
function doubleAndFilter(arr) {
    return arr.map(function(value) {
        return value*2;
    }).filter(function(value) {
        return value % 3 === 0;
    })
};

doubleAndFilter([5,10,15,20]);

var doubleAndFilter = arr => arr.map(val => val * 2).filter(num => num % 3 === 0);
doubleAndFilter([5,10,15,20]);

// LECTURE Arrow Functions Continued

/* Arrow functions are not the same as regular functions
and they should not necessairly be used to replace 
functions in general.  Arrow functions do not get their
own 'this' keyword.  Instead inside of an arrow function,
the keyword 'this' has its original menaing from the 
enclosing context*/

/* Example */
var instructor = {
    firstName: "Elie";
    sayHi: function() {
        setTimeout(function() {
            // note that context of 'this' refers to the window
            console.log("Hello " + this.firstName);
        }, 1000);
    }
}

instructor.sayHi(); // "Hello undefined"

/* In order to get above example to print out
"Hello Elie" we will use bind to change the 
context of the 'this' keyword for the setTimeout
function, and because we do not want to 
immediatley invoke the function like call()
and apply() would do */
var instructor = {
    firstName: "Elie";
    sayHi: function() {
        setTimeout(function() {
            console.log("Hello " + this.firstName);
        }.bind(this), 1000);
    }
}

instructor.sayHi(); // "Hello Elie"

/* But we can use arrow functions so that we don't 
have to use bind().  This is because the value of the
'this' keyword for arrow functions is the closing
context */
var instructor = {
    firstName: "Elie",
    sayHi: function() {
        setTimeout(() => {
            console.log("Hello " + this.firstName);
        }, 1000);
    }
}

instructor.sayHi(); // "Hello Elie"

/* arrow functions do not get their own keyword
arguments.  An arguments keyword can be acceseed if
the array function is inside of another function
(it will be the outer functions arguments) */

var add = (a,b) => {
    return arguments;
}

add(2,4);  // ReferenceError: Arguments is not defined

function outer() {
    return innerFunction = () => {
        return arguments;
    }
}

outer(1)(2); // Only prints out [1]

/* We should never use Arrow functions as methods in objects since
we will get the incorrect value of the keyword this.  Note, ES2015
provides a better alternative. */
var instructor = {
    firstName: "Elie",
    sayHi: () => `Hello ${this.firstName}`;
}

instructor.sayHi(); // "Hello undefined"

// LECTURE For ... of Loops

/* A type of loop for easily iterating over arrays and newer
data structors of ES2015.  ES2015 gives a new primative data
type called a symbol, which has a method that is implememted 
with a 'for of' loop. 'For of' cannot be used to iterate over
an object.  These sort of loops can't access an index, and can
only be used on data structures with Symbol.iterator method 
implemented (so no objects) */

var arr = [1,2,3,4,5];

for(let val of arr) {
    console.log(val);
}

// 1
// 2
// 3
// 4
// 5

// LECTURE Rest

/* Operator that collects the remaining arguments to a
function and returns them to us in an array.  '...' the
rest operator "only" when it is a parameter to a function.
Is accessed without the '...' in a function. */
function printRest(a, b, ...c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

printRest(1, 2, 3, 4, 5);

// 1
// 2
// [3, 4, 5]

/* Example code that can be improved with Rest operator */
function sumArguments() {
    var total = 0;
    for(var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

/* Above example continued */
// turn the arguments array like object into an array
// using slice and call

function sumArguments() {
    var argumentsArray = [].slice.call(arguments);
    // reduce method to sum all of the values
    return argumentsArray.reduce(function(accumulator, nextValue) {
       return accumulator + nextValue; 
    });
}

/* above example using rest operator.  Rest operator used to
gather all of the arguments in an array so that array like object 
'arguments' doesn't need to be used */
var sumArguments = (...args) => args.reduce((acc, next) => acc + next));

// LECTURE Spread

/* Spread operator allows us to take an array and "spread" out
(as comma seperated value).  Useful when you have an array,
but what are you are working with expects comma seperated values */
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = [7,8,9];

// since '...' is not a parameter to a funciton it is not the Rest
// operator
var combined = [...arr1, ...arr2, ...arr3];

/* Second Example */
var arr = [3,2,4,1,5];
Math.max(...arr); // 5

/* Another Example */
function sumValues(a,b,c) {
    return a+b+c;
}

var nums = [12,15,20];

sumValues.apply(this, nums); // 47

sumValues(...nums);

// LECTURE Object Enhancements
var firstName = "Elie";
var lastName = "Schoppik";

var instructor = {
    firstName,
    lastName
}

var instructor = {
    sayHello() {
        return "Hello!";
    }
}

// Computed Property Names
var firstName = "Elie";
var instructor = {};

instructor[firstName] = "That's me!";
instructor.Elie; // "That's me!"

// ES2015
var firstName = "Elie";
var instructor = {
    [firstName]: "That's me!"
}
instructor.Elie; // That's me!

// LECTURE Object Destructuring

/* Below code shows that we pass ina destructured object as
a default parameter!  We assign as a default value an empty
object so ES2015 knows we are destructuring.  If nothing is
passed in, we default to the destructured object as the
parameter */
function createInstructor({name = {first: "Matt", Last: "Lane"}, isHilarious=false} = {}) {
    return [name.first, name.last, isHilarious];
}

createInstructor() // [Matt, Lane, false]
createInstructor({isHilarious: true}); // [Matt, Lane, true]
createInstructor({name: {first: "Tim", last: "Garcia"}}); // [Tim, Garcia, false]

/* Object Fields as parameters ES2015 */
function displayInfo({name, favColor}) {
    return [name, favColor];
}

var instructor = {
    name: "Elie",
    favColor: "Purple"
};

displayInfo(instructor); // ["Elie", "Purple"]

// LECTURE Array Desctructuring

var arr = [1,2,3]

var [a,b,c] = arr;

a; // 1
b; // 2
c; // 3

function returnNumbers(a,b) {
    return [a,b];
}

[first, second] = returnNumbers(5, 10);

first; // 5
second; // 10

/* Array destructring helps the most with swapping
values in an array */
function swap(a,b) {
    return [a,b] = [b,a];
}
swap(10,5);



