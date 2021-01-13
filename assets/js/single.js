//variables 
var issueContainerEl = document.querySelector("#issues-container"); //reference to issue container in html - 6.3.5
var limitWarningEl = document.querySelector("#limit-warning"); // reference to warning container in html - 6.3.6
var repoNameEl = document.querySelector("#repo-name"); // reference to span in html - 6.4.4

//function that will take a repo name as a parameter - 6.3.4 - repoName as parameter - 6.4.4
var getRepoIssues = function(repo, repoName) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; 
    fetch(apiUrl).then(function(response){
        //request was successful 
        if (response.ok){ //check the value of response.ok - indicates a successful request 
            response.json().then(function(data) {
                //pass response data to dom function 
                displayIssues(data); //only call this function if response.ok - 6.3.5 
                //check if api has paginated issues - ie more than 30 issues - 6.3.6 
                if(response.headers.get("Link")){ //checks for link header
                    displayWarning(repo);
                }
            });
        } else {//request was not successful 
            alert("There was a problem with your request!");
        }
    });    
};

//6.4.4
var getRepoName = function() {
    var queryString = document.location.search; //extract the repo name from the query string ie. ?repo=microsoft/activities
    var repoName = queryString.split("=")[1]; //breaks the string apart at "=", creates two elements in an array ie. [0]?repo and [1]microsoft/activities
    getRepoIssues(repoName);
    repoNameEl.textContent = repoName; 
}

//function which accepts a parameter of "issues" - 6.3.5
var displayIssues = function(issues) {
    if (issues.length === 0) { //if there are no issues, add text and return
        issueContainerEl.textContent = "This repo has no open issues!";
        return; 
    }
    //loop over response data and create an <a> element for each issue 6.3.5
    for(var i=0; i<issues.length; i++) {
        //create a link element to take users to the issue on github 6.3.5
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url); //issue object have a 'html_url' property which links to the full issue on github
        issueEl.setAttribute("target", "_blank"); //open link in a new tab
        //create span to hold issue title 
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title; //finds title of each issue in an array 
        //append to container 
        issueEl.appendChild(titleEl); 
        //create a type element 
        var typeEl = document.createElement("span"); 
        //check if issue is an actual issue or a pull request 
        if (issues[i].pull_request) { //if the issue in the array is a pull request - 6.3.5
            typeEl.textContent = "(Pull request)"; 
        } else {
            typeEl.textContent = "(Issue)"; //if the issue in the array is an issue 
        }
        //append to container - 6.3.5
        issueEl.appendChild(typeEl); 
        issueContainerEl.appendChild(issueEl);
    }
}

var displayWarning = function(repo) { //6.3.6
    //add text to warning container 
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank"); 
    //append to warning container 
    limitWarningEl.appendChild(linkEl);
};
//function calls 
getRepoName(); 
getRepoIssues(); 