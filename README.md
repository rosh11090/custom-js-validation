Js validation for form field.

You can use this library to validate ur form by ur custom error handling in easy step.

1. First add unique `class` to all the element which needs to be validated inside form.
2. all the elements which needs to be validated should have a `valid` attribute with multiple values seprated by
   `|` which we will consider for validation attribute.
3. All element should have unique id. It is for error handling.
4. write your own error handling function to show on frontend.

Here is sample steps.

My form on html look like.

  <form id="travellerForm" name="travellerForm" method="POST">
  <select class="mandatory_field" valid='title|notempty' id="id_title" name="salutation">
    <option value="" selected="selected">Title</option>
    <option value="Mr.">Mr</option>
    <option value="Mrs.">Mrs</option>
  </select>
  <input type="text" name="first_name" id="id_firstname" class="mandatory_field" valid="notempty|fname">
  <input type="text" name="first_name" id="id_firstname" class="mandatory_field" valid="mname">
  <input type="text" name="first_name" id="id_firstname" class="mandatory_field" valid="notempty|lname">
  <input type="text" valid="email|notempty" id="email" name="email" class=" iconImg mandatory_field">
  <input type="text" id="mobile" name="phone" valid="mobnum|notempty" class="mandatory_field"/>
  <input type="button" id="makePayment" value="Submit"/>
  </form>

  function removeError(){
    $('.has-error').removeClass('has-error');
    $(".InvalidError").remove();
    $('.bk_form_errorTxt').removeClass('bk_form_errorTxt');
  }

  function showError(errMsg, elmId) {
    removeError();
    if (elmId) {
        $('#' + elmId).parent().append('<span class="InvalidError">' + errMsg + '</span>');
        $('#' + elmId).addClass('has-error');
        try {
            $('html,body').animate({
                scrollTop: $("#" + elmId).offset().top
            }, 'slow');
        } catch (e) {};
        $('#' + elmId).closest('.sh_detail').slideDown();
      }
  }

  // Below is form validation logic.
    var isValid = formValidator('travellerForm', 'mandatory_field', showError);
    # mandatory_field is class_name i choose to identify all the field i want to validate
    if (!isValid){
        return false;
    } else {
     console.log('Valid form')
    }

    
