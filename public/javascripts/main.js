(function(){

  $(document).ready(initialize);
  $(document).foundation();

  function initialize(){
      $('#registration-form').submit(showSpinner)
    }

  function showSpinner(){
    $('#submit').addClass('hide');
    $('#spinner').removeClass('hide');
  }

})();
