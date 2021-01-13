
//card / form element - make form for searching cities 
//reference to <form> with an id of user-form
var userFormEl = document.querySelector("#user-form");
//reference to <input> with an id of username
var nameInputEl = document.querySelector("#username"); 
//reference to <div> with an id of repos-container - 6.2.5
var repoContainerEl = document.querySelector("#repos-container");
//reference to <span> container with an id of repo-search-term - 6.2.5
var repoSearchTerm = document.querySelector("#repo-search-term");

//function that executes upon a form submission browser event 6.2.4
var formSubmitHandler = function(event) {
    //prevents page from refreshing
    event.preventDefault(); 
    //get value of the form input element and send to getUserRepos() 6.2.4 - get city value and send to above function 
    var username = nameInputEl.value.trim(); //get value from the <input> element, ie. nameInputEl, value is stored in "username" variable - use trim to get rid of any leading or trailing white spaces 

    if(username) { //checks value - if the username matches: 6.2.4 - if the city matches 
        getUserRepos(username); // run function with the selected username 6.2.4 - run function with city name ie. getUserRepos(ottawa)
        repoContainerEl.textContent="";
        nameInputEl.value = ""; //clears the <input>element's value - clears the form - 6.2.4
    } else { //if the username does not match: 6.2.4
        alert("Please enter a GitHub username");
    }
};

//this function "fetches" the info (HTTP request) from GitHub API
//GitHub replies with JSON data -- use this for weather server API
var getUserRepos = function(user) {
    //format the github api url - can enter any username in "user"
    var apiURL = "https://api.github.com/users/" + user + "/repos";
    //make a request to the URL - 6.2.5 edited - 6.2.6 edited (404 ERROR and network connectivity)
    fetch(apiURL).then(function(response) {
        //request for data was successful 
        if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error - 6.2.6
            response.json().then(function(data) {
                displayRepos(data,user); //when the response data is converted to JSON, it will be sent from getUserRepos to displayRepos 
            });
        } else { //ok = false (not in the 200s)
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
    .catch(function(error) { //6.2.6 - catch is way of handling nextwork errors - if successful will get returned in the .then() method if request fails it will be sent to .catch() method 
        //notice this .catch() getting chained onto the end of the .then() method
        alert("Unable to connect to GitHub"); 
    }); 
};

//will accept both the array of the repo data(repos) and the term we searched(searchTerm) for as parameters - 6.2.5
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log("This is the user's username: " + searchTerm);
    //check if api returned any repos - 6.2.6
    if (repos.length === 0) { //if the array of repos is 0 
    repoContainerEl.textContent = "No repositories found."; // add text to the repoContainerEl
    return; //return to beginning of getUserRepos function 
    }

    //clear old user inputted content before displaying new content 6.2.5
    repoContainerEl.textContent = ""; //clears text from repoContainerEl 6.2.5
    
    repoSearchTerm.textContent = searchTerm; //ensures the page displays the username/search term
    //loop over repos 6.2.5
    for (var i=0; i<repos.length; i++) { //loops over # of arrays of each user
        //format repo name 6.2.5 
        //taking each repository "repos[i]"" and writing some of it's data to the page (owner and login and name)
        var repoName = repos[i].owner.login + "/" + repos[i].name //repos, owner, login, name all from API data 
        //create a link for each repo 6.2.5
        var repoEl = document.createElement("a"); //create a new div element called repoEl 6.2.5 - changed to <a> - 6.4.3
        repoEl.classList = "list-item flex-row justify-space-between align-center"; //apply classed to repoEl <div> 6.2.5
        repoEl.setAttribute("href", "./single-repo.html?repo="+repoName); //added href attribute to <a> - 6.4.3 - updated: using query parametr to pass a reponame from index.html to single-repo.html
        //create a span element to hold repository name 6.2.5
        var titleEl = document.createElement("span"); //create a new span element called titleEl 6.2.5 
        titleEl.textContent = repoName; // add repoName to titleEl - to hold formatted repository name 
        //append to container 6.2.5
        repoEl.appendChild(titleEl); //append title to container 6.2.5 - add span to div 
        //create status element 
        var statusEl = document.createElement("span"); //create a new span element called statusEL 6.2.5 
        statusEl.classList = "flex-row align-center"; //apply classes to statusEl <span> - 6.2.5 
        //check if current repo has issues or not 6.2.5
        if (repos[i].open_issues_count > 0) {//checking if each repository in the array "repos[i]" has more than 0 issues (open_issues_count is data from API)
            statusEl.innerHTML = //add HTML to every statusEl <span>
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)"; //repos[i].open_issues_count is the number of open issues 
        } else { //if the current repo has no issues 
            statusEl.innerHTML = 
            "<i class='fas fa-check-square status-icon icon-success'></i>"; //add HTML to every statusEl <span>
        }
        //append to container 6.2.5
        repoEl.appendChild(statusEl); 
        
        //append container to the dom 6.2.5
        repoContainerEl.appendChild(repoEl); //append repo to dom 6.2.5 - add div to container 
    }
};
//add event listener - when submit button is clicked, formSubmitHandler function will execute 6.2.4
userFormEl.addEventListener("submit", formSubmitHandler);

