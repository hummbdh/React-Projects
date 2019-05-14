// LECTURE Higher Order Functions Code Along

/* functions that either takes a function as an argument
or return another function */

// One example is setInterval()

// Example
function state() {
    console.log('Country1');
    console.log('Country2');
}

// The HOF, setInterval()
setInterval(state, 1000);

// Can also create HOF by passing in an anonymous
// Higher Order Function
setInterval(function(){}, 1000);

