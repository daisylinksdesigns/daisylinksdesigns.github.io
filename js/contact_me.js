/*global $*/
// Contact Form Scripts
$(function() {

    $.ajax({//wakeup service
        type: 'GET',
        url: "https://email-webservice.onrender.com/"
    });


    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    function resetContactPageForm(){
       //$("#contactPageForm").trigger("reset");
        $('button[type="button"]', $form).each(function () {
            $btn = $(this);
            label = $btn.prop('orig_label');
            if (label) {
                $btn.prop('type', 'submit');
                $btn.text(label);
                $btn.prop('orig_label', '');
            }
        });
    }

    $('#contactPageForm').submit(function (e) {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function () {
            $btn = $(this);
            $btn.prop('type', 'button');
            $btn.prop('orig_label', $btn.text());
            $btn.text('Sending ...');
        });

        var name = $("input#name").val();
        var email = $("input#email").val();
        var phone = $("input#phone").val();
        var message = $("textarea#message").val();

        var emailData = {
            email: "contact@daisylinksdesigns.co.uk",
            replyTo: email,
            name: name,
            message: message,
            phone: phone,
            subject: "Contact from " + name + " via daisylinksdesigns.co.uk",
            form_api_token: "wzx70479xl1q"
        }
        $.ajax({
            //url: "https://email-webservice.herokuapp.com/email/addemail",
            url: "https://email-webservice.onrender.com/email/addemail",
            type: "POST",
            //dataType: "jsonp",
            data: emailData,
            cache: false,
            success: function() {
                // Success message
                $("#success").html("<div class='alert alert-success'>");
                $("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $("#success > .alert-success")
                    .append("<strong>Your message has been sent. </strong>");
                $("#success > .alert-success")
                    .append("</div>");

                //clear all fields
                resetContactPageForm();
            },
            error: function() {
                // Fail message
                $("#success").html("<div class='alert alert-danger'>");
                $("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $("#success > .alert-danger").append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                $("#success > .alert-danger").append("</div>");
                //clear all fields
                resetContactPageForm();
                
            }
        });

    });
    

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$("#name").focus(function() {
    $("#success").html("");
});
