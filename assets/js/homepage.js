//this function "fetches" the info (HTTP request) from GitHub API
//GitHub replies with JSON data -- use this for weather server API
var getUserRepos = function(user) {
    //format the github api url - can enter any username in "user"
    var apiURL = "https://api.github.com/users/" + user + "/repos";
    //make a request to the URL 
    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

//card / form element - make form for searching cities 
//reference to <form> with an id of user-form
var userFormEl = document.querySelector("#user-form");
//reference to <input> with an id of username
var nameInputEl = document.querySelector("#username"); 

//function that executes upon a form submission browser event 6.2.4
var formSubmitHandler = function(event) {
    event.preventDefault(); 
    //get value of the form input element and send to getUserRepos() 6.2.4 - get city value and send to above function 
    var username = nameInputEl.value.trim(); //get value from the <input> element, ie. nameInputEl, value is stored in "username" variable - use trim to get rid of any leading or trailing white spaces 

    if(username) { //checks value - if the username matches: 6.2.4 - if the city matches 
        getUserRepos(username); // run function with the selected username 6.2.4 - run function with city name ie. getUserRepos(ottawa)
        nameInputEl.value = ""; //clears the <input>element's value - clears the form - 6.2.4
    } else { //if the username does not match: 6.2.4
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

//add event listener - when submit button is clicked, formSubmitHandler function will execute 6.2.4
userFormEl.addEventListener("submit", formSubmitHandler);

