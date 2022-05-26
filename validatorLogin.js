function ValidatorLogin(options) {

    var selectorRules = {}

    //Hàm validate
    function validate(inputElement, rule) {
        var errorMessage
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
            
        //Lấy ra các rules của selector
        var rules = selectorRules[rule.selector]

        //Lặp qua từng rules và kiểm tra
        //Có lỗi dừng kiểm tra
        for(var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break
        }
        
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

        //Ngăn chặn submit
        formElement.onsubmit = function(e) {
            e.preventDefault()

            //Lặp qua từng rules và validate
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector)
                validate(inputElement,rule)
            })
        }

        options.rules.forEach(function(rule) {

            //Lưu lại các rules
            if(Array.isArray(selectorRules[rule.selector])) {

                selectorRules[rule.selector].push(rule.test)
            } else {

                selectorRules[rule.selector] = [rule.test]
            }

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

ValidatorLogin.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
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
