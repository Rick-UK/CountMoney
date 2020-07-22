'use strict'

// Создание и проверка пользователя на устройстве пользователя без БД
let loginInput;
let passwordInput;
let enterBtn;
let registrationBtn;

window.addEventListener("load",initialization);

function initialization () {
    loginInput=document.querySelector('.enter-form__login-input');
    passwordInput=document.querySelector('.enter-form__password-input');
    enterBtn=document.querySelector('.enter-form__enter');
    registrationBtn=document.querySelector('.enter-form__registration');
    
    enterBtn.addEventListener('click',doEnter);
    registrationBtn.addEventListener('click',doRegistration);
}

function doEnter (){
    let login = loginInput.value;
    let password = passwordInput.value;
    findAccount (login);


    function findAccount (login){
        let keys = Object.keys(localStorage);
        for (let key of keys){
            if (key == login){
                isPasswordCorrect(password);
                return;
            }
        }
        
        console.log('Пользователя не существует');
        enterError ();
    }
    
    function isPasswordCorrect (password){
        let error = document.querySelector ('.enter-form__error.enter-form__enter-error');
        error.style.display = 'none';
        console.log('Проверка пароля');


        if (localStorage.getItem(login) == password){
            console.log('Пароль вреный');

            localStorage.setItem('activeUser',login);
            document.location.href ="desk.html";

            return;
        }

        console.log('Пароль не верный');
        enterError ();
    }

    function enterError (){
        let error = document.querySelector('.enter-form__error.enter-form__registration-done');
        error.style.display = 'none';

        error = document.querySelector('.enter-form__error.enter-form__registration-error');
        error.style.display = 'none';

        error = document.querySelector ('.enter-form__error.enter-form__enter-error');
        error.style.display = 'block';
    } 


}


function doRegistration (){
    let login = loginInput.value;
    let password = passwordInput.value;

    if(login){
        let keys = Object.keys(localStorage);
        for (let key of keys){
            if (key == login){
                //console.log('Пользователь уже существует');
                let error = document.querySelector('.enter-form__error.enter-form__registration-done');
                error.style.display = 'none';

                error = document.querySelector('.enter-form__error.enter-form__enter-error');
                error.style.display = 'none';

                error = document.querySelector('.enter-form__error.enter-form__registration-error');
                error.style.display = 'block';
                
                return;
            }
        }
        
        localStorage.setItem(login,password);
        
        let error = document.querySelector('.enter-form__error.enter-form__enter-error');
        error.style.display = 'none';

        error = document.querySelector('.enter-form__error.enter-form__registration-error');
        error.style.display = 'none';

        let registrationDone = document.querySelector('.enter-form__error.enter-form__registration-done');
        registrationDone.style.display = 'block';
        
        //console.log('Зареган');
        return;

    }

} 
