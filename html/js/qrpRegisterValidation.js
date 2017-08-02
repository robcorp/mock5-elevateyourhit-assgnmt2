$(function() {
  $.validator.addMethod("uppercase", function(value, element) {
    return this.optional(element) || /([A-Z])/.test(value);
  }, "Pending");

  $.validator.addMethod("lowercase", function(value, element) {
    return this.optional(element) || /([a-z])/.test(value);
  }, "Pending");
  
  $.validator.addMethod("number", function(value, element) {
      return this.optional(element) || /([0-9])/.test(value);
  }, "Pending");
  
  $.validator.addMethod("special", function(value, element) {
      return this.optional(element) || /([!@#$%^&*?_/])/.test(value);
  }, "Pending");  
  
  $.validator.addMethod("zip5", function(value, element) {
      return this.optional(element) || /^[0-9]*$/.test(value);
  }, "Pending");
  
  $("#register").validate({
    errorPlacement: function(error, element) {
      if (element.attr("name") == "firstname" ||
          element.attr("name") == "lastname") {
          error.insertBefore($("#nameerrors"));
      } else if (
          element.attr("name") == "city" ||
          element.attr("name") == "selectedState" ||
          element.attr("name") == "ZIP") {
          error.insertBefore($("#addresserrors"));
      } else {
          error.insertAfter(element);
      }
    },
    rules: { 
      username: { 
        required: true, 
        minlength: 6,
        maxlength: 16 
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 16,
        uppercase: true,
        lowercase: true,
        number: true,
        special: true
      },
      confirmpassword: {
        required: true,
        equalTo: "#password"
      },
      title: {
        required: true,
        minlength: 1,
        maxlength: 64
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
      address1: {
        required: true,
        minlength: 1,
        maxlength: 64
      },
      address2: {
        required: false,
        minlength: 1,
        maxlength: 64
      },
      address3: {
        required: false,
        minlength: 1,
        maxlength: 64
      },
      city: {
        required: true,
        minlength: 1,
        maxlength: 64
      },
      selectedState: {
        required: true
      },
      ZIP: {
        required: true,
        minlength: 5,
        maxlength: 5,
        zip5: true
      },
      securityA: {
        required: true,
        minlength: 1,
        maxlength: 64
      }
    },
    messages: { 
      username: { 
        required: "Username is required.", 
        minlength: "Username must be minimum {0} characters.",
        maxlength: "Username must be maximum {0} characters."
      },
      password: {
        required: "Password is required.",
        minlength: "Password must be minimum {0} characters.",
        maxlength: "Password must be maximum {0} characters.",
        uppercase: "Password must contain at least one uppercase character.",
        lowercase: "Password must contain at least one lowercase character.",
        number: "Password must contain at least one number.",
        special: "Password must contain ast least one special character !@#$%^&*?_/"
      },
      confirmpassword: {
        required: "Confirm password is required.",
	equalTo: "Entry does not match password."
      },
      title: {
        required: "Professional title is required.",
        minlength: "Professional title must be minimum {0} character.",
        maxlength: "Professional title must be maximum {0} characters."
      },
      firstname: {
        required: "First name is required.",
        minlength: "First name must be minimum {0} character.",
        maxlength: "First name must be maximum {0} characters."
      },
      lastname: {
        required: "Last name is required.",
        minlength: "Last name must be minimum {0} character.",
        maxlength: "Last name must be maximum {0} characters."
      },
      address1: {
        required: "Address line one is required.",
        minlength: "Address line one must be minimum {0} character.",
        maxlength: "Address line one must be maximum {0} characters."
      },
      address2: {
        minlength: "Address line two must be minimum {0} character.",
        maxlength: "Address line two must be maximum {0} characters."
      },
      address3: {
        minlength: "Address line three must be minimum {0} character.",
        maxlength: "Address line three must be maximum {0} characters."
      },
      selectedState: {
        required: "State is required."
      },
      city: {
        required: "City is required.",
        minlength: "City must be a minimum {0} character.",
        maxlength: "City must be a maximum {0} characters."
      },
      ZIP: {
        required: "Zip is required.",
        minlength: "Zip must be a minimum {0} numbers.",
        maxlength: "Zip must be a maximum {0} numbers.",
        zip5: "Zip must only include numbers."
      },
      securityA: {
        required: "Security answer is required.",
        minlength: "Security answer must be a minimum {0} character.",
        maxlength: "Security answer must be a maximum {0} characters."
      }                
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});

function toggle(id) {
  $("#" + id).toggle();
  
  if ($("#" + id).is(":visible")) {
    $("#rules-image").attr("src","images/up.png");
  } else {
    $("#rules-image").attr("src","images/down.png");
  }  
};

$(document).ready(function() {
  $("#username").focus();
  $("#register").validate().form();
  toggle('rules');

  $("#firstname").change(function() {
    $("#register").validate().form();
  });
  $("#lastname").change(function() {
    $("#register").validate().form();
  });
});
