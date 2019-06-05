$('document').ready(function(){
  $('#buttonLog').on('click', function(){
     $('.modal').addClass('modal-is-active');
     $('.container').addClass('container-is-blurred');
  });
  
    $('.modal').on('click', function(){
        if($('.modal').hasClass('modal-is-active'))
        {
         $('.modal').removeClass('modal-is-active');
         $('.container').removeClass('container-is-blurred');
        }
    });    
});