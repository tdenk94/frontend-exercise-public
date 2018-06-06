# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->

Hey all. Sorry in advance for solutions being a little rocky...I haven't done too much javascript in my current role for the past ~8 months. 

# Comments on the keyboard shortcuts up/down navigation

1) Right now, you can begin to type and it was display up to 10 results that match the query. 

2) Up/down navigation with submission on enter works as you would expect. Allows user to continue to scroll and select (similar to the default setting via mouse scroll and click, which allows you to continue to query and select multiple times).

3) While navigating via up/down keys you can also scrollover with the mouse and have that takeover as the primary navigation tool. Once you scrollover, it removes the up/down navigation. In order to resume use of up/down arrows, you need to remove the mouse from the dropdown menu area.

4) Being somewhat time constained I figured I'd rather go for basic functionality over perfection for the above #3. Ideally I'd use jQuery to keep track of which of the <li> is being hovered via the mouse, store that somewhere, then allow you to take over with the arrows and have it leave off from where the mouse was previously hovering. Then on mouse move, it will update the the selected <li> element..so the arrows would take over primary navigation when the mouse is stationary (and on the dropdown). This way the mouse and arrow keys can work simultaneously to optimize navigation.

5) Can continue to type and edit the query after hitting enter on navigation. Need to refocus the input form though on click if you select an option via mouse click.

