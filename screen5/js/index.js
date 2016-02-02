var icon = $('.icon'),
	widget = $('.widget'),
	steps = 10,
	dd = new Dragdealer('demo-simple-slider',{
		horizontal: true,
		steps: steps,
		speed: 0.3,
		loose: false,
		animationCallback: function(x, y) {
			var percent = parseInt(steps * (x*100), 10);
			icon.css({'background-position-y': (750 * x * 9/10 + 75) + 'px'});
		}
	}).setStep(5),
	openWidget = function(){
		setTimeout(function(){
			widget.addClass('active');
		}, 800);
		widget.addClass('loaded');
	};

	$(window).ready(function(){
		openWidget();
	});

