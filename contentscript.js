const OFFENSES = {
  "gyp": "Roma",
  "Gypsies": "Roma",
  "feminazi": "Feminists, Nazis",
  "patriots": "Persons oppressed by governments",
  "Patriots": "Persons oppressed by Bill Bellichick",
  "climate change": "Gullible idiots who think it's not happening",
  "global warming": "Scientists who prefer 'climate change'",
  "N-word": "Free speech absolutionists",
  "abortion": "Fundamentalist Christians",
  "Fundamentalist Christians": "Chill Christians",
  "we should build a wall": "Looks like you might be going on a xenophobic rant",
  "I support the Bundys": "Looks like you might support treason if a white person does it",
  "Black Lives Matter": "White folks who don't matter",
  "All Lives Matter": "Not as many people as it should be",
  "furries": "Anthropomorphized fursuit enthusiasts",
  "hooves": "The single-hoofed",
  "tumblr person": "tumblr people",
  "- Donald Trump": "Looks like you might be quoting a bigoted jackass",
  "#FeeltheBern": "Republicans, Democrats who prefer to settle",
  "hashtag": "The aged, the uptight",
  "redneck": "hicks",
  "chicks": "Women, infant birds",
  "robot overlords": "Moderate robots",
  "augs": "Technologically enhanced humans",
  "cogs": "Technologically enhanced humans",
  "slickers": "People with access to oil",
  "breeder": "Straight people",
  "feeder": "People with access to food",
  "I just wish they wouldn't be so disruptive": "Looks like you might have forgotten how real protest works",
  "religious people are fucking stupid": "Looks like you might have just discovered atheism",
  "hobo": "Tramps",
  "why can't they just get jobs": "Looks like you might be an entitled baby boomer",
  "at your age I": "SHUT UP, OLD MAN, YOU HAD YOUR TIME",
  "glip-glops": "It's like the N-word and the C-word had a baby raised by all the bad words for Jews.",
  "show me a birth certificate": "Looks like you might be a huge racist",
  "I think I have a gluten sensitivity": "Looks like you don't have real problems",
  "They weren't offended but I told him it was problematic anyway": "Looks like you don't have real problems",
  "Postmates is late": "Looks like you don't have real problems",
  "men's rights": "Men who don't want to get yelled at by whichever women you clearly plan on offending",
  "fat": "Zaftig, Rotund, Juicy, Hefty, Fluffy persons",
  "I just bought a condo in the Mission": "Looks like you might have way too much money",
  "I just bought a condo in Manhattan": "Looks like you might have way too much money"
}

const YOU_TALK_TOO_MUCH_WORD_COUNT = 15;
const YOU_TALK_TOO_MUCH_STRING = 'Blah blah blah, shut the fuck up.';
const NO_OFFENSES_HEADER = 'None! Hurray!';

function findPotentialOffensiveExpressions(words) {
	const potentialOffensiveExpressions = [];
	for (var i = 0; i < words.length; i++) {
		for (var j = i + 1; j < words.length; j++) {
			potentialOffensiveExpressions.push(words.slice(i, j).join(' '));
		}
	}
	return potentialOffensiveExpressions;
}

// TODO: Come up with a way to measure how offensive you are (just by number of offensive things,
// does each thing have a score of how offensive it is? etc)
function displayMeter(amount) {
	const youAreNotTerribleGoodForYou = amount == 0 
		? '<span class="meter-flavor meter-flavor-good">You are not terrible! Good for you!</span>'
		: '<span class="meter-flavor">Offense.ly meter</span>';
	$('#container_of_container_of_offense').remove();
	return '<div id="container_of_container_of_offense">\
		<div id="container_of_offense">\
			<div class="meter-container">\
				<span class="meter-amount" style="width:' + amount + '%;"></span>\
				' + (amount == 100 
						? '<span class="meter-flavor">You are terrible.</span>' 
						: youAreNotTerribleGoodForYou) + '\
			</div>\
		</div>\
	</div>';
}

function renderMeter($target, amount) {
	amount = amount > 1 ? 1 : amount;
	// If there isn't any text in it, set amount to 0 and remove flavor
	if ($target.val() == '') {
		// TOFIX: I think keypress doesn't actually register backspace.
		offenders = [];
		$('#container_of_offense .meter-flavor').text('Hurray no one will be offended!');
	}
	const meter = displayMeter(amount*100);	
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

function renderTextBox($target, words) {
	debugger
}

var offended = function(meanWord, words) {
	if (meanWord && !currentOffenses[meanWord]) {
		$($('.not-cool-breh-offenses')).append('<p>\
			<span class="bad-word">' + meanWord + '</span>\
			&mdash;<span>' + OFFENSES[meanWord] + '</span>\
		</p>');
		currentOffenses[meanWord] = true;
	} else if (!meanWord && words.length > YOU_TALK_TOO_MUCH_WORD_COUNT && !currentOffenses['_blahblah']) {
		$($('.not-cool-breh-offenses')).append('<p>\
			<span class="bad-word">' + YOU_TALK_TOO_MUCH_STRING + '</span>\
		</p>');
		currentOffenses['_blahblah'] = true;
	}
}

var hardFeelings = function($target) {
	var displayString = '';
	var meterRatio = 0;
	const words = $target.val().split(' ');
	const expressions = findPotentialOffensiveExpressions(words);
	const fodderForOffense = words.concat(expressions);
	for (var i = 0; i < fodderForOffense.length; i++) {
		var potentialMeanWord = fodderForOffense[i].replace(/[.;'"?!:,]/, '');
		if (OFFENSES[potentialMeanWord]) {
			displayString += offended(potentialMeanWord, fodderForOffense);
			meterRatio = 1;
		} else {
			displayString += fodderForOffense[i];
		}

		console.log(meterRatio)
		if (i > YOU_TALK_TOO_MUCH_WORD_COUNT - 10 && meterRatio <= 1 && i < words.length) {
			meterRatio += 0.1;
		}
	}

	if (Object.keys(currentOffenses).length == 0) {
		offended(null, words);
	}
	renderMeter($target, meterRatio);
}

$(document).ready(function() {
	$($('#contentArea')).before('<div id="not-cool-breh">\
			<h1>Offenses</h1>\
			<div class="not-cool-breh-offenses">' + NO_OFFENSES_HEADER + '</div>\
	</div>');
	$('textarea, input').keyup(function(e) {
		currentOffenses = new Object();
		$('.not-cool-breh-offenses').empty();

		// Check hardfeelings on on spacebar, enter, or backspace
		hardFeelings($(e.target));
	});
});

