//function that will take a repo name as a parameter - 6.3.4
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; 
    fetch(apiUrl).then(function(response){
        //request was successful 
        if (response.ok){ //check the value of response.ok - indicates a successful request 
            response.json().then(function(data) {
                console.log(data);
            });
        } else {//request was not successful 
            alert("There was a problem with your requesr!");
        }
    });    
};

getRepoIssues("facebook/react");