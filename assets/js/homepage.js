//this function "fetches" the info (HTTP request) from GitHub API
//GitHub replies with JSON data
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

getUserRepos(); 