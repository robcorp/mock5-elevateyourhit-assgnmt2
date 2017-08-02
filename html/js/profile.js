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

function showProfile(data) {
  $('#_email').val(data.list[0].email);
  $('#_salutation').val(data.list[0].salutation);
  $('#_firstname').val(data.list[0].firstname);
  $('#_lastname').val(data.list[0].lastname);
  $('#_company').val(data.list[0].company);
  $('#_title').val(data.list[0].title);
  $('#_securityquestions').val(data.list[0].securityID);
  $('#_securityanswer').val(data.list[0].securityAnswer);
  
  for (var i=0; i<data.list[0].ehrs.length; i++) {
    $('#' + data.list[0].ehrs[i].id).attr('checked', true);
  }
}

function loadProfile() {
  if (localStorage.getItem("token") != "") {
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

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/hit/services/profile/" + localStorage.getItem("id"),
      data: "",
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      success: showProfile
    });
  }
  else {
    window.location.href = "http://localhost:8080/hit/login.html";
    return false;
  }
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

function saveProfile() {
  var d = registerData();
  
  $.ajax({
    type: "PUT",
    url: "http://localhost:8080/hit/services/profile/" + localStorage.getItem("id") + "/save",
    data: d,
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: 
      function(data) { 
        switch(data.code) {
          case 0: 
	    alert("Profile Updated");
            break;
          case 2: 
            alert(data.status);
            break;
        }
      }
  });
}