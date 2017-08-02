function showGoals(data) {
  $.each(data.list, function(i) {
    $('#_accordion-group').append($('<div class="accordion-heading" id="' + data.list[i].id + '"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseInnerOne"><h4>' + data.list[i].goal + '</h4></a><hr/></div>'));
  });
}

function loadGoals() {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/hit/services/goals/" + localStorage.getItem("ehr_id"),
    data: "",
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    success: 
      function(data) { 
        switch(data.code) {
          case 0: 
            showGoals(data);
            break;
          case 6: 
            alert(data.status);
            break;
        }
      }
  });
}

function loadGuide() {
  $('#_ehr').text(localStorage.getItem("ehr") + "*");
  loadGoals();
}

$(function () {
  $('.collapse').on('shown.bs.collapse', function() {
    $(this).parent().find(".glyphicon-triangle-right").removeClass("glyphicon-triangle-right").addClass("glyphicon-triangle-bottom");
  }).on('hidden.bs.collapse', function() {
    $(this).parent().find(".glyphicon-triangle-bottom").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-right");
  });

  $(function () {
    $('#accordion').on('shown.bs.collapse', function (e) {
      var offset = $('.panel.panel-step > .panel-collapse.steps-collapse.in').offset();
        if(offset) {
          $('html,body').animate({
            scrollTop: $('.panel-title.panel-step-title a').offset().top -160
          }, 500); 
        }
    }); 
  });
})