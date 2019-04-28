// LECTURE - CALLBACK FUNCTIONS

/* 
  Callback - A function (C) that is passed into 
  another function (A) as a parameter and then
  invoked by that same function A 
*/

/* Example 1 */
function callback() {
  console.log("Coming from callback");
}

function higherOrder(fn) {
  console.log("About to call callback");
  fn(); // Callback function is invoked
  console.log("Callback has been invoked");
}

higherOrder(callback);

/* 
  higher order function - A function that accepts
  a callback as a parameter 
*/

/* Example 4 */
function sendMessage(message, callback) {
  return callback(message);
}

sendMessage("Message for console",
            console.log);

sendMessage("Message for alert", alert);

var answer = sendMessage("Are you sure??",
                         confirm);

/* Example 5 */

function greet(name, formatter) {
  return "Hello, " + formatter(name);
}

function upperCaseName(name) {
  return name.toUpperCase();
}

greet("Tim", upperCaseName);

/* 
  Example 6 - More typical implementation
  of callbacks in JavaScript 
*/
function greet(name, formatter) {
  return "Hello, " + formatter(name);
}

/* Callback function using an anonymous function */

greet("Tim", function(name) {
  return name.toUpperCase();
});


// LECTURE - FOREACH METHOD

/* 
  Every forEach function takes in an array
  and a function callback.  The function
  callback is not something that the
  forEach implements, its given to forEach
  as a parameter
  For Each implements the callback with 3
  parameters: currentElement, currentIndex,
  and array
*/
var arr = [1,2,3,4,5,6];
forEach(arr, function(number) {
    console.log(number * 2);
});

// LECTURE - FINDINDEX METHOD

/* 
  Returns the index of the first element in
  the array for which the callback returns
  a truthy value.  -1 is returned if the 
  callback never returns a truthy value
*/

// Returns a "-1"
var langs = ["Java", "C++", "Python", "Ruby"];
findIndex(langs, function(lang, index, arr) {
  return lang === "JavaScript";
});

/* 
  Bad Callback example: No return statement
  In JS, if function has no return value
  then function is always evaluated to a value 
  of undefined (which is always falsy)
*/
var langs = ["Java", "C++", "JavaScript"];
findIndex(langs, function(lang, index, arr) {
  lang === "JavaScript";
});

// LECTURE - The Event Loop And The Queue

/*
  First, function main is placed on 
  the stack, followed by setTimeout. After
  this, 'function()' is placed in the Queue.
  setTimeout then finishes and 'console.log()'
  runs and invokes square(), which is placed
  on the Stack.  4 is returned and the 
  functions on the stack finish.  The Event
  Loop then checks the Queue when stack is empty.
  The Event Loop finds that 'function()' is in
  the Queue and it puts this callback on the Stack
  
  JS is single threaded, so callback can't 
  run until everything on stack finishes
*/

function square(n) {
    return n * n;
}

// Wait 0 ms before letting the Event Loop
// check whether any functions are in
// the queue that can go on the stack
setTimeout(function() {
    console.log("Callback is placed \
                on the queue");
}, 0);

console.log(square(2));


// LECTURE - Promise Basics

var p1 = new Promise(function(resolve, reject) {
  reject("ERROR");
});

// catch() is invoked when reject() is invoked,
// string "ERROR" is passed as data to callback
// function within catch()
p1.then(function(data) {
  console.log("Promise p1 resolved with data: ", data);
}).catch(function(data) {
  console.log("Promise p1 was rejected with data:", data);
});

// Example of 50/50 chance of invoking 
// resolve or reject
var p1 = new Promise(function(resolve, reject) {
  var num = Math.random();
  if (num < 0.5) {
    resolve(num);
  } else {
    reject(num)
  }
});

p1.then(function(result) {
  console.log("Success:", result);
}).catch(function(error){
  console.log("Error:", error);
});

// Example with asynchronous componet using
// setTimeout
var promise = new Promise(function(resolve, reject) {
  
  // Everything is off of the stack before 
  // setTimeout is invoked 
  setTimeout(function() {
    var randomInt = Math.floor(Math.random() * 10)
  }, 4000);
});

promise.then(function(data) {
  console.log("Random int passed to resolve:" , data)
});


// LECTURE VIDEO - Promise Chaining

/* 
  First one second goes by and '1' is printed
  then two seconds go by and '2' is printed
  then three seconds go by and '3' is printed
*/
var counter = 0;

// wait one second then invoke callback
setTimeout(function() {
  counter++;
  console.log("Counter:", counter);
  setTimeout(function() {
    counter++;
    console.log("Counter:", counter);
    setTimeout(function() {
      counter++;
      console.log("Counter:", counter);
    }, 3000)
  }, 2000)
}, 1000);

// Example of Promise chaining - combine
// asynchronous tasks into promise chaining
var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    randomInt = Math.floor(Math.random() * 10);
    resolve(randomInt);
  }, 500);
});

// This .then() will wait for the previous promise
// code to finish in 0.5 seconds
promise.then(function(data) {
  console.log("Random int passed to resolve:", data);
  
  // 
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(Math.floor(Math.random() * 10));
    }, 3000);
  });
  
  // second .then()
}).then(function(data) {
  console.log("Second random int passed to resolve:", data)
});

// Example of Returning Data Changed
var promise = new Promise(function(resolve, reject) {
  resolve(5);
});

// outputted value is 30
promise.then(function(data) {
  return data * 2;
}).then(function(data) {
  console.log(data);
}).then(function(data) {
  console.log(data);
});

// First setTimeout code refactored:
var counter = 0;
function incCounter() {
  counter++;
  console.log("Counter:", counter);
}

function runLater(callback, timeInMs) {
  var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
      var res = callback();
      resolve(res);
    }, timeInMs);
  });
  return p;
}

runLater(incCounter, 1000).then(function() {
  return runLater(incCounter, 2000);
}).then(function() {
  return runLater(incCounter, 3000);
}).then(function() {
  
});


