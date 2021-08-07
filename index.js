/*
    Написать приложение-калькулятор, используя подход BDD. 
    Приложение должно состоять из четырёх методов для сложения, вычитания, умножения и деления. 
    Каждый метод принимает на вход два аргумента и выполняет действие. 
    При написании тестов учесть случаи, когда на вход подаются не числа, а строки, null или undefined.
*/

const checkValues = (a, b) => {
    if (a === undefined || b === undefined) {
        console.log("Операнды не определены!")
        return false;
    }

    if (a == null || b == null) {
        console.log("Операнды пустые!")
        return false;
    }

    if (typeof a != "number" || typeof b != "number") {
        console.log("Введены не числа!")
        return false;
    }

    return true;
}

const summ = (a, b) => {
    if (!checkValues(a, b)) {
        return null;
    }

    let result = a + b;

    return result;
}

const subtract = (a, b) => {
    if (!checkValues(a, b)) {
        return null;
    }

    let result = a - b;

    return result;
}

const multiply = (a, b) => {
    if (!checkValues(a, b)) {
        return null;
    }

    let result = a * b;

    return result;
}

const division = (a, b) => {
    if (!checkValues(a, b)) {
        return null;
    }

    let result = a / b;

    return result;
}


module.exports = {
    summ: summ,
    subtract: subtract,
    multiply: multiply,
    division: division
}
