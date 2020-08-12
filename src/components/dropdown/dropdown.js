function declension(n, text_forms) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

let valueStatus = 0;
let valueSecondStatus = 0;
let valueThirdStatus = 0;

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
        let wordFormsSecond = dropdown.hasAttribute('wordformsSecond') ? dropdown.getAttribute('wordformsSecond').split(' '): undefined;
        let rightFormSecond = wordFormsSecond !== undefined ? declension(valueSecond, wordFormsSecond): '';
        //Записываем в название dropdown значение всех
        if (value === 0 && valueSecond !==0) {
            dropdown.querySelector('.dropdown__name').innerText = valueSecond+' '+rightFormSecond
        } else if (valueSecond >= 1 && valueSecond !== 0) {
            dropdown.querySelector('.dropdown__name').append(', ' + valueSecond+' '+rightFormSecond)
        }
        let valuesElementsThird = dropdown.querySelectorAll('.valueThird');
        let valueThird = 0;
        valuesElementsThird.forEach(valueItem => {
            valueThird += (Number.parseInt(valueItem.innerText))
        });
        //Получаем словоформы и записываем в массив
        let wordFormsThird = dropdown.hasAttribute('wordformsThird') ? dropdown.getAttribute('wordformsThird').split(' '): undefined;
        let rightFormThird = wordFormsThird !== undefined ? declension(valueThird, wordFormsThird): '';
        //Записываем в название dropdown значение всех
        if (value === 0 && valueSecond === 0 && valueThird !==0) {
            dropdown.querySelector('.dropdown__name').innerText = valueThird+' '+rightFormThird
        } else if (valueThird >= 1) {
            dropdown.querySelector('.dropdown__name').append(', ' + valueThird+' '+rightFormThird)
        }

        let valuesElementsTarget = dropdown.querySelectorAll('.valueTarget');
        let valueTarget = 0;
        valuesElementsTarget.forEach(valueItem => {
            valueTarget += (Number.parseInt(valueItem.innerText))
        });
        //Получаем словоформы и записываем в массив
        let wordFormsTarget = dropdown.hasAttribute('wordformsTarget') ? dropdown.getAttribute('wordformsTarget').split(' '): undefined;
        let rightFormTarget = wordFormsTarget !== undefined ? declension(valueTarget, wordFormsTarget): '';
        //Записываем в название dropdown значение всех
        if (valueTarget !== 0) {
            dropdown.querySelector('.dropdown__name').innerText = valueTarget + ' ' + rightFormTarget
        }
    });
}



function createControls(defaultValue) {
    let element = document.createElement('div');
    let plus = document.createElement('button');
    let minus = document.createElement('button');
    let value = document.createElement('div');
    let clear = document.createElement('button');
    let updateClear = document.createElement('button');
    updateClear.className = 'update-clear';
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
        valueStatus = 1;
        document.getElementsByClassName('update-clear')[0].click();
        value.innerText = Number.parseInt(value.innerText)+1
        updateDropdown()
    });
    minus.innerText = '-';
    minus.addEventListener('click', function () {
        if(parseInt(value.innerText) === 1) {
            minus.classList.add('disabled');
            value.classList.add('zero');
            valueStatus = 0;
        }
        if(parseInt(value.innerText) > 0){
            value.innerText = Number.parseInt(value.innerText)-1
        }
        document.getElementsByClassName('update-clear')[0].click();
        updateDropdown();
    });
    clear.addEventListener('click', function () {
        value.innerText = '0';
        updateDropdown();
    });

    updateClear.addEventListener('click', function () {
        document.getElementsByClassName('clear-button-hidden')[0].click();
    });

    element.append(minus);
    element.append(value);
    element.append(plus);
    element.append(clear);
    element.append(updateClear);
    return(element);
}

function createControlsSecond(defaultValue) {
    let element = document.createElement('div');
    let valueSecond = document.createElement('div');
    let plus = document.createElement('button');
    let minus = document.createElement('button');
    let clear = document.createElement('button');
    let updateClearSecond = document.createElement('button');
    updateClearSecond.className = 'update-clear-second';
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
        valueSecondStatus = 1;
        document.getElementsByClassName('update-clear-second')[0].click();
        valueSecond.innerText = Number.parseInt(valueSecond.innerText)+1
        updateDropdown()
    });
    minus.innerText = '-';
    minus.addEventListener('click', function () {
        if(parseInt(valueSecond.innerText) === 1) {
            minus.classList.add('disabled');
            valueSecond.classList.add('zero');
            clear.classList.remove('dropdown__button-clear-hidden');
            clear.classList.add('dropdown__button-clear-hidden-zero');
            valueSecondStatus = 0;
        }
        if(parseInt(valueSecond.innerText) > 0){
            valueSecond.innerText = Number.parseInt(valueSecond.innerText)-1
        }
        document.getElementsByClassName('update-clear-second')[0].click();
        updateDropdown()
    });
    clear.addEventListener('click', function () {
        valueSecond.innerText = '0';
        updateDropdown();
    });

    updateClearSecond.addEventListener('click', function () {
        document.getElementsByClassName('clear-button-hidden')[0].click();
    });

    element.append(minus);
    element.append(valueSecond);
    element.append(plus);
    element.append(clear);
    element.append(updateClearSecond);
    return(element);
}

