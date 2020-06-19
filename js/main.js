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
    
    //Установка интервала в кастомизированные(фейковые) блоки формы
    let displayFrom = document.querySelector(".date-interval__fromTime-display");
    displayFrom.textContent = '01.'+currentMonth+'.'+String(currentYear).slice(2,4); 


    let displayTo = document.querySelector(".date-interval__toTime-display");
    displayTo.textContent = lastdate.getDate()+'.'+currentMonth+'.'+String(currentYear).slice(2,4); 

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

        // console.dir(displayFrom.textContent);  
        // console.log(displayTo.textContent);
        // if(displayFrom.textContent < displayTo.textContent) {
        //     console.log("ok");
        // }
        // if(displayFrom.textContent > displayTo.textContent) {
        //     console.log("not");
        // }

        checkInterval (displayFrom.textContent , displayTo.textContent);
    }


    
    

     //dateFrom.value= year+'-'+month+'-'+day;


    

    
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