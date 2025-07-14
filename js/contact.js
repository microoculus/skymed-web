$(function () {

  $('#contact-form')[0].reset();

  var n = false,
    p = false,
    e = false,
    m = false,
    c = false;
  var validateActive = 1;
  activeButton(0);

  var formName = '#form_name:required',
    formPhone = '#form_phone:required',
    formEmail = '#form_email:required',
    formMassage = '#form_message:required',
    formCaptcha = '#captcha:required',
    nameValidate = '^[a-z A-Z]{3,16}$',
    phoneValidate = '^[0-9]{10,16}$',
    emailValidate = '^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$';


  $(formCaptcha).on("input blur", function () {
    var massage = $(this).parent().find('.form-feedback');
    if ($(this).val().length !== 0) {
      $(this).addClass('is-valid').removeClass('is-invalid');
      $(massage).text(" ");
      c = true;
    } else {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(massage).addClass('invalid-feedback').text("Captcha is required");
      c = false;
    }
    activeButton(validateActive);
  });

  $(formName).on("input blur", function () {
    var massage = $(this).parent().find('.form-feedback');
    if ($(this).val().length != 0) {
      if ($(this).val().match(nameValidate)) {
        $(this).addClass('is-valid').removeClass('is-invalid');
        $(massage).text(" ");
        n = true;
      } else {
        $(this).addClass('is-invalid').removeClass('is-valid');
        $(massage).addClass('invalid-feedback').text('Please provide a valid name');
        n = false;
      }
    } else {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(massage).addClass('invalid-feedback').text("Name is required");
      n = false;
    }
    activeButton(validateActive);
  });

  $(formPhone).on("input blur", function () {
    var massage = $(this).parent().find('.form-feedback');
    if ($(this).val().length != 0) {
      if ($(this).val().match(phoneValidate)) {
        $(this).addClass('is-valid').removeClass('is-invalid');
        $(massage).text(" ");
        p = true;
      } else {
        $(this).addClass('is-invalid').removeClass('is-valid');
        $(massage).addClass('invalid-feedback').text('Please provide a valid phone');
        p = false;
      }
    } else {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(massage).addClass('invalid-feedback').text("Phone is required");
      p = false;
    }
    activeButton(validateActive);
  });

  $(formEmail).on("input blur", function () {
    var massage = $(this).parent().find('.form-feedback');
    if ($(this).val().length != 0) {
      if ($(this).val().match(emailValidate)) {
        $(this).addClass('is-valid').removeClass('is-invalid');
        $(massage).text(" ");
        e = true;
      } else {
        $(this).addClass('is-invalid').removeClass('is-valid');
        $(massage).addClass('invalid-feedback').text('Please provide a valid email');
        e = false;
      }
    } else {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(massage).addClass('invalid-feedback').text("Email is required");
      e = false;
    }
    activeButton(validateActive);
  });

  $(formMassage).on("input blur", function () {
    var massage = $(this).parent().find('.form-feedback');
    if ($(this).val().length != 0) {
      $(this).addClass('is-valid').removeClass('is-invalid');
      $(massage).text(" ");
      m = true;
    } else {
      $(this).addClass('is-invalid').removeClass('is-valid');
      $(massage).addClass('invalid-feedback').text("Massage is required");
      m = false;
    }
    activeButton(validateActive);
  });

  function activeButton(a) {
    if ((n && p && e && c == true) && a == 1) {
      $('#contact-form button[type=submit]').removeAttr('disabled');
    } else {
      $('#contact-form button[type=submit]').attr('disabled', true);
    }
  }

  $('#reloadCaptcha').on('click', function () {
    $('#captchaImage').attr('src', 'captcha/captcha.php?' + Date.now());
  });

  $('#contact-form').submit(function (event) {
    event.preventDefault();
    $('#contact-form button[type=submit]').attr("disabled", true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
    $('#contact-form .form-control').attr('readonly', true);
    validateActive = 0;

    var formData = $(this).serialize();  // Serialize form data
    // Add CAPTCHA value to form data
    formData += '&captcha=' + $('#captcha').val();

    $.ajax({
      url: 'contact.php',
      type: 'post',
      data: formData,
      dataType: 'json',
      success: function (data) {

        var messageAlert = data.type;
        var messageText = data.message;

        var alertBox = '<div class="form-message-wrapper"><div class="form-message message-' + messageAlert + '"><div class="icon"></div><h5>' + messageText + '</h5><button type="button" class="btn btn-primary message-close">OK</button></div></div>';

        if (messageAlert && messageText) {
          $('#contact-form .form-control').removeClass('is-valid');
          $('#contact-form button[type=submit]').attr("disabled", false).html('Submit');
          $('#contact-form .form-control').attr('readonly', false);
          $('#contact-form button[type=submit]').prop('disabled', true);
          $('body').append(alertBox);
          $('#contact-form')[0].reset();
          $('#captchaImage').attr('src', 'captcha/captcha.php?' + Date.now());
          validateActive = 1;
          n = false, p = false, e = false, m = false;
        };
        messageClose();
        setTimeout(function () {
          $('.form-message-wrapper').remove();
        }, 8000);
      }
    });

  });

  

});

function messageClose() {
  $('.message-close').on('click', function () {
    $('.form-message-wrapper').remove();
  });
}
