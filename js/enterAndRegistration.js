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
    
    registrationBtn.addEventListener('click',doRegistration);
}

function doRegistration (){
    console.log(localStorage);
    let login = loginInput.value;
    let password = passwordInput.value;

    if(login){
        let keys = Object.keys(localStorage);
        for (let key of keys){
            if (key == login){
                //console.log('Пользователь уже существует');
                let error = document.querySelector('.enter-form__error');
                error.style.display = 'block';
                setTimeout(() => {
                    error.style.display = 'none';
                }, 10000);
                return;
            }
        }
        
        localStorage.setItem(login,password);
        let error = document.querySelector('.enter-form__error');
        error.style.display = 'none';
        let registrationDone = document.querySelector('.enter-form__error.enter-form__registration-done');
        registrationDone.style.display = 'block';
        setTimeout(() => {
            registrationDone.style.display = 'none';
        }, 10000);
        //console.log('Зареган');
        return;

    }

} 
