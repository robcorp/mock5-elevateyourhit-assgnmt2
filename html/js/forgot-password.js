function registerData(f) {
  var a = $('#' + f).serializeArray();

  var j = {};
  $.each(a, function(i,v) {
    j[v.name] = v.value;
  });

  return JSON.stringify(j);
}

function securityQuestion(f) {
  var d = registerData(f);
  
  $.ajax({
    async: false,
    type: "POST",
    url: "http://localhost:8080/hit/services/password/reset/question",
    data: d,
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: 
      function(data) { 
        switch(data.code) {
          case 0: 
            localStorage.setItem("id", data.list[0].profileID);
            $('#_question').html(data.list[0].question);
            $("#_step1").hide();
	    $("#_step2").show();
            break;
          case 4: 
            alert(data.status);
            break;
        }
      }
  });
}

function securityAnswer(f) {
  var d = registerData(f);
  var u = "http://localhost:8080/hit/services/password/reset/" + localStorage.getItem("id"); 
  
  $.ajax({
    async: false,
    type: "PUT",
    url: u,
    data: d,
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: 
      function(data) { 
        switch(data.code) {
          case 0: 
            $("#_step2").hide();
	    $("#_step3").show();
            $('#_tempPW').html("<strong>" + data.list[0].password + "</strong>");
            break;
          case 5: 
            alert(data.status);
            break;
        }
      }
  });
}

function hidePW() {
  $("#_step2").hide();
  $("#_step3").hide();
}