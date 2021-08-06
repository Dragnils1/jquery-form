let form = $('.form-request');
let pass = $('.phone-field');

$.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

// pass.click(function() {
//     $(this).setCursorPosition(3);
// })
// $.mask.definitions['@'] = '[4 8 9]'
// pass.mask(`9 (@99) 999-9999`, { autoclear: false })

pass.on('keyup', function(event) {
    console.log(this.value.length);
    console.log(this.value);
    if (this.value.length === 1 && event.keyCode !== 8 && event.keyCode !== 46) {

        switch (this.value[0]) {
            case "7":
                this.value = `+${this.value} (`
                break;
            case "+":
                this.value = `${this.value}7 (`
                break;
            case "9":
            case "4":
                this.value = `+7 (${this.value}`
                break;
            case "8":
                this.value = `${this.value} (`
                break;
        }

        console.log(this.value);;
    } else if (this.value.length === 17 && event.keyCode == 8) { pass.unmask() } else if (this.value.length === 7 && event.keyCode !== 8 && event.keyCode !== 46) {
        this.value = `${this.value}) `
    } else if (this.value.length === 12 && event.keyCode !== 8 && event.keyCode !== 46) {
        this.value = `${this.value}-`
    } else if (this.value.length === 15 && event.keyCode !== 8 && event.keyCode !== 46) {
        this.value = `${this.value}-`
    }
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