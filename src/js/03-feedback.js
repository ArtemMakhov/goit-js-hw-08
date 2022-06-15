import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const savedMessage = {
    email: '',
    message: '',
  };

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('[name="email"]'),
    message: document.querySelector('[name="message"]'),
}

refs.form.addEventListener('input', throttle(onInputForm, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onInputForm(evt) {
    savedMessage[evt.target.name] = evt.target.value;  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMessage));
}
    populateTextMessage();

function populateTextMessage() {
    const getLocalMessage = localStorage.getItem(STORAGE_KEY);
    const parsedMessage = JSON.parse(getLocalMessage);
    
    if (getLocalMessage) {
    savedMessage.email = parsedMessage.email;
    savedMessage.message = parsedMessage.message;
   }
    if (parsedMessage !== null) {
        refs.email.value = parsedMessage.email;
       refs.message.value = parsedMessage.message;
   }

}

function onFormSubmit(evt) {
    evt.preventDefault();
    
    const { elements: { email, message } } = evt.currentTarget;

    if (email.value === '' || message.value === '') {
        alert("Oops! FILL IN ALL THE FIELDS!");
    } else {
        savedMessage.email = email.value;
        savedMessage.message = message.value;
        console.log(savedMessage);
        
        evt.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
    }
    
    }







