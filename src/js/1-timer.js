import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// flatpickr //
const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      startButton.disabled = true;
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(datetimePicker, options);

// start //
let timerInterval = null;

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = userSelectedDate - currentTime;

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: "Done",
        message: "Countdown finished!",
      });
      datetimePicker.disabled = false;
      return;
    }

    updateTimerUI(convertMs(timeDiff));
  }, 1000);
});

// time //
function updateTimerUI({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent =
    addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// convertMs //
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// styles //
iziToast.show({
  title: "Error",
  message: "Illegal operation",
  color: "red",
  position: "topRight",
  timeout: 5000,
  titleColor: "#fff",
  messageColor: "#fff",
  backgroundColor: "#EF4040",
  icon: "fas fa-times",
  iconColor: "#fff",
});