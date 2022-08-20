import throttle from 'lodash.throttle';

const FORM_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

let inputDataObj = {
  email: '',
  message: '',
};

// let formData = JSON.parse(localStorage.getItem(FORM_KEY) || {});

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onSubmit);

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
