var isModern = function() { 
     return ('querySelector' in document && 'addEventListener' in window && 'localStorage' in window && 'sessionStorage' in window)
};

if (isModern()) {
	document.documentElement.classList.add('has-js');

	function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

	function init() {
		// prepare game table
		var randomRed;
		$('.game-table div').each(function (i) {
	  		randomRed = randomColor({hue: 'red', format: 'rgb'});
	  		$(this).css({
				'width': $('.game-table').width() / 4,
	    		'height': $('.game-table').height() / 4
	  		}).animate({
	  			opacity: 1,
	  		}, 400 * (i + 1), function() {
  			}).html('<p>' + (i+1) + '</p>');
		});
	}

	$(function() {
		init();
	});

	on_resize(function() {
		init();	
	});


} else {
	alert('Works on my machine, but not on yours. HAHAHA');
}