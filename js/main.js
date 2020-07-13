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
        let displayForExpenses = document.querySelector(".add-expenses__date-visible");

        function changeDate (event){
            
            let displayBlock = (
                event.target.className == 'add-expenses__date-input')?displayForExpenses:displayForExpenses;
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




// Функция добавления категорий накплений на "рабочем столе"

if (document.location.pathname == '/desk.html'){

    const buttonAccumulation = document.querySelector('.accumulation__button');
    buttonAccumulation.addEventListener('click',addSavingCategory);

    function addSavingCategory () {
        const accumulation = document.querySelector('.accumulation');
        const inputAccumulation = document.querySelector('.accumulation__input');
        if(inputAccumulation.value == '') return;

        const newSquareBlock = document.createElement('div');
        newSquareBlock.classList = 'square-block';

        const squareBlockTitle = document.createElement('h3');
        squareBlockTitle.classList = 'square-block__title';
        squareBlockTitle.textContent = inputAccumulation.value;
        newSquareBlock.append(squareBlockTitle);
        
        let currencyArray = ['&#8381;','&#36;','&euro;']

        for (let i=0; i < currencyArray.length; i++){

            const squareBlockResult  = document.createElement('div');
            squareBlockResult.classList = 'square-block__result';

            const squareBlockCurrency = document.createElement('div');
            squareBlockCurrency.classList = 'square-block__currency';
            squareBlockCurrency.innerHTML = currencyArray[i];
            squareBlockResult.append (squareBlockCurrency);

            const squareBlockTotal = document.createElement('div');
            squareBlockTotal.classList = 'square-block__total';
            squareBlockTotal.textContent = '40 395';
            squareBlockResult.append (squareBlockTotal);

            newSquareBlock.append(squareBlockResult);
        }

        const lastSquareBlock = document.querySelectorAll ('.square-block');
        lastSquareBlock[lastSquareBlock.length-1].after(newSquareBlock);

    }

}    


// Функция добавления расходов и доходов в таблицу 
if (document.location.pathname == '/expenses.html' || document.location.pathname == '/income.html' || document.location.pathname == '/balance.html'){
    const addExpensesEnter = document.querySelector ('.add-expenses__enter');
    addExpensesEnter.addEventListener('click',addExpenses);
}

function addExpenses (){ 

    const type = document.querySelector('.add-expenses__select').value;

    if (document.location.pathname == '/expenses.html' && type != 'expense') {
        log();
        clearInputs ();
        return;
    };
    if (document.location.pathname == '/income.html' && type != 'income') {
        log();
        clearInputs ();
        return;
    };
    if (document.location.pathname == '/balance.html') {
        log();
        clearInputs ();
        return;
    };

    const date = document.querySelector('.add-expenses__date-visible').textContent;

    const currency = document.querySelector('.settings__checkbox:checked').value;

    const amount = document.querySelector('.add-expenses__input-amount').value;

    const comment = document.querySelector('.add-expenses__input-comment').value;


    const newTr = document.createElement ('tr');
    newTr.classList = 'expense-table__row';

    const tdDate = document.createElement ('td');
    tdDate.classList = 'expense-table__col expense-table__col_month';
    tdDate.textContent = date;
    newTr.append(tdDate);

    const tdCurrency = document.createElement ('td');
    tdCurrency.classList = 'expense-table__col';
    const currencyObject = {
        RUB:'&#8381;',
        USD:'&#36;',
        EUR:'&euro;',
    };
    tdCurrency.innerHTML = currencyObject[currency];
    newTr.append(tdCurrency);

    const tdAmount = document.createElement ('td');
    tdAmount.classList = 'expense-table__col expense-table__col_sum';
    tdAmount.textContent = amount;
    newTr.append(tdAmount);

    const tdComment = document.createElement ('td');
    tdComment.classList = 'expense-table__col expense-table__col_comment';
    tdComment.textContent = comment;
    newTr.append(tdComment);

    const tdDel = document.createElement ('td');
    tdDel.classList = 'expense-table__col expense-table__col_del';
    tdDel.innerHTML = '<img class="expense-table__img_del" src="img/delete.svg" alt="del" height="20px" width="20px">';
    newTr.append(tdDel);

    const tbody = document.querySelector('.expense-table tbody');

    tbody.append(newTr);

    function clearInputs (){
        document.querySelector('.add-expenses__input-amount').value = '';

        document.querySelector('.add-expenses__input-comment').value = '';
    }

    clearInputs ();


    //добавляем логирование с последней датой добавления данных
    function log (){
        const logging = document.querySelector('.add-expenses__logging');
        const objDate = new Date();
        logging.textContent = `Последнее добавление было в: ${objDate.getHours()}:${objDate.getMinutes()}:${objDate.getSeconds()}   `;
        logging.style.display = 'block';
    }
    log ();
}



// Функция распределения суммы ДС по категориям накоплений в форме добавления дохода

if(document.location.pathname == '/expenses.html' || document.location.pathname == '/income.html' || document.location.pathname == '/balance.html'){

    //Изменение суммы категории в зависимости от % 
    const extraItemIncome = document.querySelector('.add-balance__extra-item-income');

    const partIncomeDistribution = function (event){
        if (event.target.className != 'add-income__input add-income__input_percent') return;
        const inputPercentValue = event.target.value;
        const amountValue = document.querySelector('.add-expenses__input-amount').value;
        const incomeInput = event.target.previousElementSibling;
        incomeInput.value = `${Math.floor((amountValue/100)*inputPercentValue)}`;
        
    } ;

    extraItemIncome.addEventListener('input',partIncomeDistribution);

    // Изменение всех сумм категорий в зависимости от введенной суммы
    const inputAmount = document.querySelector('.add-expenses__input.add-expenses__input-amount');
    const arrayOfInputPercent = document.querySelectorAll('.add-income__input.add-income__input_percent');
    
    const fullIncomeDistribution = function (){
        
        for (let i=0; i < arrayOfInputPercent.length ;i++){
            const inputPercentValue = arrayOfInputPercent[i].value;
            const incomeInput = arrayOfInputPercent[i].previousElementSibling;
            incomeInput.value = `${Math.floor((inputAmount.value/100)*inputPercentValue)}`;
        }
        
        
    };

    inputAmount.addEventListener('input',fullIncomeDistribution);
}



// Функция удаления строк таблицы по клику на крестик

if(document.location.pathname == '/expenses.html' || document.location.pathname == '/income.html'){
    

    let delRowListener = function (){
        const tbody = document.querySelector('.expense-table tbody');
        

        let delRow = function (event){
            if(event.target.className == 'expense-table__img_del'){
                let del = event.target.parentElement;
                let row = del.parentElement;
                row.remove();
            }

            if(event.target.className == 'expense-table__col expense-table__col_del'){
                console.log(event.target.parentElement);
                event.target.parentElement.remove();
            }

        }

        tbody.addEventListener ('click', delRow);
    } 

    window.addEventListener("load",delRowListener);
}





