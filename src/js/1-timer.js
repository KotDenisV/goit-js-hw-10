import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector("#datetime-picker");
const button = document.querySelector("button[type='button']");
const days = document.querySelector('span.value[data-days]');
const hours = document.querySelector('span.value[data-hours]');
const minutes = document.querySelector('span.value[data-minutes]');
const seconds = document.querySelector('span.value[data-seconds]');

let userSelectedDate;
let timerInterval;
let toDay = new Date();
button.disabled = true;
inputDate.classList.add('input-css');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    inputDate.classList.remove('input-active');
    if (selectedDates[0] < toDay) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        position: 'topCenter'
      });
      button.disabled = true;
      button.classList.remove('btn-active');
    } else {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
      button.classList.add('btn-active');
    }
  },
  onOpen() {
    inputDate.classList.add('input-activ');
  },
};

button.addEventListener('click', handleStart);

function handleStart(event) {
  if (!button.disabled) {
    button.disabled = true;
    button.classList.remove('btn-active');
    inputDate.disabled = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  toDay = new Date();
  if (userSelectedDate - toDay >= 0) {
    const time = convertMs(userSelectedDate - toDay);
    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
    } else {
      clearInterval(timerInterval);
      inputDate.disabled = false;
      }
}

flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

