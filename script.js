var countdownIntervals = {}; // Keep track of countdown intervals

// Function to handle the reservation
function reserve(itemNumber) {
  var durationElement = document.getElementById("duration-" + itemNumber);
  var duration = parseInt(durationElement.value);

  if (isNaN(duration) || duration <= 0) {
    alert("Invalid duration!");
    return;
  }

  var availabilityElement = document.getElementById("availability-" + itemNumber);
  var reservedByElement = document.getElementById("reserved-by-" + itemNumber);
  var remainingTimeElement = document.getElementById("remaining-time-" + itemNumber);

  if (availabilityElement.classList.contains("available")) {
    availabilityElement.classList.remove("available");
    availabilityElement.classList.add("unavailable");
    availabilityElement.innerText = "Unavailable";

    var reservedBy = prompt("Enter the name of the person making the reservation:");
    reservedByElement.innerText = reservedBy;

    var endTime = new Date().getTime() + (duration * 60 * 1000);
    var countdownInterval = setInterval(function () {
      var now = new Date().getTime();
      var remainingTime = endTime - now;

      var daysRemaining = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      var hoursRemaining = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutesRemaining = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      var secondsRemaining = Math.floor((remainingTime % (1000 * 60)) / 1000);

      var timeRemaining = "";
      if (daysRemaining > 0) {
        timeRemaining += daysRemaining + "d ";
      }
      if (hoursRemaining > 0) {
        timeRemaining += hoursRemaining + "h ";
      }
      if (minutesRemaining > 0) {
        timeRemaining += minutesRemaining + "m ";
      }
      if (secondsRemaining > 0) {
        timeRemaining += secondsRemaining + "s";
      }

      remainingTimeElement.innerText = timeRemaining;

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        availabilityElement.classList.remove("unavailable");
        availabilityElement.classList.add("available");
        availabilityElement.innerText = "Available";
        reservedByElement.innerText = "";
        remainingTimeElement.innerText = "";
      }
    }, 1000);

    countdownIntervals[itemNumber] = countdownInterval; // Store the countdown interval
  }
}

// Function to clear the reservation
function clearReservation(itemNumber) {
  var availabilityElement = document.getElementById("availability-" + itemNumber);
  var reservedByElement = document.getElementById("reserved-by-" + itemNumber);
  var remainingTimeElement = document.getElementById("remaining-time-" + itemNumber);

  availabilityElement.classList.remove("unavailable");
  availabilityElement.classList.remove("booked");
  availabilityElement.classList.add("available");
  availabilityElement.innerText = "Available";

  reservedByElement.innerText = "";
  remainingTimeElement.innerText = "";

  // Clear the countdown interval if it exists
  if (countdownIntervals[itemNumber]) {
    clearInterval(countdownIntervals[itemNumber]);
    delete countdownIntervals[itemNumber];
  }
}
