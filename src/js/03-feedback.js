import throttle from 'lodash.throttle';

const FORM_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

getInput();

function onInput() {
  const inputDataObj = { email: email.value, message: message.value }
  localStorage.setItem(FORM_KEY, JSON.stringify(inputDataObj));
}

function onSubmit(evt) {
  evt.preventDefault();
  if (!email.value || !message.value) return alert('Fill in all fields');
  console.log(JSON.parse(localStorage.getItem(FORM_KEY)));
  evt.currentTarget.reset();
  localStorage.removeItem(FORM_KEY);
}

function getInput() {
  try {
    const recievedData = localStorage.getItem(FORM_KEY);
    if (recievedData) {
      email.value = JSON.parse(recievedData).email
      message.value = JSON.parse(recievedData).message
    };
  } catch (error) {
    console.log('Get state error: ', error.message);
  }
}
