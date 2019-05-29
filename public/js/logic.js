$(document).ready(function() {

  $(".button-collapse").sideNav();

  $(document).ready(function(){
    $('.parallax').parallax();
  });

  $('.contact-icons-div').mouseover(function() {
    $('.hidden-icons-div').addClass('shown-icons-div')
    $('#linkedin-icon').addClass('linkedin-icon')
    $('#github-icon').addClass('github-icon')
    $('#stackoverflow-icon').addClass('stackoverflow-icon')
  })

  $('.contact-icons-div').mouseleave(function() {
    $('.hidden-icons-div').removeClass('shown-icons-div')
  })
})
