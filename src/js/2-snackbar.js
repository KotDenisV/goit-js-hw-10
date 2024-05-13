import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector("input[type='number']");
const checkbox = document.querySelector("input[type='radio']");
let state;
let delay;

console.log(form);

input.addEventListener("input", handleInput);
form.addEventListener("change", handleChange);
form.addEventListener("submit", handleSubmit);

function handleInput(event) {
    delay = event.target.value;
    console.log(delay);
}

function handleChange(event) {
    state = event.target.value;
    console.log(state);
}


function handleSubmit(event) {
    event.preventDefault();
    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(iziToast.show({
          title: `✅ Fulfilled promise in ${delay}ms`,
          titleColor: 'white',  
          backgroundColor: 'green',
          position: 'topRight'
        }));
      } else {
        reject(iziToast.show({
          title: `❌ Rejected promise in ${delay}ms`,
          titleColor: 'white',
          backgroundColor: 'red',
          position: 'topRight'
        }));
      }
    }, delay);
    });
    checkbox.checked = false;
    input.value = '';
}