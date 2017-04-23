Js validation for form field.

You can use this library to validate ur form by ur custom error handling in easy step.

1. First add unique `class` to all the element which needs to be validated inside form.
2. all the elements which needs to be validated should have a `valid` attribute with multiple values seprated by
   `|` which we will consider for validation attribute.
3. All element should have unique id. It is for error handling.
4. write your own error handling function to show on frontend.

Here is sample steps. i am choosing mandatory_field as class to choose all element.
## any element <cls="'mandatory_field'" valid="email|fname|nonempty" etc.>


```javascript
  function showError(errMsg, elmId) {
    $('.has-error').removeClass('has-error');
    $(".InvalidError").remove();
    $('.bk_form_errorTxt').removeClass('bk_form_errorTxt');
    $('#' + elmId).parent().append('<span class="InvalidError">' + errMsg + '</span>');
    $('#' + elmId).addClass('has-error');

  }
  ```
```
  // Below is form validation logic.
```
  ```javascript
    var isValid = formValidator('travellerForm', 'mandatory_field', showError);
  ```
    # mandatory_field is class_name i choose to identify all the field i want to validate
   ```javascript
    if (!isValid){
        return false;
    } else {
     console.log('Valid form')
    }
```

    
