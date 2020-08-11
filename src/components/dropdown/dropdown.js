function declension(n, text_forms) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function updateDropdown(){
    let value = 0;
    let dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        //Если сложная шапка для dropdown в названии выводим значения из нескольких итемов
        if(dropdown.hasAttribute('several-word-forms')) {
            let result = '';
            let value;
            let sum = 0;
            let defaultValue = dropdown.getAttribute('default');
            dropdown.querySelectorAll('.dropdown-list__item').forEach(item =>{
                // Получаем все Элементы dropdown cо словоформами
                if(item.hasAttribute('wordForms')){
                    //Получаем Value
                    let elValue = item.querySelectorAll('.value');
                    elValue.forEach(valueItem =>{
                        value = Number.parseInt(valueItem.innerText);
                        sum += Number.parseInt(valueItem.innerText);
                    });
                    //Получаем словоформу
                    if(value > 0){
                        let wordForms = item.getAttribute('wordForms').split(' ');
                        let rightForm = declension(value, wordForms);
                        result += ' ' + value + ' ' + rightForm
                    }}
                //Пишем в заголовок дропдауна результат
                if(sum !== 0){
                    dropdown.querySelector('.dropdown__name').innerText = result + '...'
                }
                else{
                    dropdown.querySelector('.dropdown__name').innerText = defaultValue
                }
            });
        }
        else {
            let valuesElements = dropdown.querySelectorAll('.value');
            valuesElements.forEach(valueItem => {
                value += (Number.parseInt(valueItem.innerText))
            });
            //Получаем словоформы и записываем в массив
            let wordForms = dropdown.hasAttribute('wordforms') ? dropdown.getAttribute('wordforms').split(' ') : undefined;
            let rightForm = wordForms !== undefined ? declension(value, wordForms) : '';
            //Записываем в название dropdow значение всех
            if (value !== 0) {
                dropdown.querySelector('.dropdown__name').innerText = value + ' ' + rightForm
            } else {
                dropdown.querySelector('.dropdown__name').innerText = dropdown.hasAttribute("default") ? dropdown.getAttribute('default') : dropdown.querySelector('.dropdown__name').innerText = value + ' ' + rightForm
            }
        }
        let valuesElementsSecond = dropdown.querySelectorAll('.valueSecond');
        let valueSecond = 0;
        valuesElementsSecond.forEach(valueItem => {
            valueSecond += (Number.parseInt(valueItem.innerText))
        });
        //Получаем словоформы и записываем в массив
        let wordFormsSecond = dropdown.hasAttribute('wordformSecond') ? dropdown.getAttribute('wordformSecond').split(' '): undefined;
        let rightFormSecond = wordFormsSecond !== undefined ? declension(valueSecond, wordFormsSecond): '';
        //Записываем в название dropdown значение всех
        if (value === 0 && valueSecond !==0) {
            dropdown.querySelector('.dropdown__name').innerText = valueSecond+' '+rightFormSecond
        }
        else if (valueSecond >= 1 && valueSecond !== 0) {
            dropdown.querySelector('.dropdown__name').append(', ' + valueSecond+' '+rightFormSecond)
        }
    });
}



function createControls(defaultValue) {
    let element = document.createElement('div');
    let plus = document.createElement('button');
    let minus = document.createElement('button');
    let value = document.createElement('div');
    let clear = document.createElement('button');
    clear.className = 'dropdown__button-clear-hidden';
    element.className = 'controls';
    value.className = 'value zero';
    value.innerText = defaultValue;
    plus.className = 'plus';
    minus.className = 'minus';
    plus.innerText = '+';
    plus.addEventListener('click', function () {
        if(Number.parseInt(value.innerText) === 0) {
            minus.classList.remove('disabled');
            value.classList.remove('zero')
        }
        value.innerText = Number.parseInt(value.innerText)+1
        updateDropdown()
    });
    minus.innerText = '-';
    minus.addEventListener('click', function () {
        if(parseInt(value.innerText) === 1) {
            minus.classList.add('disabled');
            value.classList.add('zero')
        }
        if(parseInt(value.innerText) > 0){
            value.innerText = Number.parseInt(value.innerText)-1
        }
        updateDropdown();
    });
    clear.addEventListener('click', function () {
        value.innerText = '0';
        updateDropdown();
    });

    element.append(minus);
    element.append(value);
    element.append(plus);
    element.append(clear);
    return(element);
}

