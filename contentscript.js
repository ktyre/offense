function displayOffensiveMeter($target) {
	$('#meter').remove();
	$target.parent().after('<p id="meter">You are fucking disgusting.</p>');
}

$(document).ready(function() {
	$('#tweet-box-home-timeline').click(function(e) {
		displayOffensiveMeter($($(e.target).children()[0]));
	});

	$('textarea, input').keypress(function(e) {
		displayOffensiveMeter($(e.target));
	});
});

