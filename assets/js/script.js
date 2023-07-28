
// "$(document).ready(function() {...} code is the preferred way to write jQuery document ready event handlers." So sayeth Google.
$(document).ready(function() {


  $(".saveBtn").on("click", function() {
    // Get the user input (description) from the corresponding textarea element.
    // $(this) is the selector for the save button that was clicked. Resource: https://www.w3schools.com/jquery/jquery_ref_selectors.asp
    const noteInput = $(this).siblings("textarea").val();

     // Get the id of the containing time-block.
     // .closest() method gets the first ancestor of the selected element. Resource: https://www.w3schools.com/jquery/traversing_closest.asp
     const timeBlockId = $(this).closest(".time-block").attr("id");
  
    // Save the user input in local storage using the time-block id as the key.
    // .setItem() method sets the value of the specified local storage item. Resource: https://www.w3schools.com/jsref/met_storage_setitem.asp
    localStorage.setItem(timeBlockId, description);
  });

    // Function to update classes for the time blocks
    function updateTimeBlocks() {
      // Get the current hour in 24-hour format using dayjs.
      const currentHour = dayjs().hour();
  
      // Iterate through each time block
      // $("time-block") is the selector for the class "time-block". Resource: https://www.w3schools.com/jquery/jquery_ref_selectors.asp
      $(".time-block").each(function() {
        // Get the hour for the time block using the id attribute. Resource: https://www.w3schools.com/jquery/html_attr.asp
        // parseInt() function parses a string and returns an integer. Used to get the hour from the id.
        const blockHour = parseInt($(this).attr("id").split("-")[1]);
  
        // Clear all class designations first to avoid errors. Resource: https://www.w3schools.com/jquery/html_removeclass.asp
        $(this).removeClass("past present future");
  
        // Add appropriate class based on comparison. Resource: https://www.w3schools.com/jquery/html_addclass.asp
        // Needs to  iterate through three possible classes, so used if; else if; else 
        if (blockHour < currentHour) {
          $(this).addClass("past"); // time-block is in the past
        // === is the strict equality operator. Resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators
        } else if (blockHour === currentHour) { 
          // .addClass() method adds one or more class names to the selected elements. Resource: https://www.w3schools.com/jquery/html_addclass.asp
          $(this).addClass("present"); // time-block is in the present
        } else {
          $(this).addClass("future"); // time-block is in the future
        }
      });
    }

  // Function to update classes every 15 minutes
  function timeblockRefresh() {
    // !!! Call the function initially to update the classes on page load so it doesn't take 15 minutes to update the classes !!!
    updateTimeBlocks(); 
    // Update classes every 15 minutes with setInterval. Resource: https://www.w3schools.com/jsref/met_win_setinterval.asp
    setInterval(updateTimeBlocks, 15 * 60 * 1000);
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