$(function() {
  $.validator.setDefaults({
    debug: true,
    success: "valid"
  });

  $("#_form").validate({
    errorClass: "errorform",

    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },

    onfocusout: false,

    rules: { 
      username: { 
        required: true,
        email: true,
        maxlength: 254
      },
      password: {
        required: true,
      }
    },

    messages: {
      username: { 
        required: "E-mail is required.", 
        maxlength: "E-mail must be no more than {0} characters."
      },
      password: {
        required: "Password is required.",
      }
    },

    submitHandler: function(form) {
      form.submit();
    }
  });
});

$(document).ready(function() {
  $("#exampleInputEmail1").focus();

  $("#loginButton").click(function() {
	if ($("#_form").validate().form()) {
	  login();
	}
  });

  $("#exampleInputEmail1").change(function() {
    $("#_form").validate().form();
  });

  $("#exampleInputPassword1").change(function() {
    $("#_form").validate().form();
  });
});
