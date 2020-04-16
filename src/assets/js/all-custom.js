// JavaScript Document





$(window).scroll(function(){

  var sticky = $('header'),

      scroll = $(window).scrollTop();

  if (scroll >= 50){

	   sticky.addClass('fixed');

  }

  else{

	   sticky.removeClass('fixed');

  }

});

$(window).load(function() {

	$(".scroll-down").click(function(e) {

		e.preventDefault();

		$('html, body').animate({ scrollTop: $(".how-it-work").offset().top },800, 'linear');

	});

 });



$(document).ready(function(){
    $('.hamber-menu').click( function(){
    
    	$(this).toggleClass('up');
    
    	$('.main-menu').toggleClass('open');	
    
    	$('nav').toggleClass('open').fadeToggle(800);
    
    	$('body').toggleClass('over');
    
    });


});


$(window).resize(function(){
if ($(window).width() >= 800 ){
        $('nav').show();
    }
else {
	$('nav').hide();
}
 });








$(window).scroll(function(){
	if ($(this).scrollTop() > 200) {
		$('.scroll-top').fadeIn();
	} else {
		$('.scroll-top').fadeOut();
	}
}); 

$('.scroll-top').click(function(){
	$("html, body").animate({ scrollTop: 0 }, 1000);
	return false;
});





$('.owl-feature').owlCarousel({

	center: true,

    loop:true,

	autoPlay:true,

	autoPlaySpeed: 1000,

	autoPlayTimeout: 1000,

    margin:30,

    nav:true,

	dots:false,

	responsive:{

		0:{ items:1, margin:0,},

		 510:{ items:2, margin:20,},

		1000:{ items:4},

    }

});

checkClasses();
    $('.owl-feature').on('translated.owl.carousel', function(event) {
        checkClasses();
    });

    function checkClasses(){
        var total = $('.owl-feature .owl-stage .owl-item.active').length;

        $('.owl-feature .owl-stage .owl-item').removeClass('firstActiveItem lastActiveItem'); 

        $('.owl-feature .owl-stage .owl-item.active').each(function(index){ 
            if (index === 0) {
                $(this).addClass('firstActiveItem');
            }
            if (index === total - 1 && total>1) {
                $(this).addClass('lastActiveItem');
            }
        });
    }



