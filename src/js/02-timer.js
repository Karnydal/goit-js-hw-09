import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const textInput = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;
textInput.disabled = false;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Notify.failure(
        'Please don`t be silly and choose correct date in the future)))'
      );
    } else {
      startBtn.disabled = false;
    }
    // console.log(selectedDates[0]);
  },
};

const calendars = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onBtnclick);

function onBtnclick() {
  timerId = setInterval(() => {
    const currentDate = new Date().getTime();
    const chooseDate = calendars.selectedDates[0].getTime();

    let referenceTime = chooseDate - currentDate;

    if (referenceTime > 0) {
      const timeArray = convertMs(referenceTime);
      daysEl.textContent = countdown(timeArray.days, 2, '0');
      hoursEl.textContent = countdown(timeArray.hours, 2, '0');
      minutesEl.textContent = countdown(timeArray.minutes, 2, '0');
      secondsEl.textContent = countdown(timeArray.seconds, 2, '0');
    }
    if (referenceTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
  startBtn.disabled = true;
  textInput.disabled = true;
}

function countdown(value, num, str) {
  return String(value).padStart(num, str);
}

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
