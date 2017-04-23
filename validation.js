/*
Used to validate travellers form.

1- In form tag use fieldValidator(class_name, error_handler) function to validate form.

2- Each field of form should have `class_name` class to select dom-element.

3- Each field should contain `valid` attribute with value to check seprated by |.

e.g. - <input name='email' class='$class_name' valid='email|notempty'>

*/


function formValidator(formId, fieldClass, errorHandler){
    var all_fld = $('#'+formId).find('.'+fieldClass);
    var rtn = true;
    for (var i=0; i<all_fld.length; i++){
        var jObj = all_fld[i]; 
        var message = validateField(jObj);
        if(message != true){
            errorHandler(message, $(jObj).attr('id'))
            return false;
            }
    }
    return rtn;
}


function getElementValue(objEle){
    var result = '';
    switch(objEle.type){
        case "text":
        case "hidden":
        case "textarea":
        case "email":
            result = objEle.value;
            break;

        case "select-one":
        case "select-multiple":
        case "select":
            if(objEle.selectedIndex >= 0){
                result = objEle.options[objEle.selectedIndex].value;
                if(result == -1 || result == ''){
                    result = '';
                }
            }
            break;

        case "radio":
        case "checkbox":
            for (var i=0; i<objEle.form.elements.length; i++){
                if (objEle.form.elements[i].name == objEle.name){
                    if (objEle.form.elements[i].checked){
                        result += objEle.form.elements[i].value+",";
                    }
                }
            }
            break;
    }
    return result;
}

function getPlaceholder(objEle){
    var result = '';
    switch(objEle.type){
        case "text":
        case "hidden":
        case "textarea":
        case "email":
            result = objEle.placeholder;
            break;
        default:
            result = "";
    }
    return result;
}

function validateField(domObj){
    var typeArr = domObj.getAttribute('valid');
    typeArr = typeArr.split('|');
    var rtn = false;
    for(var j = 0; j < typeArr.length;j++){
        var type = $.trim(typeArr[j]);
        var val = $.trim(domObj.value);
        switch(type){
            case 'fname':
            case 'city':
            case 'state':
                rtn = isValidName(val);
                break;
            case 'name':
            case 'mname':
                rtn = isValidMiddleName(val);
                break;
            case 'lname':
                rtn = isValidLastName(val);
                break;
            case 'email':
                rtn = isValidEmailAddress(val);
                break;
            case 'date':
                rtn = isValidDate(val);
                break;
            case 'validDob':
                var traveldate = domObj.getAttribute('traveldate');
                rtn = isValidDob(val, '', traveldate);
                break;
            case 'adultDob':
                var traveldate = domObj.getAttribute('traveldate');
                rtn = isValidDob(val, 'adult', traveldate);
                break;
            case 'childDob':
                var traveldate = domObj.getAttribute('traveldate');
                rtn = isValidDob(val, 'child', traveldate);
                break;
            case 'infantDob':
                var traveldate = domObj.getAttribute('traveldate');
                rtn = isValidDob(val, 'infant', traveldate);
                break;
            case 'integer':
                rtn = validateInteger(val);
                break;
            case 'mobnum':
                rtn = isValidMobileNumber(val);
                break;
            case 'address':
                rtn = isValidAddress(val);
                break;
            case 'checkbox':
                rtn = (domObj.checked)? true: false;
                break;
            case 'title':
            case 'notempty':
                rtn = ValidateNotEmpty(domObj);
                break;
        }
        if(!rtn){
            var rtn = getMsg(type);
            j = typeArr.length + 1;
        }
    }
    return rtn;
}


function isValidName(name){
    var re =  /^[a-zA-Z]+$/;   //only charecters in name
    if(name.match(re)){
        return true;
    }
    return false;
}

function isValidMiddleName(name){
    var re =  /^(\s{0,1}[a-zA-Z-, ])*$/;   //only charecters, - and space in name
    if(name.match(re)){
        return true;
    }
    return false;
}

function isValidLastName(name){
    var re =  /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;   //only charecters, - and space in name
    if(name.match(re)){
        return true;
    }
    return false;
}


function isValidEmailAddress(emailAddress){
    var pattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return pattern.test(emailAddress);
}

