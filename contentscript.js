// TODO: Come up with a way to measure how offensive you are (just by number of offensive things,
// does each thing have a score of how offensive it is? etc)
function displayMeter(amount) {
	$('#container_of_container_of_offense').remove();
	return '<div id="container_of_container_of_offense">\
		<div id="container_of_offense">\
			<div class="meter-container">\
				<span class="meter-amount" style="width:' + amount + '%;"></span>\
				<span class="meter-flavor">You are terrible.</span>\
			</div>\
		</div>\
	</div>';
}

function renderWidget($target) {
	var amount = Math.random()*100;
	// If there isn't any text in it, set amount to 0 and remove flavor
	if ($target.val() == '') {
		// TOFIX: I think keypress doesn't actually register backspace.
		amount = 0;
		$('#container_of_offense .meter-flavor').text('Hurray no one will be offended!');
	}
	const meter = displayMeter(Math.random()*100);	
	// Facebook's status textarea
	if ($target.hasClass('uiTextareaAutogrow')) {
		// Assuming it has two uiLists; the top bar and the one right below the input field
		$($('#pagelet_composer .uiList')[1]).append(meter);
	} else if ($target.hasClass('tweet-box')) {
		$('.TweetBox-mediaPicker').append(meter);
	} else {
		$target.parent().after(meter);
	}
}

var hardFeelings = function(text) {
	if(text.indexOf("chick") > -1) {
		console.log("detected chick")
		return offended("hibbidigibbity")
	}
}

var offended = function(offense) {
	return $("#container_of_container_of_offense").html('<div id="not-cool-breh><p>"' + offense + '</p></div>');
}

$(document).ready(function() {
	// Fucking fuck twitter.
	$('#tweet-box-home-timeline').click(function(e) {
		renderWidget($($(e.target).children()[0]));
	});

	$('textarea, input').keypress(function(e) {
		// Currently need to go one character beyond the string to be detected...
		console.log($(e.target).val());
		hardFeelings($(e.target).val());
		renderWidget($(e.target));
	});
});

