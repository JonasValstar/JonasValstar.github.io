let slideIndex = 0;
let autoSlide = true;

// all functions that should be triggered on load
function loadFunctions() {
    // setting variables correct
    slideIndex = 0;

    // triggering functions
    autoSlider();
    showSlide(0); // setup
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
        i = 0;
        slides[0].style.display = "block";
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
        setTimeout(autoSlider, 7500);
    }
}

function displayPic(link, title, author, program) {
    overlay = document.getElementById("overlay");
    if (link != "turnOff") {
        overlay.style.display = "flex";
        document.getElementById("overlayImg").src = "../pictures/posters/" + link;
        document.getElementById("overlayTxt").innerHTML = "<b>" + title + "</b>&nbsp;|&nbsp;by:&nbsp;<a href='#Input link to all people page'>" + author + "</a>&nbsp;|&nbsp;<i>made in:&nbsp;" + program + "</i>";
        setTimeout(startSlide, 1);
    } else {

        overlay.style.display = "none";
        overlay.classList.toggle("overlayPos1");
    }
}

function startSlide() {
    overlay.classList.toggle("overlayPos1");
}

