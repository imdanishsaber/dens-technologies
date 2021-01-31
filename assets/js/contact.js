jQuery(document).ready(function ($) {
    $('input#name').on('input', function () {
        $('#err-name').fadeOut('fast');
        $('.sent-message').fadeOut('fast');
    });
    $('input#email').on('input', function () {
        $('#err-email').fadeOut('fast');
        $('.sent-message').fadeOut('fast');
    });
    $('input#message').on('input', function () {
        $('#err-message').fadeOut('fast');
        $('.sent-message').fadeOut('fast');
    });
    $('#send').click(function () {
        $('.error').fadeOut('fast');
        $('.sent-message').fadeOut('fast');
        var error = false;

        var name = $('input#name').val();
        var email = $('input#email').val();
        var message = $('input#message').val();

        var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;

        if (name == "" || name == " ") {
            error = true;
            $('#err-name').fadeIn('fast');
        }
        if (email == "" || email == " ") {
            error = true;
            $('#err-email').fadeIn('fast');
        } else if (!email_compare.test(email)) {
            error = true;
            $('#err-emailvld').fadeIn('fast');
        }
        if (message == "" || message == " ") {
            error = true;
            $('#err-message').fadeIn('fast');
        }

        if (error == true) {
            return
        } else {
            setTimeout(function () {
                $('.sent-message').slideDown('fast');
                $('input#name').val("");
                $('input#lastName').val("");
                $('input#email').val("");
                $('input#phone').val("");
                $('input#company').val("");
                $('input#message').val("");
                $('textarea#message').val("");
            }, 1000)

            setTimeout(function () {
                $('.sent-message').slideUp('fast');
                $(".file").slideUp('fast');
            }, 5000)
            var data_string = $('#ajax-form').serialize();
            console.log(data_string)
            $.ajax({
                type: "POST",
                url: "../php/contact-mail.php",
                data: data_string,
                timeout: 60000,
                error: function (request, error) {
                    console.log("Unable to send email", error)
                },
                success: function () {
                    console.log("Email Sent Successfully")
                }
            });
            return false;
        }
    });
});