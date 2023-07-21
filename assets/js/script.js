// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// "$(document).ready(function() {...} code is the preferred way to write jQuery document ready event handlers." So sayeth Google.
$(document).ready(function() {


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

    // Function to update classes for the time blocks
    function updateTimeBlocks() {
      // Get the current hour in 24-hour format
      const currentHour = dayjs().hour();
  
      // Iterate through each time block
      $(".time-block").each(function() {
        // Get the hour for the time block using the id attribute. Resource: https://www.w3schools.com/jquery/html_attr.asp
        // parseInt() function parses a string and returns an integer. 
        const blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        // Clear all class designations first to avoid errors. Resource: https://www.w3schools.com/jquery/html_removeclass.asp
        $(this).removeClass("past present future");
  
        // Add appropriate class based on comparison. Resource: https://www.w3schools.com/jquery/html_addclass.asp
        // Needs to  iterate through three possible classes, so used if; else if; else 
        if (blockHour < currentHour) {
          $(this).addClass("past");
        // === is the strict equality operator. Resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators
        } else if (blockHour === currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }

  // Function to update classes every 15 minutes
  function timeblockRefresh() {
    // !!! Call the function initially to update the classes on page load so it doesn't take 15 minutes to update the classes !!!
    updateTimeblocks(); 
    // Update classes every 15 minutes with setInterval. Resource: https://www.w3schools.com/jsref/met_win_setinterval.asp
    setInterval(timeblockDesignations, 15 * 60 * 1000);
  }

  // Call the function to update the classes for the time-blocks
  timeblockRefresh();
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  // Function to update the date display
  function updateDate() {
  const currentDate = new Date();
  // Format the date to be displayed on the page. Resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  // Set the text content of the element with id="currentDay" to the formatted date
  document.getElementById('currentDate').textContent = formattedDate;
}

// Call the function to update the date on page load
updateDate();
});


