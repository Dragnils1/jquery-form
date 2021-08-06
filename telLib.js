let form = $('.form-request');
const inputElement = document.querySelector('input')
let pass = $('.phone-field');
let m;

// pass.on('keyup', function(event) {
//     if (this.value[0] === 8) {
//         m = '{8}(000)000-00-00'
//     } else {
//         m = '+{7}(000)000-00-00'
//     }
//     console.log(m);
//     const maskOptions = { // создаем объект параметров
//         mask: m
//     }
//     IMask(inputElement, maskOptions) // запускаем плагин с переданными параметрами
// })

document.addEventListener('DOMContentLoaded', () => {
    let m;
    const inputElement = document.querySelector('input')
    inputElement.addEventListener('keyup', function() {
        if (inputElement.value.split('')[0] == 8) {
            m = '{8} (000) 000-00-00'
        } else {
            m = '+{7} (000) 000-00-00'
        }
        const maskOptions = { // создаем объект параметров
            mask: m
        }
        IMask(inputElement, maskOptions) // запускаем плагин с переданными параметрами

    })


})

form.validate({
    rules: {
        phone: {
            required: true,
            rangelength: [9, 20]
        }
    },
    messages: {
        phone: {
            required: "Это поле обязательно для заполнения",
            rangelength: "Требуется, минимальная длина 9, максимальная длина 18"

        }
    }
});

jQuery.validator.addMethod("checkMaskPhone", function(value, element) {
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
});

$.validator.addClassRules({
    'phone-field': {
        checkMaskPhone: true,
    }
});



form.submit(function(e) {
    e.preventDefault();
    if (form.valid()) {
        alert('Форма отправлена');
    }
    return;
});