function createControlsThird(defaultValue) {
    let element = document.createElement('div');
    let valueThird = document.createElement('div');
    let plus = document.createElement('button');
    let minus = document.createElement('button');
    let clear = document.createElement('button');
    let updateClearThird = document.createElement('button');
    clear.className = 'dropdown__button-clear-hidden-zero';
    updateClearThird.className = 'update-clear-third';
    valueThird.className = 'valueThird zero';
    valueThird.innerText = defaultValue;
    element.className = 'controls';
    plus.className = 'plus';
    minus.className = 'minus';
    plus.innerText = '+';
    plus.addEventListener('click', function () {
        if(Number.parseInt(valueThird.innerText) === 0) {
            minus.classList.remove('disabled');
            valueThird.classList.remove('zero');
            clear.classList.add('dropdown__button-clear-hidden');
            clear.classList.remove('dropdown__button-clear-hidden-zero')
        }
        valueThirdStatus = 1;
        document.getElementsByClassName('update-clear-third')[0].click();
        valueThird.innerText = Number.parseInt(valueThird.innerText)+1
        updateDropdown()
    });
    minus.innerText = '-';
    minus.addEventListener('click', function () {
        if(parseInt(valueThird.innerText) === 1) {
            minus.classList.add('disabled');
            valueThird.classList.add('zero');
            clear.classList.remove('dropdown__button-clear-hidden');
            clear.classList.add('dropdown__button-clear-hidden-zero');
            valueThirdStatus = 0;
            //удалить все что было сделано в прошлый раз и добавить тут добавление класса 'hidden для кнопки очистить
        }
        if(parseInt(valueThird.innerText) > 0){
            valueThird.innerText = Number.parseInt(valueThird.innerText)-1
        }
        document.getElementsByClassName('update-clear-third')[0].click();
        updateDropdown()
    });
    clear.addEventListener('click', function () {
        valueThird.innerText = '0';
        updateDropdown();
    });

    updateClearThird.addEventListener('click', function () {
        document.getElementsByClassName('clear-button-hidden')[0].click();

    });

    element.append(minus);
    element.append(valueThird);
    element.append(plus);
    element.append(clear);
    element.append(updateClearThird);
    return(element);
}

function createControlsTarget() {
    let element = document.createElement('div');
    let plus = document.createElement('button');
    let minus = document.createElement('button');
    let valueTarget = document.createElement('div');
    let clear = document.createElement('button');
    let updateClear = document.createElement('button');
    updateClear.className = 'update-clear';
    clear.className = 'dropdown__button-clear-hidden';
    element.className = 'controls';
    valueTarget.className = 'valueTarget zero';
    valueTarget.innerText = 2;
    plus.className = 'plus';
    minus.className = 'minus';
    plus.innerText = '+';
    plus.addEventListener('click', function () {
        if(Number.parseInt(valueTarget.innerText) === 0) {
            minus.classList.remove('disabled');
            valueTarget.classList.remove('zero')
        }
        valueStatus = 1;
        document.getElementsByClassName('update-clear')[0].click();
        valueTarget.innerText = Number.parseInt(valueTarget.innerText)+1
        updateDropdown()
    });
    minus.innerText = '-';
    minus.addEventListener('click', function () {
        if(parseInt(valueTarget.innerText) === 1) {
            minus.classList.add('disabled');
            valueTarget.classList.add('zero');
            valueStatus = 0;
        }
        if(parseInt(valueTarget.innerText) > 0){
            valueTarget.innerText = Number.parseInt(valueTarget.innerText)-1
        }
        document.getElementsByClassName('update-clear')[0].click();
        updateDropdown();
    });
    clear.addEventListener('click', function () {
        valueTarget.innerText = '0';
        updateDropdown();
    });

    updateClear.addEventListener('click', function () {
        document.getElementsByClassName('clear-button-hidden')[0].click();
    });

    element.append(minus);
    element.append(valueTarget);
    element.append(plus);
    element.append(clear);
    element.append(updateClear);
    return(element);
}