function createControlsSecond(defaultValue) {
    let element = document.createElement('div');
    let valueSecond = document.createElement('div');
    let plus = document.createElement('button');
    let minus = document.createElement('button');
    let clear = document.createElement('button');
    clear.className = 'dropdown__button-clear-hidden-zero';
    valueSecond.className = 'valueSecond zero';
    valueSecond.innerText = defaultValue;
    element.className = 'controls';
    plus.className = 'plus';
    minus.className = 'minus';
    plus.innerText = '+';
    plus.addEventListener('click', function () {
        if(Number.parseInt(valueSecond.innerText) === 0) {
            minus.classList.remove('disabled');
            valueSecond.classList.remove('zero');
            clear.classList.add('dropdown__button-clear-hidden');
            clear.classList.remove('dropdown__button-clear-hidden-zero')
        }
        valueSecond.innerText = Number.parseInt(valueSecond.innerText)+1
        updateDropdown()
    });
    minus.innerText = '-';
    minus.addEventListener('click', function () {
        if(parseInt(valueSecond.innerText) === 1) {
            minus.classList.add('disabled');
            valueSecond.classList.add('zero');
            clear.classList.remove('dropdown__button-clear-hidden');
            clear.classList.add('dropdown__button-clear-hidden-zero')
        }
        if(parseInt(valueSecond.innerText) > 0){
            valueSecond.innerText = Number.parseInt(valueSecond.innerText)-1
        }
        updateDropdown()
    });
    clear.addEventListener('click', function () {
        valueSecond.innerText = '0';
        updateDropdown();
    });

    element.append(minus);
    element.append(valueSecond);
    element.append(plus);
    element.append(clear);
    return(element);
}

document.addEventListener('DOMContentLoaded', function() {
    let drop = document.querySelectorAll('.dropdown');
    drop.forEach((item, i) => {
        let dropdownName = item.querySelector('.dropdown__name');
        dropdownName.addEventListener('click', function() {
            event.target.closest(".dropdown").classList.toggle("active")
        });
        let listItems = item.querySelectorAll('.dropdown-list__item');
        listItems.forEach(item => {
            item.append(createControls(item.hasAttribute('default') ? item.getAttribute('default'):0))
        });
        let listItemsSecond = item.querySelectorAll('.dropdown-list__item-second');
        listItemsSecond.forEach(item => {
            item.append(createControlsSecond(item.hasAttribute('default') ? item.getAttribute('default'):0))
        });
        updateDropdown()
    })
});

$('.dropdown__name').click(function (event) {
    $(this).toggleClass('dropdown__name-disabled');
});

$('.dropdown-list').append('<div class="dropdown__buttons"></div>');
$('.dropdown__buttons').append('<input type="button" value="ОЧИСТИТЬ" class="dropdown__button-clear">').append('<input type="button" value="ПРИМЕНИТЬ" class="dropdown__button-apply">');

$('input.dropdown__button-apply').click(function () {
    $('div.dropdown').toggleClass('active');
    $('div.dropdown__name').toggleClass('dropdown__name-disabled');
});

$('.dropdown__button-clear').click(function () {
    $('.dropdown__button-clear-hidden').trigger('click')
});

$('.dropdown i').click(function () {
    $('div.dropdown').toggleClass('active');
    $('div.dropdown__name').toggleClass('dropdown__name-disabled');
});

$('.dropdown__name-disabled').mouseenter (function () {
    $('.dropdown-icon-style').addClass('hover')
});

$('.dropdown__name-disabled').mouseleave (function () {
    $('.dropdown-icon-style').removeClass('hover')
});

$('.dropdown-icon-style').mouseenter (function () {
    $('.dropdown__name-disabled').addClass('hover')
});

$('.dropdown-icon-style').mouseleave (function () {
    $('.dropdown__name-disabled').removeClass('hover')
});
