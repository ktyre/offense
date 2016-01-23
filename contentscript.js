var offenses = {
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

var offense_keys = new Array();
var offense_values = new Array();
var offending_index;

// Intended as a hacky af way to remember what has already been detected/notified
// var offenders = new Array();

for (var key in offenses) {
  offense_keys.push(key);
  offense_values.push(offenses[key]);
}

// var matchInOffendedArray = function(string, expressions) {
//   var len = expressions.length,
//     i = 0;
//   for (; i < len; i++) {
//     if (string.match(expressions[i])) {
//       return true;
//     }
//   }
//   return false;
// };

var matchInArray = function(string, expressions) {
  var len = expressions.length,
    i = 0;
  for (; i < len; i++) {
    if (string.indexOf(expressions[i]) > -1) {
      // if(matchInOffendedArray(expressions[i], offenders)) { return false }
      // offenders.push(expressions[i]);
      offending_index = i;
      return true;
    }
  }
  return false;
};

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
		offenders = [];
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

var offended = function(offense) {
	return $($('#contentArea')).before('<div id="not-cool-breh"><p>' + offense + '</p></div>');
}

var hardFeelings = function(text) {
	if(matchInArray(text, offense_keys)) {
		return offended(offense_values[offending_index]);
	}
}

$(document).ready(function() {
	// Fucking fuck twitter.
	$('#tweet-box-home-timeline').click(function(e) {
		renderWidget($($(e.target).children()[0]));
	});

	$('textarea, input').keypress(function(e) {
		// Currently need to go one character beyond the string to be detected...
		// console.log($(e.target).val());
		hardFeelings($(e.target).val());
		renderWidget($(e.target));
	});
});

