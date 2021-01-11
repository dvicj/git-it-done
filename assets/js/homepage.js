//this function "fetches" the info (HTTP request) from GitHub API
//GitHub replies with JSON data
var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos").then(function(response){
        console.log("inside", response);
    });
   console.log("outside");
};
getUserRepos(); 