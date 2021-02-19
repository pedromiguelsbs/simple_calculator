const display_1 = document.querySelector('.display_1')
const display_2 = document.querySelector('.display_2')
const display_result = document.querySelector('.display_result')
const clear_all = document.querySelector('.clear_all')
const clear_last_entity = document.querySelector('.clear_last_entity')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')

let display_1_num = '';
let display_2_num = '';
let display_result_num = null;
let last_operation = '';
let have_dot = false;

//NUMBERS
numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if (event.target.innerText === '.' && !have_dot) {
            have_dot = true;
        } else if (event.target.innerText === '.' && have_dot) {
            return;
        }
        display_2_num += event.target.innerText;
        display_2.innerText = display_2_num;
    });
});

//  OPERATIONS
function clear_var(operation='') {
    display_1_num += display_2_num + ' ' + operation + ' ';
    display_1.innerText = display_1_num;
    display_2.innerText = '';
    display_2_num = '';
    display_result.innerText = display_result_num;
}

function math_operation() {
    if (last_operation === '*') {
        display_result_num = parseFloat(display_result_num) * parseFloat(display_2_num);
    } else if (last_operation === '+') {
        display_result_num = parseFloat(display_result_num) + parseFloat(display_2_num);
    } else if (last_operation === '-') {
        display_result_num = parseFloat(display_result_num) - parseFloat(display_2_num);
    } else if (last_operation === '/') {
        display_result_num = parseFloat(display_result_num) / parseFloat(display_2_num);
    } else if (last_operation === '%') {
        display_result_num = parseFloat(display_result_num) % parseFloat(display_2_num);
    }
}

operations.forEach(operation => {
    operation.addEventListener('click', (event) => {
        if (!display_2_num) display_result_num;
        have_dot = false;
        const operation = event.target.innerText;
        if (display_1_num && display_2_num && last_operation) {
            math_operation();
        } else {
            display_result_num = parseFloat(display_2_num)
        }
        clear_var(operation)
        last_operation = operation;
    });
});



//  EQUAL
function equal_exec() {
    if (!display_1_num || !display_2_num) return;
    have_dot = false;
    math_operation();
    clear_var();
    display_2.innerText = display_result_num;
    display_result.innerText = '';
    display_2_num = display_result_num;
    display_1_num = '';
}
equal.addEventListener('click', equal_exec);



// CLEAR ALL ELEMENT
clear_all.addEventListener('click', () => {
    display_1.innerText = '0'
    display_2.innerText = '0'
    display_result.innerText = '0';
    display_1_num = ''
    display_2_num = ''
    display_result_num = ''
    have_dot = false;
});



// CLEAR LAST ENTITY
function clear_last_exec() {
    display_2_num = display_2_num.substr(0, display_2_num.length-1)
    if (display_2_num.length === 0) {
        display_2.innerText = '0';
    } else {
        display_2.innerText = display_2_num;
    }
}

clear_last_entity.addEventListener('click', clear_last_exec);


// USE KEYBOARD
function press_number(key) {
    numbers.forEach(number => {
        if (number.innerText === key) {
            number.click();
        }
    });
}

function press_operation(key) {
    operations.forEach(operation => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

window.addEventListener('keydown', (event) => {
    if (event.key === '0' ||
        event.key === '1' ||
        event.key === '2' ||
        event.key === '3' ||
        event.key === '4' ||
        event.key === '5' ||
        event.key === '6' ||
        event.key === '7' ||
        event.key === '8' ||
        event.key === '9' || 
        event.key === '.') {
        press_number(event.key)
    } else if (event.key === '+' ||
        event.key === '-' ||
        event.key === '*' ||
        event.key === '/' ||
        event.key === '%') {
        press_operation(event.key)
    } else if (event.key === "Enter" || event.key === "=") {
        equal_exec();
    } else if (event.key === "Backspace") {
        clear_last_exec();
    }
})