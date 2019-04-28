// LECTURE jQuery AJAX Introduction

/*
 Making a Request and Parsing JSON 
 without jQuery
*/
var request = new XMLHttpRequest();
request.open('GET', '/my/url');

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success
        var data = JSON.parse(request.responseText);
    } else {
        // Do something
    }
};

request.onerror = function() {
    // There was a connection error
};

request.send();

/* 
  Making a request and parsing JSON 
  with jQuery 
*/
$.getJSON('/my/url', function(data) {
    
});

// LECTURE jQuery $.ajax Method

/* jQuery example that retrieves data from an api
   and, once completed, inserts that data into a
   paragraph on the page 
*/
$("#btn").click(function(){
  $.ajax({
    method: "GET",
    url: "https://baconipsum.com/api/?type=meat-and-filler",
    dataType: 'json'
  })
  .done(addP)
  .fail(function(){
    alert("OH NO! FAILED!");
  })
});

function addP (data){
  $("p").text(data[0]);
}

// LECTURE jQuery AJAX Shorthand Methods

/*
  
*/
$("#getBtn").click(function(){
  $.get('https://api.github.com/users/colt')
  .done(function(data){
    console.log(data);
  })
  .fail(function(){
    console.log("ERROR!");
  })
});

$("#postBtn").click(function(){
 var data = {name: "Charlie", city: "Florence"};
 $.post("www.catsarecoolandsoaredogs.com", data)
  .done(function(data){
   console.log("HI!");
 })
  .fail(function(){
   console.log("ERROR!");
 })
});

$("#getJSONBtn").click(function(){
  $.getJSON("https://api.github.com/users/colt")
  .done(function(data){
    console.log(data); 
  })
  .fail(function(){
    console.log("PROBLEM!");
  })
});


// LECTURE Axios Intro

var url = 'https://opentdb.com/api.php?amount=1';
axios.get(url)
.then(function(res){
  console.log(res.data.results[0].question);
})
.catch(function(){
  console.log("ERR");
})


// LECTURE Axios Error Handling
var btn = document.querySelector("button");
var section = document.querySelector("#comments");
btn.addEventListener("click", sendRequest);

function sendRequest(){
  axios.get("https://jsonplaaskjldceholder.typicode.com/comments", {
    params: {
      postId: 1
    }
  })
  .then(addComments)
  .catch(handleErrors)
 }

function addComments(res){
  res.data.forEach(function(comment){
    appendComment(comment);
  });
}

function appendComment (comment){
  var newP = document.createElement("p");
  newP.innerText = comment.email;
  section.appendChild(newP);
}

function handleErrors(err) {
    if (err.response) {
      console.log("Problem With Response ", err.response.status);
    } else if (err.request) {
      console.log("Problem With Request!");
    } else {
      console.log('Error', err.message);
    }
  }

