let slideIndex = 0;
let contextIndex = 0;
let autoSlide = true;

let slideContents = [
    "Has a special place in his heart for Skylanders Giants",
    "Hobby Photographer",
    "Warhammer 40000 Player",
    "Film Enjoyer",
    "Likes Race Cars",
    "Dungeons and Dragons Player",
    "Model Car Collector"
];

// all functions that should be triggered on load
function loadFunctions() {
    // setting variables correct
    slideIndex = 0;

    // triggering functions
    autoSlider();
    showSlide(0); // setup

    // detect window size
    if (window.innerWidth*3.05 < window.innerHeight*4) {
        document.getElementById("screenWarning").style.display = "block";
    }
}

// Show credits
function credits() {
    alert("Background image by wirestock on Freepik \nBanner images by wirestock and eberhardgross on freepik");
}

function wipAlert() {
    alert("This page is currently being developed. \nplease take a look around, but keep in mind that the website is not finished");
}

// change slide
function showSlide(mode) {
    let slides = document.getElementsByClassName('slide');
    if (mode == 0) { // setup first slide
        slides[1].style.display = "none";
        slides[0].style.display = "block";
        let rand = Math.round(Math.random() * (slideContents.length-1));
        slides[0].innerHTML = "<a>"+slideContents[rand]+"</a>";
        slideIndex = 0;
        contextIndex = rand;
    } else if (mode == 1) { // previous
        otherSlide = slideIndex == 0 ? 1 : 0;
        prevContent = contextIndex == 0 ? slideContents.length - 1 : contextIndex - 1;
        slides[slideIndex].style.display = "none";
        slides[otherSlide].style.display = "block";
        slides[otherSlide].style.animation = 'slideAnim2 1.5s';
        slides[otherSlide].innerHTML = "<a>"+slideContents[prevContent]+"</a>";
        slideIndex = otherSlide;
        contextIndex = prevContent;
    } else { // mode 2 -> next
        otherSlide = slideIndex == 0 ? 1 : 0;
        nextContent = contextIndex == slideContents.length - 1 ? 0 : contextIndex + 1;
        slides[slideIndex].style.display = "none";
        slides[otherSlide].style.display = "block";
        slides[otherSlide].style.animation = 'slideAnim1 1.5s';
        slides[otherSlide].innerHTML = "<a>"+slideContents[nextContent]+"</a>";
        slideIndex = otherSlide;
        contextIndex = nextContent;
    }
}

// auto change slide
function autoSlider() {
    if (autoSlide == true) {
        showSlide(2);
        setTimeout(autoSlider, 4500); //? was 7500
    }
}

function displayPic(link, title, date, program) {
    overlay = document.getElementById("overlay");
    if (link != "turnOff") {
        overlay.style.display = "flex";
        document.getElementById("overlayImg").src = "posters/" + link;
        if (date != "-1") {
            document.getElementById("overlayTxt").innerHTML = "<b>" + title + "</b>&nbsp;|&nbsp;" + date + "&nbsp;|&nbsp;<i>made in:&nbsp;" + program + "</i>";
        } else {
            document.getElementById("overlayTxt").innerHTML = "<b>" + title + "</i>";
        }
        
    } else {
        overlay.style.display = "none";
    }
}

// collapsible code
function openColl(collID) {
    coll = document.getElementById('coll_' + collID);
    callElem = document.getElementById(collID);
    if (coll.style.display != "block") {
        coll.style.display = "block";
        callElem.classList.add("activeCB");
    } else {
        coll.style.display = "none";
        callElem.classList.remove("activeCB");
    }
}

function onlyOpenColl(collID) {
    coll = document.getElementById('coll_' + collID);
    callElem = document.getElementById(collID);
    if (coll.style.display != "block") {
        coll.style.display = "block";
        callElem.classList.add("activeCB");
    }
}

function playVideo(video) {
    document.getElementById(video).play();
    document.getElementById(video).currentTime = 0;
}

function pauseVideo(video) {
    document.getElementById(video).pause();
}