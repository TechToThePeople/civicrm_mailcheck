(function($){

  var domains = ['hotmail.com', 'gmail.com', 'aol.com'];
  var $msgbox = $('<div id="civicrm_mailcheck-msg">Did you mean <a href="#"></a>?</div>');
  var $msgbox_link = $msgbox.find('a');
  console.log($msgbox.html());
  var suggestion_full = null;
  $msgbox_link.click(function(){
    if (input_with_msgbox && suggestion_full) {
      $(input_with_msgbox).val(suggestion_full);
      $msgbox.remove();
      input_with_msgbox = null;
      suggestion_full = null;
    }
  });
  var input_with_msgbox = null;

  Drupal.behaviors.civicrm_mailcheck = {
    attach: function(context, settings) {
      console.log('attach', settings);
      for (var k in settings.civicrm_mailcheck.email_fields) {
        var $field = $('#' + k);
        console.log($field);
        $('#' + k).blur(function() {
          console.log(this);
          $(this).mailcheck({
            // domains: domains,   // optional
            suggested: function(element, suggestion) {
              // callback code
              console.log($(element).val(), suggestion, suggestion.full);
              $msgbox_link.html(suggestion.address + '@<strong>' + suggestion.domain + '</strong>');
              $(element).after($msgbox);
              input_with_msgbox = element[0];
              suggestion_full = suggestion.full;
            },
            empty: function(element) {
              console.log('empty', element[0], input_with_msgbox);
              // callback code
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
