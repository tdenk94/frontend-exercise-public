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


// incremental variables for state and github 
var i = -1;	 // state
var j = -1;  // github

var disableArrow = false;

// state dropdown
new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});


var request = new XMLHttpRequest();
var users;

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.github.com/search/users?q$tdenk=&per_page=5', true);

request.onload = function () {
	// Begin accessing JSON data here
	var data2 = JSON.parse(this.response)['items'];

	if (request.status >= 200 && request.status < 400) {
		var users = data2.map(user => ({
			text: user.login,
			value: user.id
		}));
		// Github Users form selection
		new Autocomplete2(document.getElementById('gh-user'), {
			users,
			onSelect: (ghUserId) => {
				console.log('selected github user id:', ghUserId);
	  		},
		});
	}
	else {
		console.log('error');
	}
}
// Send request
request.send();



// state form selection
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


