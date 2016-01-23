// TODO: make a moving meter
function meter(amount) {
	return '<div id="meter">\
			<span class="meter-amount" style="width:' + width + 'px;"></span>\
			<span class="meter-flavor">You are terrible.</span>\
		</div>';
}

function displayOffensiveMeter($target) {
	// Facebook's status textarea
	if ($target.hasClass('uiTextareaAutogrow')) {
		// Assuming it has two uiLists; the top bar and the one right below the input field
		$($('#pagelet_composer .uiList')[1]).append('<div id="meter">You are fucking disgusting.</div>');
	} else if ($target.hasClass('tweet-box')) {
		$('.TweetBox-mediaPicker').append('<div id="meter">You are fucking disgusting.</div>');
	} else {
		$target.parent().after('<div id="meter">You are fucking disgusting.</div>');
	}
}

$(document).ready(function() {
	// Fucking fuck twitter.
	$('#tweet-box-home-timeline').click(function(e) {
		displayOffensiveMeter($($(e.target).children()[0]));
	});

	$('textarea, input').keypress(function(e) {
		displayOffensiveMeter($(e.target));
	});
});

