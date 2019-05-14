// COURSE - Web Developer Bootcamp
// LECTURE Select and Manipulate

var h1 = document.querySelector("h1"); // Select element
h1.style.color = "pink"; // Manipulate element

// LECTURE DOM Selectors

// DOM is document of JS objects
document.URL;
document.head;
document.body;
document.links;

/* The document comes with a number of different 
methods for selecting element, here are 5 that matter
*/

document.getElementById();
document.getElementsByClassName();

document.getElementsByTagName();
/* Example for TagName: Gets HTML tags, returns a Node list */
var tags = document.getElementsByTagName("li");
console.log(tags[0]);

/* incorporates CSS syntax and returns only the first match */
document.querySelector();
/* Example */
var list_item = document.querySelector("#highlight");
var list_item = document.querySelector("li a.special");

/* incorporates CSS syntax and returns only the first match */
document.querySelectorAll();

// LECTURE Manipulating Style

/* DOM Manipulation:
    1) CHanging an element's style
    2) Adding/removing classes
    3) Changing the content of a tag
    4) Changing attributes (src, href, etc.) 
*/

// LECTURE Manipulating Style
/* We want to use JS to turn CSS on and off, rather
than directly manupulating style with JS.*/

// Instead of this:
var tag = document.getElementById("highlight");
tag.style.color = "blue";
tag.style.border = "10px solid red";

// Create a CSS class, and add the new class
// to the selected element
.some-class{
    color: blue;
    border: 10px solid red;
}

var tag = document.getElementById("highlight");

// add the new class to the selected element
// so "highlight" is replaced by "some-class"
// classList is a ready-only list that contains
// the classes for a given element
tag.classList.add("some-class");

// LECTURE Manipulating Attributes

/* Use getAttribute() and setAttribute() to read and write
attributes like 'src' and 'href'.  But can also be used
to change a class or id, or anyother attribute avaliable */

// EXAMPLE HTML CODE
/*
<a href="www.google.com"> I am a link </a>
<img src="logo.png">
*/
var link = document.querySelector("a");
link.getAttribute("href"); // www.google.com

// CHANGE HREF ATTRIBUTE
link.setAttribute("href", "www.dogs.com");
// <a href="www.dogs.com"> I am a link </a>

// TO CHANGE THE IMAGE SRC
var img = document.querySelector("img");
img.setAttribute("src", "corgi.png");
// <img src="corgi.png">
