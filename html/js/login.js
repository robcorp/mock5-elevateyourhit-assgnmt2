function registerData() {
  var a = $('#_form').serializeArray();

  var j = {};
  $.each(a, function(i,v) {
    j[v.name] = v.value;
  });

  return JSON.stringify(j);
}

function login() {
  var d = registerData();
  
  $.ajax({
    async: false,
    type: "POST",
    url: "http://localhost:8080/hit/services/login",
    data: d,
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: 
      function(data) { 
        switch(data.code) {
          case 0: 
            localStorage.setItem("id", data.list[0].id);
            localStorage.setItem("token", data.list[0].token);
	    window.location.href = "http://localhost:8080/hit/welcome.html";
            break;
          case 6: 
            alert(data.status);
            break;
        }
      }
  });
}