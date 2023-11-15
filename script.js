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

function clickBlog(pageID) {
    console.log("Click detected");
    window.open("blog/1.html", "_self")
}