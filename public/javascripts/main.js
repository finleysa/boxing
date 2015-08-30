(function(){

  $(document).ready(initialize);

  function initialize(){
      $('#registration-form').submit(showSpinner);
      $('input[type=radio][name="location"]').change(locationChosen);
      $('#ghschedule').hide();
      $('#csschedule').hide();
    }

  function showSpinner(){
    $('#submit').addClass('hide');
    $('#spinner').removeClass('hide');
  }

  function locationChosen(){
    if($('#coolsprings').is(':checked')){
      $('#ghschedule').hide();
      $('#csschedule').show();
    }
    else if($('#greenhills').is(':checked')){
      $('#ghschedule').show();
      $('#csschedule').hide();
    }
  }
})();
