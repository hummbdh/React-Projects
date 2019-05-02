// LECTURE Introduction to Closures

/* Example of closure in action */

function outer() {
    var start = "Closures are";
    
    // here the function inner is 
    // using 'clouser' to pass values
    return function inner() {
        return start + " " + "awesome";
    };
}

function outer(a) {
    return function inner(b) {
        /*
        The inner function is making use of the variable
        'a', which was defined in an outer function called
        "outer" and by the time inner is called, that 
        outer function has returned this function called
        "inner" represents the closure
        */
        return a + b;
    }
}

outer(5)(5); // 10

var storeOuter = outer(5);
storeOuter(10); // 15

/* In above example we had to return the inner function
for the entire thing to work.  We can either call the
inner function right away or store the result of the
function in a variable.  Inner function can be anonynoums
*/

/* Does the code below contain a closure?*/
function outerFn() {
    var data = "something from outer";
    return function innerFn() {
        return "Just returned from the inner function";
    }
}

/* The answer is no, because closure exists when an inner
function makes use of variables defined from an outer
function that has returned.  If the inner function does
not make use of any of the external variables all we have
is a nested function */

/* The code below does contain a closure */
function outerFn() {
    var data  "something from outer";
    return function innerFn() {
        var innerData = "something from inner";
        return data + " " + innerData;
    }
}

/* Code below contains a closure related to
the variable 'fact', but does not contain a closure
relative to the variable 'data'.

Note: Inner functions do not remember everything
from outer functions.  
*/
function outerFn() {
    var data = "Something from outer";
    var fact = "Remember me!";
    return function innerFn() {
        
        // in debugger console, value
        // of data is reference error
        // while fact is string
        // This is because, innerFn()
        // is evaluated and fact is 
        // consequently able to be
        // established as a variable
        debugger
        return fact;
    }
}

// LECTURE Using Closures in the Wild
function counter() {
    var count = 0;
    return function inner() {
        count++;
        return count;
    }
}

// LECTURE Call
var person = {
    firstName: "Colt",
    sayHi: function() {
        return "Hi " + this.firstName;
    },
    determineContext: function(){
        return this === person;
    },
    dog: {
        sayHello: function(){
            return "Hello " + this.firstName;
        },
        determineContext: function(){
            return this === person;
        }
    }
}

/* call is used to let an object use a method
belonging to another object (by extending the
implementation of 'this' keyword) */
person.dog.sayHello.call(person) // "Hello Colt"
person.dog.determineContext.call(person) // true

/* second example using call() from w3schools.com */
var person  = {
    fullName: function(){
        return this.firstName + " " + this.lastName;
    }
}

var person1 = {
    firstName: "John",
    lastName: "Doe"
}

var person2 = {
    firstName: "Mary",
    lastName: "Doe"
}

person.fullName.call(person1); // returns "John Doe"

/* Second example */
var colt = {
    firstName: "Colt",
    sayHi: function(){
        return "Hi " + this.firstName;
    }
}

var elie = {
    firstName: "Elie"
}

colt.sayHi(); // Hi Colt
colt.sayHi.call(elie); // Hi Elie

/* Best Example */
function sayHi(){
    return "Hi " + this.firstName;
}

var colt = {
    firstName: "Colt"
}

var elie = {
    firstName: "Elie"
}

sayHi.call(elie); // Hi Elie
sayHi.call(colt); // Hi Colt

/* In practical use, suppose we wanted to 
select all the 'divs' on a page.  Find the
divs that have the text "Hello". Can't use
a function like filter unless we turn 'divs'
into an array.

This can be done by using the slice method 
on arrays, but instead of the target of slice
(the keyword this) being that array, we can
set the target of the keyword 'this' to be
our divs array-like-object */

var divsArray = [].slice.call(divs);
// you might also see this
// as Array.prototype.slice.call(divs)

divsArray.filter(function(val){
   return val.innerText === 'Hello'; 
});


// LECTURE Apply

/* Pretty much the same as call(), but can
pass additional parameters through an array.
This is useful when a function does not accept
an array as a parameter, such as Math.max*/

// LECTURE Bind
/* Bind is useful when we do not know all
of the arguments that will be passed to a 
function.  Similar to *kwargs in Python. We
only need to know what value of keyword 'this'
should be */

function addNumbers(a,b,c,d) {
    return this.firstName + " just calculated " + (a+b+c+d);
}

var elie = {
    firstName: "Elie";
}

// The parameters work like call, but bind
// returns a function with the context of
// 'this' bound already!
var elieCalc = addNumbers.bind(elie,1,2,3,4);
elieCalc(); // Elie just calculated 10

// With bind - we do not need to know all the
// arguments up front!
var elieCalc = addNumbers.bind(elie,1,2);
elieCalc(3,4); // Elie just calculated 10

/* LECTURE Bind Continued
Very commonly we lose the context of 'this',
but in functions that we do not wat to
execute right away.  In this lecture we will
look at using bind and setTimeout() to solve
some tricky problems.  THe main reason we
would do this is to allow time for values
to be passed to a function through bind() */
var colt = {
    firstName: "Colt",
    sayHi: function() {
        setTimeout(function() {
            /* NOTE: Since setTimeout is called
            at a later point in time, the object
            that 'this' is attached to is the
            window.  Recall, setTimeout is a
            method on the window object, so 'this'
            keyword is within the global context
            even though it is declared inside of
            the colt object */
            console.log("Hi " + this.firstName);
        }, 1000);
    }
}

/* Solve problem from above example by passing
in as the first parameter to the bind() method 
the value that we want the keyword 'this' to
refer to */
var colt = {
    firstName: "Colt",
    sayHi: function() {
        setTimeout(function() {
            console.log("Hi " + this.firstName);
        }).bind(this), 1000); //.bind(colt) will do the same thing
    }
}
// colt.sayHi() // returns Hi Colt (1000 milliseconds lapse)



