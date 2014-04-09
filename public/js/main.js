// Validation
$.validator.addMethod("valueNotEquals", function (value, element, arg) {
  return arg !== value;
}, "Value must not equal arg.");

$.validator.addMethod("date", function (date, element) {
  return this.optional(element) || date.match(/^\d{4}-((0\d)|(1[012]))-(([012]\d)|3[01])$/);
}, "Date as YYYY-MM-DD");

$("#contributionForm").validate({
  rules: {
    "date": {
      date: true
    },
    "description": {
      minlength: 5
    },
    "teamname": {
      valueNotEquals: "default"
    },
    "databucket": {
      valueNotEquals: "default"
    }
  },
  messages: {
    "teamname": {
      valueNotEquals: "Which team is this for?"
    },
    "databucket": {
      valueNotEquals: "Please select a bucket"
    }
  }
});

// Helpers
function dateToISOString(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2); // 0 index
  var day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

$("#btnToday").click(function (event) {
  event.preventDefault();
  var today = new Date();
  var s = dateToISOString(today);
  $("#date").val(s);
});

// quick link
$("#btnQuicklink").click(function (event) {
  event.preventDefault();
  var team = encodeURI($("#teamname").val());
  var type = encodeURI($("#databucket").val());
  var description = encodeURI($("#description").val());
  var date = encodeURI($("#date").val());
  var quickLink = location.protocol + '//' + location.hostname + '/log-em?team=' +team+ '&type=' +type+ '&description=' + description +'&date=' + date;
  $('#linkToCopy').val(quickLink);
  $('#linkModal').modal();
});

$("#linkToCopy").on("click", function () {
   $(this).select();
});

// Tooltop
$('.tooltipActive').tooltip();

// Datepicker
$('.datePickerActive').datepicker({
  format: "yyyy-mm-dd",
  autoclose: true,
  todayHighlight: true
});

// remember a users team for convenience
$("#teamname").change(function () {
  $.cookie('team', $(this).val(), {
    expires: 30
  });
});

$(document).ready(function () {
  if ($.cookie('team')) {
    if ($("#teamname").val() === "default") {
      $("#teamname").val($.cookie('team'));
    }
  }
});
