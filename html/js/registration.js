function showSecurityQuestions(data) {
  $.each(data.list, function(i) {
    $('#_securityquestions').append($('<option>', { value: data.list[i].id, text: data.list[i].question }));
  });
}

function showEHRs(data) {
  $.each(data.list, function(i) {
    $('#_ehrs').append($('<div class="checkbox"><label><input type="checkbox" id="' + data.list[i].id + '" value="' + data.list[i].name + '">&nbsp' + data.list[i].name + '*</label></div>'));
  });
}

function populate_lu() {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/hit/services/securityquestions",
    data: "",
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: showSecurityQuestions
  });

  $.ajax({
    type: "GET",
    url: "http://localhost:8080/hit/services/ehrs",
    data: "",
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: showEHRs
  });
}

function redirect() {
  window.location.href = "http://localhost:8080/hit/welcome.html";
  return false;
}

function registerData() {
  var a = $('#_form').serializeArray();
  
  var ehr = [];
  $('input[type=checkbox]').each(
    function() {
      if (this.checked) {
        ehr.push({ id: parseInt(this.id), name: this.value });
      }
    }
  );
  a.push({name: 'ehrs', value: ehr });
  
  var j = {};
  $.each(a, function(i,v) {
    j[v.name] = v.value;
  });

  return JSON.stringify(j);
}

function register() {
  var d = registerData();
  
  $.ajax({
    async: false,
    type: "POST",
    url: "http://localhost:8080/hit/services/registration/save",
    data: d,
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: 
      function(data) { 
        switch(data.code) {
          case 0: 
            localStorage.setItem("id", data.list[0].id);
            localStorage.setItem("token", data.list[0].token);
            redirect();
            break;
          case 2: 
            alert(data.status);
            break;
        }
      }
  });
}

function showProfileEHRs(data) {
  $('#_ehrs').append($('<option selected disabled>Select EHR</option>'));
  
  $.each(data.list, function(i) {
    $('#_ehrs').append($('<option value=' + data.list[i].id + '>' + data.list[i].name + '</option>'));
  });
}

function populate_ehr() {
  var u = 'http://localhost:8080/hit/services/ehrs/' + localStorage.getItem("id");
  
  $.ajax({
    type: "GET",
    url: u,
    data: "",
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: showProfileEHRs 
  });
}

function changeEHR() {
  var v = $('#_ehrs').find(":selected").text();
  
  $('#_ehr1').html(v);
  $('#_ehr2').html(v);
  localStorage.setItem("ehr", v);
  
  $('#_ehrinfo').show();
}