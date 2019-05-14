// COURSE - Web Developer Bootcamp
// LECTURE Introduction to Events

/* The Process - Select an element and then add an
event listner.  Use method addEventListner(type, functionToCall),
where 'type' is the sort of event we want to listen for,
and 'functionToCall is the callback */

var button = document.querySelector("button");
button.addEventListener("click", function() {
    console.log("Someone clicked the button!");
});

// Second Example
<button> Click Me </button>
<p> No One Has Clicked Me Yet </p>

var button = document.querySelector("button");
var paragraph = document.querySelector("p");

// SETUP CLICK LISTENER
button.addEventListener("click", function() {
    paragraph.textContent = "Someone Clicked the Button!";
});

// Third Example
// Suppose there is a webpage with a list of items

var list = document.querySelectorAll("li");
// list = [<li>Orchids</li>, <li>Succulents</li>, <li>Tulips</li>]
for(var i = 0; i < lis.length; i++) {
    list[i].addEventListener("click", function() {
        // refers to the <li> in the list that was clicked on
        this.style.color = "pink";
    });
}

// function inside of addEventListner doesn't need
// to be an anonymous function, but cannot have '()',
// otherwise would execute function immediatley.  See example below:
var button = document.querySelector("button");
var paragraph = document.querySelector("p");

button.addEventListener("click", changeText);

function changeText() {
    paragraph.textContent = "Someone Clicked the Button!";
}