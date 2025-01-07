import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Функція для створення промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

// Обробник події для форми
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const delay = parseInt(event.target.delay.value, 10);
  const state = event.target.state.value;

  // Створення промісу
  createPromise(delay, state)
    .then((delay) => {
      // Якщо проміс виконано вдало
      iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
        timeout: 5000,
        icon: "fa fa-check-circle", // Іконка для успішного повідомлення
      });
    })
    .catch((delay) => {
      // Якщо проміс відхилено
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
        timeout: 5000,
        icon: "fa fa-times-circle", // Іконка для повідомлення про помилку
      });
    });
});
