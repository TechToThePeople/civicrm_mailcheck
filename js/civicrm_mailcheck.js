(function($){

  // var domains = ['hotmail.com', 'gmail.com', 'aol.com'];
  var $msgbox = $('<div id="civicrm_mailcheck-msg">Did you mean <a href="#civicrm_mailcheck-msg"></a>?</div>');
  var $msgbox_link = $msgbox.find('a');
  var suggestion_full = null;
  $msgbox_link.click(function(){
    if (input_with_msgbox && suggestion_full) {
      $(input_with_msgbox).val(suggestion_full).focus();
      $msgbox.remove();
      input_with_msgbox = null;
      suggestion_full = null;
      return false;
    }
  });
  var input_with_msgbox = null;

  Drupal.behaviors.civicrm_mailcheck = {
    attach: function(context, settings) {
      for (var k in settings.civicrm_mailcheck.email_fields) {
        var selector = '#' + k.replace('][', '_').replace(']', '').replace('[', '_');
        $(selector, context).blur(function() {
          if ($(this).attr('name') != k) {
            return;
          }
          $(this).mailcheck({
            // domains: domains,   // optional
            suggested: function(element, suggestion) {
              $msgbox_link.html(suggestion.address + '@<strong>' + suggestion.domain + '</strong>');
              $(element).after($msgbox);
              input_with_msgbox = element[0];
              suggestion_full = suggestion.full;
            },
            empty: function(element) {
              if (input_with_msgbox == element[0]) {
                $msgbox.remove();
                input_with_msgbox = null;
                suggestion_full = null;
              }
            }
          });
        });
      }
    }
  };
})(jQuery);
