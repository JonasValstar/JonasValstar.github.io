// variables
let minTime = 4000; // 3min
let maxTime = 8000; // 4min

// reveal card
function revealCard() {
    console.log("Hello")
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";        
    }
    cards[randomInt(cards.length)].style.display = "block";
    setTimeout(revealCard, randomIntFromInterval(minTime, maxTime)) // 1 second
}

// change timing options
function changeTimer(newMin, newMax) {
    console.log("Goodday")
    minTime = newMin;
    maxTime = newMax;
}

// addon functions
function randomInt(exMax) {
    return Math.floor(Math.random() * exMax);
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}