// Define a function to load the Google Maps API script
function loadGoogleMapsAPI() {
  $.getScript(
    "https://maps.googleapis.com/maps/api/js?key=" +
      google_api_key +
      "&libraries=places"
  )
    .done(function (script, textStatus) {
      initMap(); // Call initMap() when the script is loaded
    })
    .fail(function (jqxhr, settings, exception) {
      console.error("Failed to load Google Maps API:", exception);
    });
}

// Initialize the map
function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById("map-route"), {
    zoom: 7,
    center: { lat: lat_a, lng: long_a },
  });
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

// Calculate and display the route
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: "DRIVING",
    },
    function (response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      } else {
        console.error("Directions request failed due to " + status);
        window.location.assign("/route");
      }
    }
  );
}

// Load the Google Maps API when the page is loaded
$(document).ready(function () {
  loadGoogleMapsAPI();
});
