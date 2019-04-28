// LECTURE - Fetch Introduction

/* 
Use fetch to get JSON data from an api
   Once fetch is invoked, .then() will run
   a promise and pass the HTTP response that
   fetch gives to an anonymous function.
   Since the response is in JSON format,
   use response.json() and pass this to
   a new function invoked by .then() that
   outputs JSON response 
*/
fetch(url).then(function(response){
    console.log(response);
    return response.json()
}).then(function(data){
   console.log(data); 
});

// LECTURE - FETCH ERROR HANDLING

var btn = document.querySelector("button");
btn.addEventListener("click", function(){
  var url = 'https://api.github.com/users/coltasdas';
  fetch(url)
  .then(handleErrors)
  .then(function(request){
    console.log("EVERYTHING IS FINE!");
    console.log(request);
  })
  .catch(function(error){
    console.log(error);
  });
});

function handleErrors (request){
  if(!request.ok) {
    throw Error(request.status);
  }
  return request;
}