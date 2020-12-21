const inputContainer = document.getElementById('input-container');
const countDownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countDownEl = document.getElementById('countdown');
const countDownTitleEl = document.getElementById('countdown-title');
const countDownBtn = document.getElementById('countdown-button');
const  timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');
const today = new Date().toISOString().split('T')[0];
let countDownTitle = '';
let countDownDate = '';
let countDownValue;
let countDownVar;
let savedCountDown;
const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

dateEl.setAttribute('min',today);

//changing ui for countdown

function updateDOM()
{
   


    countDownVar = setInterval(()=>{

        const now = new Date().getTime();
        const distance = countDownValue - now;
        console.log('distance : ' , distance);
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log(days,hours,minutes,seconds);

        if(distance < 0)
        {
            completeEl.hidden = false;
            countDownEl.hidden = true;
            inputContainer.hidden = true;
            completeInfoEl.textContent = `${countDownTitle} finished on ${countDownDate}`;
            clearInterval(countDownVar);
            
        }

        else{
            countDownTitleEl.textContent = `${countDownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            //hide input container
            inputContainer.hidden = true;
             //show countdown container
            countDownEl.hidden = false;
        }
      
        },second);

}
// getting form data
function updateFormData(e)
{
    e.preventDefault();

    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;

    savedCountDown = {
        title : countDownTitle,
        date : countDownDate,
    }

    localStorage.setItem('countdown',JSON.stringify(savedCountDown));
    if(countDownDate==='')
    {
        alert("Please Enter a Date for Countdown !");
    }
    else{
        //getting millisecond value 
        countDownValue = new Date(countDownDate).getTime();
        updateDOM();
    }
    
}

//Reset all values

function reset()
{
    inputContainer.hidden = false;
    completeEl.hidden = true;
    countDownEl.hidden = true;

    clearInterval(countDownVar);

    countDownTitle = '';
    countDownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountDown()
{
    if(localStorage.getItem('countdown'))
    {
        inputContainer.hidden = true;
        savedCountDown = JSON.parse(localStorage.getItem('countdown'));
        countDownTitle = savedCountDown.title;
        countDownDate = savedCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        updateDOM();

    }
}
// event listerners
countDownForm.addEventListener('submit',updateFormData);
countDownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);

//check onload , the  local storage

restorePreviousCountDown();