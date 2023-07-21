// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// "$(document).ready(function() {...} code is the preferred way to write jQuery document ready event handlers." So sayeth Google.
  // "$(document).ready(function() {...} code is the preferred way to write jQuery document ready event handlers." So sayeth Google.
  $(document).ready(function() {
    // Function to update classes for the time blocks
    function updateTimeBlocks() {
      const currentHour = dayjs().hour();

      // Iterate through each time block to compare to the current hour
      $(".time-block").each(function() {
        const blockHour = parseInt($(this).attr("id").split("-")[1]);

        // Clear all class designations first to avoid errors
        $(this).removeClass("past present future");

        // Add appropriate class based on comparison
        if (blockHour < currentHour) {
          $(this).addClass("past");
        } else if (blockHour === currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }

    // Function to update classes every 15 minutes
    function timeblockRefresh() {
      // Update classes every 15 minutes with setInterval
      setInterval(updateTimeBlocks, 15 * 60 * 1000);
    }

    // Call the function to update the classes for the time-blocks
    updateTimeBlocks();

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

    // Function to update the date display
    function updateDate() {
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString(undefined, options);
      // Set the text content of the element with id="currentDay" to the formatted date
      document.getElementById('currentDate').textContent = formattedDate;
    }

    // Call the function to update the date on page load
    updateDate();
  });

