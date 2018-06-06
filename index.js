import Autocomplete from './Autocomplete';
import Autocomplete2 from './Autocomplete2';
import usStates from './us-states';
import './main.css';
import $ from "jquery";


// US States
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

// global variables for state and github forms + mouseover funcationality
var i = -1;	 // state
var j = -1;  // github (wasn't used...would be used to up/down arrow navigation similar to states form)
var disableArrow = false;

// state dropdown
new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});

// Github dropdown
new Autocomplete2(document.getElementById('gh-user'), {
	onSelect: (ghUserId) => {
		console.log('selected github user id:', ghUserId);
		},
});

// activate GET request with Github API after typing into field
$(".gh-users-group input").keyup(function(e){
	var username = $('#gh-user input').val();
	var request = new XMLHttpRequest();
	var users;

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'https://api.github.com/search/users?q=' + username + '&per_page=10', true);

	request.onload = function () {
		// Begin accessing JSON data here
		var data2 = JSON.parse(this.response)['items'];

		// create users object
		if (request.status >= 200 && request.status < 400) {
			var users = data2.map(user => ({
				text: user.login,
				value: user.id
			}));

			// iterate through users object and create dropdown menu
			$.each( users, function( k, v ) {
			  $("#gh-user .results").append('<li class="gh-result result">' + v['text'] + '</li>');
			});

			// respond to a clicked list item in dropdown
			$( ".gh-result" ).click(function() {
			  var ghSelected = ($(this).text());

			  // once dropdown item was clicked, search current object to the github id value	
			  $.each(users, function(x,y){
	    		if (ghSelected == y['text']){
	    			console.log('selected github user id:', y['value']);
		    		};
		    	});	
			});
		}

		// handle common errors with the GET request
		else {
			console.log('error');
		}
	}

	// Send request
	request.send();
});



// up/down navigation functionality for the state dropdown
$(".state-group input").keydown(function(e){
	var key = e.keyCode;
	var state = $('.result');
	var maxResults = state.length

	if ( key != 40 && key != 38 && key != 13 ) {
		$(state).removeClass('selected');
		i = -1;
		return;
	}
	e.preventDefault();
	switch(key){
		case 13: // enter key
			$.each(data, function(x,v){
    		if ($(state[i]).text() == v['text']){
    			console.log('selected state:', v['value']);
	    		};
	    	});
	    	break;	
		case 38: // up arrow
			if (disableArrow == false){
				$(state[i]).removeClass('selected');
		    	$(state[i-1]).addClass('selected');
		    	if (i > -1){
		    		i--;
		    	};
		    	break;
			};
		case 40: // down arrow
			if (disableArrow == false && maxResults > (i+1)){
				$(state[i]).removeClass('selected');
		    	$(state[i+1]).addClass('selected');
		    	i++;
		    	break;
			};
	    default:
	    	break;	
	}
});

// used to track when the mouse is hovering over the state dropdown form to take over primary navigation functionality
// code originally taken and modified from stack overflow (https://stackoverflow.com/questions/1273566/how-do-i-check-if-the-mouse-is-over-an-element-in-jquery?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)
$("#state .results").mouseenter(function(){
    clearTimeout($(this).data('timeoutId'));
    $(this).find(".tooltip").fadeIn("slow");
    $('.state-group .result').removeClass('selected');
    i = -1;
    disableArrow = true;
}).mouseleave(function(){
    var someElement = $(this),
        timeoutId = setTimeout(function(){
            someElement.find(".tooltip").fadeOut("slow");
        }, 650);
        disableArrow = false
    //set the timeoutId, allowing us to clear this trigger if the mouse comes back over
    someElement.data('timeoutId', timeoutId); 
});


