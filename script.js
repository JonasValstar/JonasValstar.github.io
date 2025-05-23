let slideIndex = 0;
let autoSlide = true;

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
    i = slideIndex; //? just for easier readable code
    let slides = document.getElementsByClassName('slide');
    if (mode == 0) { // setup first slide
        slides[i].style.display = "none";
        let randomIndex = Math.round(Math.random() * (slides.length-1));
        i = randomIndex;
        slides[i].style.display = "block";
    } else if (mode == 1) { // previous
        slides[i].style.display = "none";
        if (i == 0) {
            i = slides.length - 1;
        } else {
            i--;
        }
        slides[i].style.display = "block";
        slides[i].style.animation = 'slideAnim2 1.5s';
    } else { // next
        slides[i].style.display = "none";
        if (i == slides.length - 1) {
            i = 0;
        } else {
            i++;
        }
        slides[i].style.display = "block";
        slides[i].style.animation = 'slideAnim1 1.5s';
    }
    slideIndex = i;
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