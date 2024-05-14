import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector("input[type='number']");
const button = document.querySelector("button[type='submit']");
button.classList.add('btn-submit');

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    const delay = Number(input.value);
    const state = document.querySelector("[name='state']:checked").value;
    event.preventDefault();
    
    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }    
    }, delay);
    });
    
    promise
    .then(delay => {
      iziToast.show({
          title: `✅ Fulfilled promise in ${delay}ms`,
          titleColor: 'white',  
          backgroundColor: 'green',
          position: 'topRight'
        });
    })
    .catch(delay => {
      iziToast.show({
          title: `❌ Rejected promise in ${delay}ms`,
          titleColor: 'white',
          backgroundColor: 'red',
          position: 'topRight'
        });
    });
    form.reset();
}