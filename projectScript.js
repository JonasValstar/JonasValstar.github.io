// possible locations 
spots = [];

// saved information
projects = [];
projectNames = [];
projectTags = [[]];

// current information
activeProjects = [];

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
        projectNames[i] = spots[i].id;
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

    // startLayout
}

// toggle sections
function ToggleTag(tag) 
{
    // resetting
    activeProjects = [];

    // checking all projects
    for (let i = 0; i < projectTags.length; i++) {
        for (let j = 0; j < projectTags[i].length; j++) {
            if (projectTags[i][j] == tag) {
                activeProjects[activeProjects.length] = i;
            }
        }
    }

    // updating page
    updatePage();
}

function updatePage()
{
    // sorting currently active projects
    sortName();

    // setting all active projects
    for (let i = 0; i < activeProjects.length; i++) {
        spots[i].innerHTML = projects[activeProjects[i]];       
    }

    // removing all empty ones
    for (let i = activeProjects.length; i < spots.length; i++) {
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