// possible locations 
spots = [];

// saved information
projects = [];
projectNames = [];
projectDates = [];
projectTags = [[]];

// tagbar
tags = [];
tagNames = [];

// current information
activeProjects = [];
var activeTag = 0;

// make the arrays
function loadProjects() 
{
    // get available spots
    spots = document.getElementsByClassName("picTD");

    // save the contents
    for (let i = 0; i < spots.length; i++) {
        projects[i] = spots[i].innerHTML;
        activeProjects[i] = i;
    }

    // get the name
    for (let i = 0; i < spots.length; i++) {
        projectNames[i] = spots[i].id.toLowerCase();
    }

    // get the date
    for (let i = 0; i < spots.length; i++) {
        projectDates[i] = spots[i].getAttribute("data-date");
    }

    // get the tags
    for (let i = 0; i < spots.length; i++) {

        // against errors
        projectTags[i] = [];

        // looping all divs
        tempTags = spots[i].children;
        for (let j = 0; j < tempTags.length; j++) {
            if (tempTags[j].className == "gameTags") {
                for (let k = 0; k < tempTags[j].children.length; k++) {
                    projectTags[i][projectTags[i].length] = tempTags[j].children[k].outerText;
                }
            }
        }
    }

    // getting tag-bar tags and names
    tempTags = [];
    tempTags = document.getElementsByClassName("tagBar");
    for (let i = 0; i < tempTags.length; i++) {
        for (let j = 0; j < tempTags[i].children.length; j++) {
            tags[tags.length] = tempTags[i].children[j];
            tagNames[tagNames.length] = tempTags[i].children[j].outerText;
        }
    }

    // startLayout
    updatePage();
}

// toggle sections
function ToggleTag(tag) 
{
    // resetting
    activeProjects = [];
    if (activeTag != null) {
        // deactivating tag indicator
        activeTag.className = "";
    }

    // checking if new tag is selected
    if (activeTag.outerText != tag) {

        // checking all projects
        for (let i = 0; i < projectTags.length; i++) {
            for (let j = 0; j < projectTags[i].length; j++) {
                if (projectTags[i][j] == tag) {
                    activeProjects[activeProjects.length] = i;
                }
            }
        }

        // activating the tag indicator
        for (let i = 0; i < tagNames.length; i++) {
            if (tagNames[i] == tag) {
                activeTag = tags[i];
                activeTag.className = "tagBarActive";
            }
        }   

    } else {

        // resetting active tag
        activeTag = 0;

        // adding everything back in active
        activeProjects = [];
        for (let i = 0; i < projectTags.length; i++) {
            activeProjects[activeProjects.length] = i;
        }
    }

    // updating page    
    updatePage();
}

function updatePage()
{
    // sorting currently active projects
    sortDate();

    // setting all active projects
    for (let i = 0; i < activeProjects.length; i++) {
        spots[i].innerHTML = projects[activeProjects[i]];
        spots[i].style.visibility = "visible";       
    }

    // checking for too little items
    let errorCorrect = 0;
    for (let i = activeProjects.length; i < 3; i++) {
        spots[i].innerHTML = projects[activeProjects[0]];;
        spots[i].style.visibility = "hidden";
        errorCorrect++;
    }

    // removing all empty ones
    for (let i = activeProjects.length + errorCorrect; i < spots.length; i++) {
        spots[i].innerHTML = "";      
    }
}

// very simple sort
function sortName() 
{
    sortedNames = [];

    // get all active elements
    for (let i = 0; i < activeProjects.length; i++) {
        sortedNames[i] = projectNames[activeProjects[i]]
    }
    
    // sorting
    sortedNames.sort();

    // applying to array
    for (let i = 0; i < sortedNames.length; i++) {
        activeProjects[i] = projectNames.indexOf(sortedNames[i]);
    }
}

// sorting by date
function sortDate()
{
    sortedDates = [];

    // get all active elements
    for (let i = 0; i < activeProjects.length; i++) {
        sortedDates[i] = projectDates[activeProjects[i]]
    }

    // sorting
    sortedDates.sort();

    // reverse
    sortedDates.reverse();

    // applying to array
    for (let i = 0; i < sortedDates.length; i++) {
        activeProjects[i] = projectDates.indexOf(sortedDates[i]);
    }
}

// Text Input changes
function DetectChange(inputText)
{
    // clearing list
    activeProjects = [];

    // check percentages
    for (let i = 0; i < projects.length; i++) {
        if (projectNames[i].includes(inputText)) {
            activeProjects[activeProjects.length] = i;
            console.log(projectNames[i])
        }
    }

    // updating the page
    updatePage();
}