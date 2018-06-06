# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->

Hey all. Sorry in advance for the code not being the absolute cleanest or most optimized...I haven't done too much javascript in my current role for the past ~8 months. 

# Comments on the keyboard shortcuts up/down navigation (for state form only)

1) Right now, you can begin to type and it was display up to 10 results that match the query. 

2) Up/down navigation with submission on enter works as you would expect. Allows user to continue to scroll and select (similar to the default setting via mouse scroll and click, which allows you to continue to query and select multiple times).

3) While navigating via up/down keys you can also scrollover with the mouse and have that takeover as the primary navigation tool. Once you scrollover, it removes the up/down navigation. In order to resume use of up/down arrows, you need to remove the mouse from the dropdown menu area.

4) Being somewhat time constained I figured I'd rather go for basic functionality over perfection for the above #3. Ideally I'd use jQuery to keep track of which of the <li> is being hovered via the mouse, store that somewhere, then allow you to take over with the arrows and have it leave off from where the mouse was previously hovering. Then on mouse move, it will update the the selected <li> element..so the arrows would take over primary navigation when the mouse is stationary (and on the dropdown). This way the mouse and arrow keys can work simultaneously to optimize navigation.

5) Can continue to type and edit the query after hitting enter on navigation. Need to refocus the input form though on click if you select an option via mouse click.

# Comments on the API Endpoint / github form

1) Due to the time constaint, I didn't optimize it to accept any HTTP endpoint. As you can see in line 45, I have a code parsing the JSON and then ['items'], where not all API endpoint data will be wrapped within an 'item'. This is something, given more time, would look to make more scalable to accept all sorts of endpoints.

2) Once completing the Github form, I was at just about at 4 hours and had a good amount of other work to do...so didn't implement the up/down arrow functionality on the github form. I figured the functionality for the state form would suffice for showing ability to do up/down navigation via arrows, and the focus of github form was to set up a realtime API integration. Given more time I would have created a function to determine which form was in focus and allow up/down navigation for that dropdown, while hiding the other dropdown (or removing the form query). I would have also done #4 above but for both forms, so there's only 1 form in focus at a time, with optimized navigation for mouse + keys.

# Other comments

1) I know some of the code isn't optimized. Given the time crunch and me trying to squeeze this project in at night, I went more for functionality than performance and scalability. I'm aware of that and given more time, could identify and fix some of those issues.

2) Being slightly OCD about UI/UX my first temptation was to style the forms / page to improve the aesthetics...but maybe that was me just stalling from brushing off my JS rust. Thanks for your time.