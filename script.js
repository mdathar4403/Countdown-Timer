
const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('countdown-title')
const completeBtn = document.getElementById('complete-button')



let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive;
let savedCountdown;

const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

// Set Date Input MIn with the today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today)

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const mins = Math.floor((distance % hour) / min)
        const secs = Math.floor((distance % min) / sec)

         // Hide Input
         inputContainer.hidden = true;
         // If the countdown has ended, show complete
         if(distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive)
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`; 
            completeEl.hidden = false;
         } else {
            // Else, show the countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${mins}`
            timeElements[3].textContent = `${secs}`
            completeEl.hidden = true;
            countdownEl.hidden = false;
         }

    }, sec);

}


// Take Values from FORM input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    // console.log(countdownTitle, countdownDate)
    savedCountdown={
        title:countdownTitle,
        date: countdownDate,
    }
    localStorage.setItem('countdown',JSON.stringify(savedCountdown))
    // Check for valid date
    if (countdownDate === '') {
        alert("Please select a date for the countdown.")
    } else {
        // Get nuumber version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        console.log(countdownValue)
        updateDOM();
    }

}
function reset() {
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;
    clearInterval(countdownActive);
    // reset Values
    countdownTitle = ''
    countdownDate = ''
    
    localStorage.removeItem('countdown')
}
function restorePrevCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click',reset)

restorePrevCountdown();