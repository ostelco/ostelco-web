//Scrolling to top for browsers not working 100% with vh units

window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

// window.addEventListener('load', function() {
//   console.log('All assets are loaded');
//   window.scrollTo(0, 0);
//   $('body').scrollTop();
// });
//Make the input form sticky on scroll for mobile

var myWidth = window.addEventListener('resize', function(e) {
  console.log(e.currentTarget.innerWidth);
  return e.currentTarget.innerWidth;
});

var sticky = document.getElementById('mc-embedded-subscribe-form');

var stickySibling = sticky.previousElementSibling;
var learnMore = document.querySelector('.learn-more-container');

window.addEventListener('scroll', function(e) {
  var offsets = stickySibling.getBoundingClientRect();
  var bottom = offsets.bottom;

  if (bottom <= 0) {
    sticky.style.position = 'fixed';
    sticky.style.top = '8px';
    sticky.style.backgroundColor = '#2f16e8';
    learnMore.style.paddingTop = '60px';
    if (window.screen.width >= 1224) {
      sticky.style.width = '366px';
    } else {
      sticky.style.width = '90%';
    }
  } else {
    sticky.style.position = 'initial';
    sticky.style.backgroundColor = '#2f16e8';
    learnMore.style.paddingTop = 'initial';
    if (window.screen.width >= 1224) {
      sticky.style.width = '366px';
    } else {
      sticky.style.width = '100%';
    }
  }
});

// function sendMail() {
//   $.ajax({
//     type: 'POST',
//     url: 'https://mandrillapp.com/api/1.0/messages/send.json',
//     data: {
//       key: 'jjfLjytUVDALbHntg_EFnA',
//       message: {
//         from_email: 'YOUR_SENDER@example.com',
//         to: [
//           {
//             email: 'henrik.holmlund@gmail.com',
//             name: 'YOUR_RECEIVER_NAME',
//             type: 'to'
//           }
//         ],
//         subject: 'title',
//         html: 'html can be used'
//       }
//     }
//   });
// }

var m = new mandrill.Mandrill('jjfLjytUVDALbHntg_EFnA'); // This will be public

function sendMailFromMandrill(email) {
  // var email = $('.email-input').val();

  var params = {
    template_name: 'welcome-email-version-2',
    template_content: [],

    message: {
      from_email: 'hello@oya.sg',
      to: [{ email: email }],
      subject: 'Hello from OYA',
      text: 'text in the message'
    }
  };

  m.messages.sendTemplate(
    params,
    function(res) {
      document.getElementById('success-message-custom').innerHTML =
        "We'll keep you posted! &#x1F60D;";
      console.log(res);
    },
    function(err) {
      console.log(err);
    }
  );
}

// function validate_input(email) {
//   var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
//   return re.test(email);
// }

$(document).ready(function() {
  // I only have one form on the page but you can be more specific if need be.
  var $form = $('form');

  if ($form.length > 0) {
    $('form input[type="submit"]').bind('click', function(event) {
      console.log('was clicked');
      if (event) event.preventDefault();
      // validate_input() is a validation function I wrote, you'll have to substitute this with your own.
      // if (validate_input($form)) {
      //
      // }
      register($form);
    });
  }
});

function register($form) {
  console.log('register is run');
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function(err) {
      alert(
        'Could not connect to the registration server. Please try again later.'
      );
    },
    success: function(data) {
      if (data.result != 'success') {
        if (data.msg.charAt(0) != 0) {
          $('.subscribe-result').css('color', '#ff387d');
          $('.subscribe-result').html(data.msg);
        } else {
          $('.subscribe-result').css('color', '#ff387d');
          $('.subscribe-result').html(data.msg.substring(4));
        }

        console.log(data.msg);
      } else {
        $('#success-message-custom').html("We'll keep you posted! &#x1F60D;");
        $('.subscribe-result').empty();
        var email = $('#mce-EMAIL').val();
        $('#mce-EMAIL').val('');
        sendMailFromMandrill(email);

        console.log(data.msg);
      }
    }
  });
}

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(':focus')) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

// $(document).ready(function() {
//   var $form = $('#mc-embedded-subscribe-form');
//   if ($form.length > 0) {
//     $('form input[type="submit"]').bind('click', function(event) {
//       if (event) event.preventDefault();
//       register($form);
//     });
//   }
// });
// // https://oya.us19.list-manage.com/subscribe/post-json?u=93e34c1d1b6305299f56d8b16&amp;id=1213aa640c&=c2'

// function register($form) {
//   $.ajax({
//     type: $form.attr('method'),
//     url: $form.attr('action'),
//     data: $form.serialize(),
//     cache: false,
//     dataType: 'jsonp',
//     contentType: 'application/json; charset=utf-8',
//     error: function(err) {
//       console.log()
//     },
//     success: function(data) {
//       $('#mc-embedded-subscribe').val('subscribe');
//       if (data.result === 'success') {
//         // Yeahhhh Success
//         console.log(data.msg);
//         $('#mce-EMAIL').css('borderColor', '#ffffff');
//         $('#subscribe-result').css('color', 'rgb(53, 114, 210)');
//         $('#subscribe-result').html(
//           '<p>Thank you for subscribing. We have sent you a confirmation email.</p>'
//         );
//         $('#mce-EMAIL').val('');
//       } else {
//         // Something went wrong, do something to notify the user.
//         console.log(data.msg);
//         $('#mce-EMAIL').css('borderColor', '#ff8282');
//         $('#subscribe-result').css('color', '#ff8282');
//         $('#subscribe-result').html('<p>' + data.msg.substring(4) + '</p>');
//       }
//     }
//   });
// }
