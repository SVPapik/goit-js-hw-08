import throttle from 'lodash.throttle';

const FORM_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

let inputDataObj = {
  email: '',
  message: '',
};

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

getInput();

function getInput() {
  try {
    const recievedData = localStorage.getItem(FORM_KEY);
    if (!recievedData) return;
  } catch (error) {
    console.log('Get state error: ', error.message);
  }
}

function onSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  const formData = {
    email: email.value,
    message: message.value,
  };
  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(FORM_KEY);
}

function onInput(evt) {
  inputDataObj[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(FORM_KEY, JSON.stringify(inputDataObj));
}
