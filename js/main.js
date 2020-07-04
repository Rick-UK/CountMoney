'use strict'

window.addEventListener("load",showdate);
//window.onload = showdate;


function showdate(){
    //Определение текущего времени
    let currentDate=new Date();
    let currentDay=currentDate.getDate();
    let currentMonth=currentDate.getMonth() + 1;
    if (currentDay <=9) currentDay = '0'+currentDay;
    if (currentMonth <=9) currentMonth = '0'+currentMonth;
    let currentYear=currentDate.getFullYear();  

    //Установка интервала показываемых данных по умолчанию
    let dateFrom = document.getElementById ("date-interval__fromTime-input");
    dateFrom.value= currentYear+'-'+currentMonth+'-'+'01';


    let dateTo = document.getElementById ("date-interval__toTime-input");
    let lastdate = new Date(currentYear, currentMonth, 0);
    dateTo.value= currentYear+'-'+currentMonth+'-'+lastdate.getDate();

    //Установка текущей даты в поле добаления расхода
    let dateForExpenses = document.querySelector(".add-expenses__date-input");
    if(dateForExpenses){
        dateForExpenses.value= currentYear+'-'+currentMonth+'-'+currentDay;
    }
    
    //Установка интервала в кастомизированные(фейковые) блоки формы
    let displayFrom = document.querySelector(".date-interval__fromTime-display");
    displayFrom.textContent = '01.'+currentMonth+'.'+String(currentYear).slice(2,4); 

    let displayTo = document.querySelector(".date-interval__toTime-display");
    displayTo.textContent = lastdate.getDate()+'.'+currentMonth+'.'+String(currentYear).slice(2,4); 

    //Установка текущей даты в поле добаления расхода в кастомизированные(фейковые) блоки формы
    if (document.location.pathname != '/desk.html'){
        let displayForExpenses = document.querySelector(".add-expenses__date-visible");
        displayForExpenses.textContent = currentDay+'.'+currentMonth+'.'+String(currentYear).slice(2,4); 
    }
    // Устанавливаем обработчики форм даты для 
    // отслеживания их изменений и записи в кастомные блоки
    dateFrom.addEventListener("input",putDate);
    dateTo.addEventListener("input",putDate);

    function putDate (event){
        let displayBlock = (
            event.target.id == 'date-interval__fromTime-input')? 
            displayFrom : displayTo;

        displayBlock.textContent = 
            event.target.value.slice(8,11)+'.'
            +event.target.value.slice(5,7)+'.'
            +event.target.value.slice(2,4); 

        checkInterval (displayFrom.textContent , displayTo.textContent);
    }


    // Устанавливаем обработчики форм даты добавления расхода для 
    // отслеживания их изменений и записи в кастомные блоки
    if (document.location.pathname != '/desk.html'){
        dateForExpenses.addEventListener("input",changeDate);

        function changeDate (event){
            
            let displayBlock = (
                event.target.className == 'add-expenses__date-input')? 
                displayForExpenses : displayForExpenses;
            displayBlock.textContent = 
                event.target.value.slice(8,11)+'.'
                +event.target.value.slice(5,7)+'.'
                +event.target.value.slice(2,4); 

        }
    }

}           

//Проверка верно указанного интервала

function checkInterval (dateFrom,dateTo){
    console.log ('работаем');
    let deteError = document.querySelector('.date-interval__error');
    if(dateFrom < dateTo || dateFrom == dateTo) {
        deteError.style.display = 'none';
        console.log ('ok');

    } 
    if(dateFrom > dateTo) {
        deteError.style.display = 'block';

    }

} 

//Устанавливаем изменение части формы ввода данных,
//В зависимости от типа Доход или Расход

if (document.location.pathname != '/desk.html'){
    
    let changeTypeOfForm = function (){

        const typeOfAdd = document.querySelector(".add-expenses__select");
        typeOfAdd.addEventListener("input",changePieceOfForm);
    
        function changePieceOfForm (){
    
            const expensePieceOfForm = document.querySelector('.add-balance__extra-item-expense');
            const incomePieceOfForm = document.querySelector('.add-balance__extra-item-income');
    
            if (typeOfAdd.value == 'expense'){  
                expensePieceOfForm.style.display = "block";
                incomePieceOfForm.style.display = "none";
            }else{
                expensePieceOfForm.style.display = "none";
                incomePieceOfForm.style.display = "block";
            }
        }
        changePieceOfForm();
    }

    changeTypeOfForm ();
}




   


