(function(){

  $(document).ready(initialize);

  function initialize(){
      $('#registration-form').submit(showSpinner)
    }

  function showSpinner(){
    $('#submit').addClass('hide');
    $('#spinner').removeClass('hide');
  }

})();
