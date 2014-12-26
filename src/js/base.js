var isModern = function() { 
     return ('querySelector' in document && 'addEventListener' in window && 'localStorage' in window && 'sessionStorage' in window)
};

if (isModern()) {
	document.documentElement.classList.add('has-js');

	// smarter resize function
	function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

	// get angle value of transform: rotate http://css-tricks.com/get-value-of-css-rotation-through-javascript/
	var getRotationValue = function (tr) {
		if (tr.substring(0, 6) == 'matrix') {
			var values = tr.split('(')[1];
			values = values.split(')')[0];
    		values = values.split(',');

			var a = values[0],
				b = values[1],
				c = values[2],
				d = values[3];

			var radians = Math.atan2(b, a);
			if ( radians < 0 ) {
				radians += (2 * Math.PI);
			}
			return Math.round( radians * (180/Math.PI));
 		} else {
   			return 0;
 		}
	};

	// prepare game table and eventlistener
	function init() {
		var gameTable = '.game-table',
			rotater = '.js-rotater',
			direction,
			clockwise,
			randomNumber,
			randomRed;

		$(gameTable + ' div').each(function (i) {
			direction = '⟳ ';
			randomNumber = (Math.ceil(Math.floor((Math.random() * 360)) / 10) * 10);
	  		randomRed = randomColor({hue: 'red', format: 'rgb'});
	  		$(this).css({
				'width': $(gameTable).width() / 4,
	    		'height': $(gameTable).height() / 4,
	    		'color': randomRed
	  		}).animate({
	  			opacity: 1,
	  		}, 400 * (i + 1), function() {
  			}).html('<p data-amount="' + randomNumber + '">' + direction + ' <small>' + randomNumber + 'deg</small></p>');
		});

		$(gameTable + ' div p').click(function () {
			$(rotater).css('transform', 'rotate(' + ((getRotationValue($(rotater).css('transform'))) + parseFloat($(this).attr('data-amount'))) + 'deg)');
			$(rotater).html('<h1>' + getRotationValue($(rotater).css('transform')) + '</h1>');
		});
	}

	$(function() {
		init();
	});

	on_resize(function() {
		init();	
	});


} else {
	alert('Works on my machine!');
}