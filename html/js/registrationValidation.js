$(function() {
  $.validator.setDefaults({
    debug: true,
    success: "valid"
  });

  $.validator.addMethod("upper_lower_number_special", function(value, element) {
    hasMin = this.optional(element) || value.length >= 8;
    if (hasMin /* && $(element).attr("name") == "password" */) {
      $("#pwdMinCheckbox").prop("checked", true);
    } else {
      $("#pwdMinCheckbox").removeProp("checked");
    }
    
    hasMax = this.optional(element) || value.length <= 16;
    if (hasMax /* && $(element).attr("name") == "password" */) {
      $("#pwdMaxCheckbox").prop("checked", true);
    } else {
      $("#pwdMaxCheckbox").removeProp("checked");
    }
    
    hasUpper = this.optional(element) || /([A-Z])/.test(value);
    if (hasUpper /* && $(element).attr("name") == "password" */) {
      $("#pwdUppercaseCheckbox").prop("checked", true);
    } else {
      $("#pwdUppercaseCheckbox").removeProp("checked");
    }
    
    hasLower = this.optional(element) || /([a-z])/.test(value);
    if (hasLower /* && $(element).attr("name") == "password" */) {
      $("#pwdLowercaseCheckbox").prop("checked", true);
    } else {
      $("#pwdLowercaseCheckbox").removeProp("checked");
    }

    hasNumber = this.optional(element) || /([0-9])/.test(value);
    if (hasNumber /* && $(element).attr("name") == "password" */) {
      $("#pwdNumberCheckbox").prop("checked", true);
    } else {
      $("#pwdNumberCheckbox").removeProp("checked");
    }

    hasSpecial = this.optional(element) || /([!@#$%^&*?_/])/.test(value);
    if (hasSpecial /* && $(element).attr("name") == "password" */) {
      $("#pwdSpecialCheckbox").prop("checked", true);
    } else {
      $("#pwdSpecialCheckbox").removeProp("checked");
    }

    return hasMin && hasMax && hasUpper && hasLower && hasNumber && hasSpecial;
  }, "");

  $("#_form").validate({
    errorClass: "errorform",

    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },
    
    onfocusout: false,

    rules: { 
      email: { 
        required: true,
        email: true,
        maxlength: 254 
      },
      password: {
        required: true,
        upper_lower_number_special: true
        //minlength: 8,
        //maxlength: 16
      },
      confirmpassword: {
        required: true,
        equalTo: "#NewPassword1"
      },
      firstname: {
        required: true,
        minlength: 1,
        maxlength: 64
      },
      lastname: {
        required: true,
        minlength: 1,
        maxlength: 64
      },
      company: {
        required: true,
        minlength: 1,
        maxlength: 64
      },
      title: {
        required: true,
        minlength: 1,
        maxlength: 64
      },
      securityAnswer: {
        required: true,
        minlength: 4,
        maxlength: 64
      }
    },
    messages: { 
      email: { 
        required: "E-mail is required.", 
        maxlength: "E-mail must be no more than {0} characters."
      },
      password: {
        required: function() {
          $("div.checkbox input").removeProp("checked");
          return "Password is required."; 
        }
      },
      confirmpassword: {
        required: "Confirm password is required.",
        equalTo: "Entry does not match password."
      },
      firstname: {
        required: "First name is required.",
        minlength: "First name must be no less than {0} character.",
        maxlength: "First name must be no more than {0} characters."
      },
      lastname: {
        required: "Last name is required.",
        minlength: "Last name must be no less than {0} character.",
        maxlength: "Last name must be no more than {0} characters."
      },
      company: {
        required: "Company is required.",
        minlength: "Company must be a no less than {0} character.",
        maxlength: "Company must be a no more than {0} characters."
      },
      title: {
        required: "Professional title is required.",
        minlength: "Professional title must be no less than {0} character.",
        maxlength: "Professional title must be no more than {0} characters."
      },
      securityAnswer: {
        required: "Security answer is required.",
        minlength: "Security answer must be a no less than {0} characters.",
        maxlength: "Security answer must be a no more than {0} characters."
      }                
    },

    submitHandler: function(form) {
      form.submit();
    }
  });
});

$(document).ready(function() {
  $("#Email1").focus();
  
  $("div.checkbox input").click(function( event ) {
    event.preventDefault();
  });

  $("#registerButton").click(function() {
	if ($("#_form").validate().form()) {
	  console.log("calling register()");
	  register();
	}
  });

  //$("#_form").validate().form();

  $("#_form input").change(function() {
    $("#_form").validate().form();
  });

});