function ValidateNotEmpty(objEle){
    var strValue = $.trim(getElementValue(objEle));
    var placeHolder = $.trim(getPlaceholder(objEle));
    var dfltvalue=$.trim(objEle.defaultValue);
    
    var blnResult = true;
    if((strValue == "") || (strValue == placeHolder)) {
        blnResult = false;
    }
    return blnResult;
    }


function validateInteger(value){
    return !isNaN(value)
}

function isValidDate(date){

    var pattern = /\d{2}\/\d{2}\/\d{4}/;
    if(date.match(pattern)){
        var d = new Date(date);
        var date = date.split('/');//date formate is 'MM/DD/YYYY'
        if (d.getFullYear() == date[2] && (d.getMonth()+1) == date[0] && d.getDate() == date[1]) {
            return true;
        }
        return false;

    } else {
        return true;
    }

}

function isValidDob(dob, traveller_type, traveldate){
    var pattern = /\d{2}\/\d{2}\/\d{4}/;
    var rtn = false;
    if(dob.match(pattern)){
        var current_date = new Date();
        var dob_date = new Date(dob);
        if(current_date.getTime() < dob_date.getTime()){
            return false
        }
        var travel_date = new Date(traveldate);
        switch(traveller_type){
            case 'adult':
                var valid_year = parseInt(dob_date.getFullYear().toString()) + 12; // person older than 12 years is adult
                var valid_date = new Date(valid_year, dob_date.getMonth(), dob_date.getDate());
                if(valid_date <= travel_date){
                    rtn = true;
                }
                break;
            case 'child':          // a person older than 2 but younger than 12 is child
                var valid_year = parseInt(dob_date.getFullYear().toString()) + 12;
                var valid_date = new Date(valid_year, dob_date.getMonth(), dob_date.getDate());
                var infant_year = parseInt(dob_date.getFullYear().toString()) + 2;
                var infant_date = new Date(infant_year, dob_date.getMonth(), dob_date.getDate());
                if((valid_date > travel_date) && (infant_date <= travel_date)){
                    rtn = true;
                }
                break;
            case 'infant':
                var valid_year = parseInt(dob_date.getFullYear().toString()) + 2;
                var valid_date = new Date(valid_year, dob_date.getMonth(), dob_date.getDate());
                if(valid_date > travel_date){
                    rtn = true;
                }
                break;
            case '':
                if(dob_date < travel_date){
                    rtn = true;
                }
                break;
        }
    } else {
        rtn = true;
    }
    return rtn
}

function isValidPincode(number){
    var re = /^\d{6}$/;   //6 digit pin code number
    if(number.match(re)){
        return true;
    }
    return false;
}

function isValidAddress(address){
    var re = /[^<>{}]+$/;   //address regex 
    if(address.match(re)){
        return true;
    }
    return false;
}


function isValidMobileNumber(number){
    var re = /^[1-9]\d{9}$/;   //10 digit mobile number starting with 7,8 or 9
    if(number.match(re)){
        return true;
        }
    return false;
}


function getMsg(type){
    var message_dict = {
            'title': 'Select title',
            'name': 'Please provide valid name',
            'fname': 'Please provide valid firstname',
            'mname': 'Please provide valid middlename',
            'lname': 'Please provide valid lastname',
            'email': 'Please provide a valid Email id',
            'mobnum': 'Please enter a valid 10 digit mobile number',
            'address': 'Please enter a valid Address',
            'state': 'Please enter a valid State',
            'city': 'Please enter a valid City',
            'pincode': 'Please enter a valid  pincode',
            'integer': 'Only Integers are allowed',
            'checkbox': 'Please check the %fname%',
            'chklen': 'Please enter a valid 10 digit mobile number',
            'date': 'This is an invalid date',
            'adultDob': 'Adult age should be greater than 12 years on booking date',
            'childDob': 'Child age should be between 2 to 12 years on booking date',
            'infantDob': 'Infant age should be less than 2 years on booking date',
            'validDob': 'Please provide valid date of birth.',
            'notempty': 'Field is mandatory'
    }
    if(message_dict.hasOwnProperty(type)){
        return  message_dict[type];
    }
    return 'This field is manadatory.';
}
