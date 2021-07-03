How long did you spend working on the coding challenge? How much time did you set aside to think about the design and interface before writing code?
- I spent about 15 hours total on this coding challenge with about 2 hour to think about the basic design and interface before writing the code. Once the MVP was complete, I went ahead to spend about another 1 to 2 hours thinking about additional features I wanted to implement.

What are the UI/UX features you implemented? What features did you think about implementing? In what ways do they aid the user?
1. If the username or password provided is invalid, a red asterick will render  next to the respective label to indicate that there was a validation error with that input.
2. A tooltip will appear if the username or password provided is invalid and the user was focused on the input. If the user clicked away, the tooltip would disappear. This functionality is present until the user clicks "Create Account" again. The tooltip contains information about what is required for that specific input.
3. When the user clicks the "Create Account" button, it will be disabled while the server is processing the request. Once the request have been completed, the button will be active again. This indicates to the user that their request is pending.
4. I added a hover effect on the "Create Account" button which adds a little bit of a nice touch to the feel of the form

What are some styling and layout considerations you took into account when designing / building the form?
- For the tooltip that would appear when the username or password was invalid, I went back and forth on where the criteria should be displayed. I initially thought about having the criteria render out under "Create New Account" but felt that it would add too much clutter especially because I would have to specify where the error was coming from. I ultimately went with the tooltip which would appear upon focus because the red asterick was already a visual indication that something was wrong with that input field. When the user goes and makes a change, they will see the tooltip appear to guide them towards a valid input.
- While their request is being processed, I thought about displaying a modal which would read "Processing" or something to that effect but I felt that was a little too obnoxious. Instead, I decided to have the button change to a dark purple color to subtley indicate to the user that something is happening with your request and this button is currently disabled.
- For the tooltip, the letters were bunching up too much so I added some letter spacing to give them more breathing room. This made the consumption of the criteria easier.
- I ultimately stuck with the design mock up becuase it made sense for a form that took in a username and password. It followed a logical path (top to bottom) for the user to complete the form.

What additional features or functionality would you add if you had 6 more engineering hours? How do you prioritize them? How much time would each one take?
1. Input validation on the client-side so that when the user will be able to see how their input is fulfilling the requirements in real-time. This way, the user will be able to get instant feedback about their input. I would have the tooltip appear as soon as the user enters the input field and disappear when all the criteria have been met (even when the user re-enters the input field). Development time for this feature should take about 4 engineering hours.
2. The input field would have some kind of halo or bottom glow to give further feedback about where they are in their form. Development time should take about 2 engineering hours.
3. I would work with the team in charge of UX to determine what should be done after successful account creation. I currently have it to display a message under the Create Account button which says that the user is now being redirected to the login page but that could change to something which would require manual input from the user or even being redirected to a page which collects additional information about the user for a multi-step account create process.

If you added any additional packages, what were they and why did you decide to
add them?
- I did not add any additional packages