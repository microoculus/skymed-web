$(function() {

  $('#registration-form')[0].reset();

$('#registration-form').submit(function(event) {

	$('#registration-form .btn').attr("disabled", true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
    $('#registration-form .form-control').attr('readonly', true);
	
    event.preventDefault();
	
    $.ajax({
    url: 'registration.php',
    type: 'post',
    data: $('#registration-form').serialize(),
    dataType: 'json',
    success: function(data) {
        if (data && data.type && data.message) {
            var messageAlert = data.type;
            var messageText = data.message;

            var alertBox = '<div class="alert alert-' + messageAlert + ' alert-dismissible fade show" role="alert">' + messageText + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

            if (messageAlert && messageText) {
                $('#registration-form').find('.messages').html(alertBox);
                $('#registration-form')[0].reset();
            }

            setTimeout(function() {
                $('#registration-form .messages > div').remove();
            }, 3000);
        } else {
            console.error('Invalid response:', data);
            // You can display a generic error message here if needed
        }
    },
    error: function(xhr, status, error) {
        console.error('AJAX error:', status, error);
        // You can also display a generic error message if AJAX fails
    }
});


  });
});