function createControlsTargetSecond() {
    let element = document.createElement('div');
    let valueTargetSecond = document.createElement('div');
    let plus = document.createElement('button');
    let minus = document.createElement('button');
    let clear = document.createElement('button');
    let updateClearSecond = document.createElement('button');
    updateClearSecond.className = 'update-clear-second';
    clear.className = 'dropdown__button-clear-hidden-zero';
    valueTargetSecond.className = 'valueSecond zero';
    valueTargetSecond.innerText = defaultValue;
    element.className = 'controls';
    plus.className = 'plus';
    minus.className = 'minus';
    plus.innerText = '+';
    plus.addEventListener('click', function () {
        if(Number.parseInt(valueTargetSecond.innerText) === 0) {
            minus.classList.remove('disabled');
            valueTargetSecond.classList.remove('zero');
            clear.classList.add('dropdown__button-clear-hidden');
            clear.classList.remove('dropdown__button-clear-hidden-zero')
        }
        valueSecondStatus = 1;
        document.getElementsByClassName('update-clear-second')[0].click();
        valueTargetSecond.innerText = Number.parseInt(valueTargetSecond.innerText)+1
        updateDropdown()
    });
    minus.innerText = '-';
    minus.addEventListener('click', function () {
        if(parseInt(valueTargetSecond.innerText) === 1) {
            minus.classList.add('disabled');
            valueTargetSecond.classList.add('zero');
            clear.classList.remove('dropdown__button-clear-hidden');
            clear.classList.add('dropdown__button-clear-hidden-zero');
            valueSecondStatus = 0;
        }
        if(parseInt(valueTargetSecond.innerText) > 0){
            valueTargetSecond.innerText = Number.parseInt(valueTargetSecond.innerText)-1
        }
        document.getElementsByClassName('update-clear-second')[0].click();
        updateDropdown()
    });
    clear.addEventListener('click', function () {
        valueTargetSecond.innerText = '0';
        updateDropdown();
    });

    updateClearSecond.addEventListener('click', function () {
        document.getElementsByClassName('clear-button-hidden')[0].click();
    });

    element.append(minus);
    element.append(valueTargetSecond);
    element.append(plus);
    element.append(clear);
    element.append(updateClearSecond);
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
        let listItemsThird = item.querySelectorAll('.dropdown-list__item-third');
        listItemsThird.forEach(item => {
            item.append(createControlsThird(item.hasAttribute('default') ? item.getAttribute('default'):0))
        });
        let listItemsTarget= item.querySelectorAll('.dropdown-list__item-target');
        listItemsTarget.forEach(item => {
            item.append(createControlsTarget(item.hasAttribute('default') ? item.getAttribute('default'):0))
        });
        let listItemsTargetSecond= item.querySelectorAll('.dropdown-list__item-target-second');
        listItemsTargetSecond.forEach(item => {
            item.append(createControlsTargetSecond(item.hasAttribute('default') ? item.getAttribute('default'):0))
        });
        updateDropdown()
    })
});

$('.dropdown__name').click(function (event) {
    $(this).toggleClass('dropdown__name-disabled');
});

$('.dropdown-list').append('<div class="dropdown__buttons"></div>');
$('.dropdown__buttons').append('<input type="button" value="ОЧИСТИТЬ" class="dropdown__button-clear">').append('<input type="button" value="ПРИМЕНИТЬ" class="dropdown__button-apply">');

if ($('.dropdown-list').hasClass('room') === true) {
    $('.room .dropdown__buttons').remove();
}

$('input.dropdown__button-apply').click(function () {
    $('div.dropdown').toggleClass('active');
    $('div.dropdown__name').toggleClass('dropdown__name-disabled');
});

$('.dropdown__button-clear').click(function () {
    $('.dropdown__button-clear-hidden').trigger('click');
    valueStatus = 0;
    valueSecondStatus = 0;
    valueThirdStatus = 0;
    $('.clear-button-hidden').trigger('click');
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

$('.dropdown-list').append('<button class="clear-button-hidden"></button>');

$('.clear-button-hidden').click(function () {
    if (valueStatus === 0 && valueSecondStatus === 0 && valueThirdStatus === 0) {
        $('.dropdown__button-clear').addClass('hidden');
    } else {
        $('.dropdown__button-clear').removeClass('hidden');
    }
});

$('.clear-button-hidden').trigger('click');


/*$('.target-value').addClass('dropdown-list__item-target').removeClass('dropdown-list__item').removeClass('dropdown-list__item-second');
$('.target-value-second').addClass('dropdown-list__item-target-second').removeClass('dropdown-list__item-second');*/
