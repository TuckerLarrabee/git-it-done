var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning")

var displayWarning = function (repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit "

    var limitEl = document.createElement("a");
    limitEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    limitEl.setAttribute("target", "_blank");

    //append to container
    limitWarningEl.appendChild(limitEl)
}

var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                displayIssues(data)

                //check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            alert("There was a problem with your request")
        }
    })
};

getRepoIssues("facebook/react")

var displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues.";
        return
    }

    for (var i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl)
    }

}