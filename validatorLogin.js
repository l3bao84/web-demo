function ValidatorLogin(options) {

    //Hàm validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
            if(errorMessage) {

                errorElement.innerText = errorMessage
                inputElement.parentElement.classList.add('invalid')
            }else {

                errorElement.innerText = ''
                inputElement.parentElement.classList.remove('invalid')
            }
    }

    //Lấy element từ form vầ xác nhận
    var formElement = document.querySelector(options.form)
    if(formElement) {

        options.rules.forEach(function(rule) {

            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement) {
                //Blur ngoài input
                inputElement.onblur = function() {
                    validate(inputElement,rule)
                }
                
                //Xử lý khi nhập
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

ValidatorLogin.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email!'
        }
    }
}

ValidatorLogin.isPassword = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
            return regex.test(value) ? undefined : 'Mật khẩu phải ít nhất 8 kí tự(chỉ gồm chữ hoa, thường, số và không có kí tự đặc biệt'
        }
    }
}
