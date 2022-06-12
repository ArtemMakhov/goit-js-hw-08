import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input:document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};


refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onFormIput, 500));
refs.input.addEventListener('input',throttle(onFormIput,500) );

refs.form.addEventListener('input', e => {
   
    formData[e.target.name] = e.target.value;
});

displayTextInForm();


function onFormSubmit(evt) { 
    evt.preventDefault();
   
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};


function onFormIput() {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};


function displayTextInForm() {
    const saveMessage = localStorage.getItem(STORAGE_KEY);
    const parsedMessage = JSON.parse(saveMessage);
    
    if (parsedMessage) {
        console.log(parsedMessage);
        
        refs.textarea.value = parsedMessage.message;
        refs.input.value = parsedMessage.email;
}
};

