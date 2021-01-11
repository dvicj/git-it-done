//this function "fetches" the info (HTTP request) from GitHub API
//GitHub replies with JSON data
var getUserRepos = function() {
    //asynchronous behaviour - outside then inside - fetch request set aside until rest of the code is implemented 
    fetch("https://api.github.com/users/octocat/repos").then(function(response){
        //json() formats the reponse as JSON
        response.json().then(function(data) {
            console.log(data);
        })
        console.log("inside", response);
    });
   console.log("outside");
};
getUserRepos(); 