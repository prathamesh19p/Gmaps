// Load Google Maps API script
$.getScript(
  "https://maps.googleapis.com/maps/api/js?key=" +
    google_api_key +
    "&libraries=places"
)
  .done(function (script, textStatus) {
    // Initialize autocomplete when the script is loaded
    initAutocomplete();
  })
  .fail(function (jqxhr, settings, exception) {
    console.error("Failed to load Google Maps API:", exception);
  });

// Define autocomplete variables
let autocomplete_a;
let autocomplete_b;

// Initialize autocomplete for address inputs
function initAutocomplete() {
  autocomplete_a = new google.maps.places.Autocomplete(
    document.getElementById("id-google-address-a"),
    { types: ["address"], componentRestrictions: { country: ["in"] } }
  );
  autocomplete_a.addListener("place_changed", function () {
    onPlaceChanged("a");
  });

  autocomplete_b = new google.maps.places.Autocomplete(
    document.getElementById("id-google-address-b"),
    { types: ["address"], componentRestrictions: { country: ["in"] } }
  );
  autocomplete_b.addListener("place_changed", function () {
    onPlaceChanged("b");
  });
}

// Handle place changed event for autocomplete inputs
function onPlaceChanged(addy) {
  let auto, el_id, lat_id, long_id;

  if (addy === "a") {
    auto = autocomplete_a;
    el_id = "id-google-address-a";
    lat_id = "id-lat-a";
    long_id = "id-long-a";
  } else {
    auto = autocomplete_b;
    el_id = "id-google-address-b";
    lat_id = "id-lat-b";
    long_id = "id-long-b";
  }

  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById(el_id).value;

  geocoder.geocode({ address: address }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();

      $("#" + lat_id).val(latitude);
      $("#" + long_id).val(longitude);

      CalcRoute();
    }
  });
}

// Validate form inputs
function validateForm() {
  var valid = true;
  $(".geo").each(function () {
    if ($(this).val() === "") {
      valid = false;
      return false;
    }
  });
  return valid;
}

// Calculate route and redirect to the map page
function CalcRoute() {
  if (validateForm()) {
    var params = {
      lat_a: $("#id-lat-a").val(),
      long_a: $("#id-long-a").val(),
      lat_b: $("#id-lat-b").val(),
      long_b: $("#id-long-b").val(),
    };

    var esc = encodeURIComponent;
    var query = Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&");

    var url = "/map?" + query;
    window.location.assign(url);
  }
}
