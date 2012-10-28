// Main Google Maps objects
var api_key = "AIzaSyBdWg8QySMVfQ3GROvIhTqO-l4P4tHSi8U";
var map;
var desired_zoom = 18;
var min_zoom = 14;
var campus_area; // Circle representing the campus area (as of October 2012)

// Places API objects
var places_service;
var search_radius = 1000;

// Directions API objects
var directions_service; // Google Maps Directions service
var directions_display; // Responsible for rendering the directions on to the map

// Array of all marker objects
var markers = {};

var watcher_id; // Watcher object to track the user's current position

// An object containing all buildings and their respective lat/lon values
var buildings =
{	
	"AC": 
	{		
		name: "Athletics Centre",
		LatLng: new google.maps.LatLng(43.533294,-80.224637)
	},
	"ANNU": 
	{	
		name: "Animal Science & Nutrition",
		LatLng: new google.maps.LatLng(43.529492,-80.229779)
	},	
	"ALEX": 
	{		
		name: "Alexander Hall",
		LatLng: new google.maps.LatLng(43.52942,-80.227644)
	},
	"AXEL": 
	{		
		name: "Axelrod",
		LatLng: new google.maps.LatLng(43.52869,-80.226075)
	},	
	"BIO": 
	{	
		name: "Biodiversity Institute of Ontario",
		LatLng: new google.maps.LatLng(43.5282,-80.229038)
	},	
	"BWH": 
	{		
		name: "Blackwood Hall",
		LatLng: new google.maps.LatLng(43.532941,-80.227034)
	},
	"CAF": 
	{	
		name: "Central Animal Facility",
		LatLng: new google.maps.LatLng(43.528853,-80.232741)
	},	
	"CRSC": 
	{		
		name: "Crop Science",
		LatLng: new google.maps.LatLng(43.531805,-80.224637)
	},
	"DH": 
	{	
		name: "Day Hall",
		LatLng: new google.maps.LatLng(43.531884,-80.226859)
	},	
	"EBA": 
	{		
		name: "Environmental Biology Annex 1",
		LatLng: new google.maps.LatLng(43.527959,-80.228188)
	},
	"ECB": 
	{	
		name: "Edmund C. Bovey",
		LatLng: new google.maps.LatLng(43.527806,-80.227376)
	},	
	"FS": 
	{		
		name: "Food Science",
		LatLng: new google.maps.LatLng(43.529965,-80.230519)
	},
	"GRHM": 
	{		
		name: "Graham Hall",
		LatLng: new google.maps.LatLng(43.528177,-80.227905)
	},
	"HUTT": 
	{	
		name: "H. L. Hutt",
		LatLng: new google.maps.LatLng(43.530194,-80.227121)
	},	
	"JHNH": 
	{		
		name: "Johnston Hall",
		LatLng: new google.maps.LatLng(43.532994,-80.228515)
	},
	"JTP": 
	{	
		name: "John T. Powell",
		LatLng: new google.maps.LatLng(43.533553,-80.22333)
	},
	"LA": 
	{		
		name: "Landscape Architecture",
		LatLng: new google.maps.LatLng(43.532419,-80.225291)
	},
	"MAC": 
	{	
		name: "Macdonald Hall",
		LatLng: new google.maps.LatLng(43.534172,-80.230955)
	},	
	"MACK": 
	{		
		name: "MacKinnon",
		LatLng: new google.maps.LatLng(43.532666,-80.227295)
	},
	"MACN": 
	{	
		name: "MacNaughton",
		LatLng: new google.maps.LatLng(43.530622,-80.227339)
	},
	"MACS": 
	{		
		name: "Macdonald Steward Hall",
		LatLng: new google.maps.LatLng(43.534329,-80.232785)
	},	
	"MASS": 
	{		
		name: "Massey Hall",
		LatLng: new google.maps.LatLng(43.531796,-80.228428)
	},
	"MCLN": 
	{	
		name: "MacLachlan",
		LatLng: new google.maps.LatLng(43.531289,-80.228602)
	},	
	"MINS": 
	{		
		name: "Macdonald Institute",
		LatLng: new google.maps.LatLng(43.534433,-80.232262)
	},
	"MLIB": 
	{	
		name: "McLaughlin Library",
		LatLng: new google.maps.LatLng(43.531479,-80.227774)
	},	
	"MSAC": 
	{		
		name: "Macdonald Stewart Art Centre",
		LatLng: new google.maps.LatLng(43.533004,-80.232959)
	},
	"OVC": 
	{	
		name: "Ontario Veterinary College",
		LatLng: new google.maps.LatLng(43.530171,-80.233351)
	},	
	"PAHL": 
	{		
		name: "OVC Pathobiology AHL",
		LatLng: new google.maps.LatLng(43.530621,-80.231108)
	},
	"REYN": 
	{	
		name: "Reynolds",
		LatLng: new google.maps.LatLng(43.530731,-80.229038)
	},	
	"RICH": 
	{		
		name: "Richards",
		LatLng: new google.maps.LatLng(43.531459,-80.225378)
	},
	"ROZH": 
	{	
		name: "Rozanski Hall",
		LatLng: new google.maps.LatLng(43.532192,-80.225683)
	},	
	"SCIE": 
	{		
		name: "Science Complex",
		LatLng: new google.maps.LatLng(43.530348,-80.228472)
	},
	"TCI": 
	{	
		name: "TransCanada Institute",
		LatLng: new google.maps.LatLng(43.534332,-80.233921)
	},
	"THRN": 
	{	
		name: "Thornbrough",
		LatLng: new google.maps.LatLng(43.530316,-80.224637)
	},	
	"VSER": 
	{		
		name: "Vehicle Services",
		LatLng: new google.maps.LatLng(43.532989,-80.225821)
	},
	"WMEM": 
	{	
		name: "War Memorial Hall",
		LatLng: new google.maps.LatLng(43.532638,-80.231304)
	},	
	"ZAV": 
	{		
		name: "Zavitz Hall",
		LatLng: new google.maps.LatLng(43.531021,-80.227208)
	},
	"ZOOA": 
	{	
		name: "Zoology Annex 1",
		LatLng: new google.maps.LatLng(43.527841,-80.227554)
	},	
	"ZOOB": 
	{		
		name: "Zoology Annex 2",
		LatLng: new google.maps.LatLng(43.528324,-80.228537)
	}
};

// Pre-defined locations	
var stone_gordon = new google.maps.LatLng(43.526643, -80.224733);	
var campus_center = new google.maps.LatLng(43.52920131802691, -80.22871387117925);	

// Internal resources
var path_images = "img/";
var path_stylesheets = "css/";
var path_scripts = "js/";
var path_icon_me = path_images + "me.png";
var blue_marker = path_images + "blue_marker.png"; 
var red_university = path_images + "university.png";

// External resources (if any)


// Create and initialize the key Google Maps objects
function initializeMap ()
{	
	// Parameters for directions rendering
	var polyline_options =
		{
			strokeColor: "#0000CD",
			strokeOpacity: 0.6,
			strokeWeight: 7
		};
	var renderer_options = 
		{
			draggable: false,
			preserveViewport: true,			
			polylineOptions: polyline_options,
			suppressMarkers: true
		};	
	
	directions_service = new google.maps.DirectionsService();
	directions_display = new google.maps.DirectionsRenderer(renderer_options);
			
	// Parameters for the initialization of the map
	var mapOptions = 
		{						
			zoom: desired_zoom,
			mapTypeControl: false,		
			streetViewControl: false,
			zoomControl: true,
			zoomControlOptions:
			{
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.TOP_LEFT
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP		
		};	
	
	// Create the map object
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);				
	
	// Attempt to center the map upon loading on the user's current position	
	getUserLocation(
		function (position)
		{
			var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			updateMarkers([markers.user], [location], location);			
		},
		function ()
		{
			map.setCenter(stone_gordon);
		}
	);	

// Markers
	markers.user = new google.maps.Marker(
		{
			title: "You are HERE",							
			icon: /* new google.maps.MarkerImage( */
				path_icon_me/* , */ 
				/* new google.maps.Size(64, 64), // Assumes that the original image is 64 x 64
				new google.maps.Point(0, 0), // origin point of the image (usually 0,0)
				new google.maps.Point(32, 64), // anchor point, i.e. where it points to the location (usually in the bottom middle, so at (floor(max_x/2),max_y))
				new google.maps.Size(64, 64) // final dimensions of scaled image */
			/* ) */
		}
	);	
	markers.destination = new google.maps.Marker(
		{
			title: "Destination",						
			icon: blue_marker
		}
	);
		
	// Clicking on a marker generally centers the map on it
	for (marker in markers)
	{
		// IIFE (Immediately Invoked Function Expression) for dealing with the asynchronous nature of callback functions
		!function (marker_local) // outer
		{
			google.maps.event.addListener(markers[marker], 'click',			
				function () // inner (local)
				{				
					checkMapZoom(map.getZoom());
					map.setCenter(markers[marker_local].position);					
				}			
			);			
		}(marker)
	}	
	
	// Circle enclosing the known campus area
	var circle_options = 
		{
			clickable: false,
			strokeColor: "#FF0000",
			strokeOpacity: 0.6,
			strokeWeight: 2,
			fillOpacity: 0.0,
			map: map,
			center: campus_center,
			radius: search_radius
		};
	campus_area = new google.maps.Circle(circle_options);
	
	// Subscribe the map object to the Google Places service
	places_service = new google.maps.places.PlacesService(map);	
	
	// Create the autocomplete object and attach it to the search box
	var search_bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(43.518774,-80.24148),
			new google.maps.LatLng(43.547739,-80.203886)
		);
	var search_box = document.getElementById("search");		
	var auto_options = 
		{
			bounds: search_bounds,
			componentRestrictions: {country: "ca"}
		}
	var autocomplete = new google.maps.places.Autocomplete(search_box, auto_options);				
}


// Select (mark) a building to save in local web storage (HTML 5)
function mark ()
{
	var select = document.getElementById("buildings");
	var value = select.options[select.selectedIndex].value; // Get the value (abbr) of the selected building
	
	if (value != "null") // Does nothing if user selects the placeholder '<Buildings>' option
	{
		// Create an object representing the selected building	
		var selected_building = buildings[value];						
	
		// Snap map to center on the marker
		if (markers.hasOwnProperty(value))	// If the marker already exists					
			updateMarkers([markers[value]], [undefined], null);				
		else  // Create it if it doesn't exist
		{		
			createMarker(value, selected_building.LatLng, selected_building.name, red_university);	
			checkMapZoom(map.getZoom());			
		}

		// Save the marked building location to local web storage (HTML 5)
		saveToLocalStorage(selected_building.LatLng);		
	}		
	
}

// Snap the focus on to the user's current location
function snap () 
{		
	getUserLocation(
		function (position)
		{
			var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);											
			updateMarkers([markers.user], [location], location);
		},
		function ()
		{
			map.setCenter(stone_gordon);
		}
	);	
}

// Save the user's current location in local web storage (HTML5)
function save () 
{
	getUserLocation(
		function (position)
		{
			var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);			
			saveToLocalStorage(location);						
		},
		function ()
		{
			map.setCenter(stone_gordon);
		}
	);
}

// Plot a path from the user's current location to the desired destination
function plot (destination) 
{	
	// If a destination has not been provided, load from local web storage (HTML 5)
	if (destination === undefined) 			
		destination = loadFromLocalStorage();

	if (destination !== undefined) // If a destination does exist (Note that loadFromLocalStorage() can return undefined
	{
		getUserLocation(
			function (position)
			{
				var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // User's current location						
																
				render(origin, destination);								
				updateMarkers([markers.user, markers.destination], [origin, destination], destination);				
			},
			function ()
			{
				map.setCenter(stone_gordon);
			}
		);
	}	
}

// Takes an origin and a destination location, plots the directions between the two and then renders the path on the map
function render (origin, destination)
{
	// Calculate the route using the directions API
	var request = 
		{
			origin: origin,
			destination: destination,
			travelMode: google.maps.TravelMode.WALKING // Can be a Preference parameter
		};
	
	directions_service.route(request, 
		function (result, status)
		{
			if (status == google.maps.DirectionsStatus.OK)
			{					
				// Render the directions path(s)
				directions_display.setMap(map);
				directions_display.setDirections(result);				
			}
		}
	);		 	
}

// Search for points of interest and display them on the map
function search ()
{
	var input = document.getElementById("search").value;
		
	var request = 
		{
			keyword: input,		
			location: campus_center,
			radius: search_radius.toString()		
		};
		
	places_service.search(request, 
		function (results, status, pagination)
		{
			if (status == google.maps.places.PlacesServiceStatus.OK)
			{				
				for (var i = 0; i < results.length; i++)
				{					
					var place = results[i];		
					
					if (place.hasOwnProperty("opening_hours"))
					{
						if (place.opening_hours.open_now)
							place.name += " (OPEN)";
						else
							place.name += " (CLOSED)";
					}
						
					
					// Temporary fix: The icons are scaled down to half since the icons provided from the API results are too big				
					var shrink_icon = new google.maps.MarkerImage(
						place.icon, 
						new google.maps.Size(71, 71), // Assumes that the original image is 71x71
						new google.maps.Point(0, 0),  // origin point of the image (usually 0,0)
						new google.maps.Point(17, 34),  // anchor point, i.e. where it points to the location (usually in the bottom middle, so at (floor(max_x/2),max_y))
						new google.maps.Size(34, 34)  // final dimensions of scaled image
					);
					
					createMarker(place.id, place.geometry.location, place.name, shrink_icon);
					// Save the last result into local storage
					if (i == results.length - 1)
						saveToLocalStorage(place.geometry.location);
					
				}				
			}
			else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS)			
				alert("Search: No results were found for \"" + input + "\"");
			else if (status == google.maps.places.PlacesServiceStatus.INVALID_REQUEST)
				alert("Error: The request was invalid!");
			else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
				alert("Error: You have exceeded the search request quota. Try again in 48 hours!");
			else if (status == google.maps.places.PlacesServiceStatus.REQUEST_DENIED)
				alert("Error: Forbidden access. The request is not allowed to be processed!");
			else if (status == google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR)
				alert("Error: The search request could not be processed due to a server error. Please try again later!");
			else if (status == google.maps.places.PlacesServiceStatus.ERROR)
				alert("Error: There was a problem contacting the Google servers!");
			
			// The response contains max 20 locations per request; we must scroll through the remaining 'pages' of results
			if (pagination.hasNextPage)
			{
				sleep:2; // Google imposes a 2-second delay between each search request
				pagination.nextPage(); // nextPage() calls this callback function once again
			}
		}
	);
}


// Restricts the possible zoom levels of the map
function checkMapZoom (current_zoom)
{	
	if (current_zoom < desired_zoom)
	{		
		if (current_zoom < min_zoom)	
			map.setZoom(min_zoom);				
	}
}

// Create a marker object representing a location and add it to the global array of markers
// Optional: add a custom icon to the marker object
function createMarker (id, position, title, icon)
{
	if (!markers.hasOwnProperty(id))
	{
		var marker_options = 
		{
			map: map,
			position: position,
			title: title,			
		};
		if (icon !== undefined)
			marker_options.icon = icon;
			
		markers[id] = new google.maps.Marker(marker_options);	

		var content = "<DIV style='text-align:center; padding:0 2px 0 2px; background-color:#313131; color:#EEEECE;'>" + 
			"<H3><B>" + title + "</B></H3></DIV>";

		// The info window of the marker
		var info_window = new google.maps.InfoWindow({		
			content: content
		});		
				
		google.maps.event.addListener(markers[id], 'click',				
			function ()
			{						
				saveToLocalStorage(position);
				checkMapZoom(map.getZoom())
				map.setCenter(position);
				
				info_window.open(map, markers[id]);
			}			
		);	
		
		google.maps.event.addListener(map, 'click',
			function ()
			{
				info_window.close();
			}
		);
	}
	else
		markers[id].setMap(map);
}

// Update the position of the inputted markers on the map
// Optional: Center the map on one of the inputted markers
function updateMarkers (markers, positions, center)
{	
	for (var i = 0; i < markers.length; i++)
	{						
		if (positions[i] !== undefined)
			markers[i].setPosition(positions[i]);				
			
		markers[i].setMap(map);
			
		// Optional: Center the map on a marker position
		if (center !== undefined)
		{					
			if (center == null)
			{			
				checkMapZoom(map.getZoom());
				map.setCenter(markers[i].position);				
			}
			// Ensures that only one of the input markers can be focused on
			else if (positions[i] == center)
			{
				checkMapZoom(map.getZoom());
				map.setCenter(center);
			}				
		}									
	}	
}


// Compute the current position/location of the user
function getUserLocation (callback, errorCallback)
{
 	// Geolocation services must be enabled
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(			
 			function (position)
			{					
				// Do something with the current position
				callback(position);
			}
			// Deal with errors
			, function (error)
			{
				switch(error.code)
				{
					case error.PERMISSION_DENIED:
						alert("Error: Denied access to location services!");
						break;
					case error.POSITION_UNAVAILABLE:
						alert("Error: Location information is unavailable!");
						break;
					case error.TIMEOUT:
						alert("Error: Request timed out!");
						break;
					case error.UNKNOWN_ERROR:
						alert("Error: An unknown error has occurred!");
						break;
				}
				if (errorCallback !== undefined)
					errorCallback();
			}
		, {enableHighAccuracy: true});
	} 
	else
	{
		if (errorCallback === undefined)
			alert("Error: Geolocation services are not supported by your device!");
		else
			errorCallback();
	}
		
}

// Track the current location of the user's device
function watchUserLocation (callback, errorCallback)
{
 	// Geolocation services must be enabled
	if (navigator.geolocation)
	{
		navigator.geolocation.clearWatch(watcher_id);
		watcher_id = navigator.geolocation.watchPosition(			
 			function (position)
			{					
				// Do something with the current position
				callback(position);
			}
			// Deal with errors
			, function (error)
			{
				switch(error.code)
				{
					case error.PERMISSION_DENIED:
						alert("Error: Denied access to location services!");
						break;
					case error.POSITION_UNAVAILABLE:
						alert("Error: Location information is unavailable!");
						break;
					case error.TIMEOUT:
						alert("Error: Request timed out!");
						break;
					case error.UNKNOWN_ERROR:
						alert("Error: An unknown error has occurred!");
						break;
				}
				if (errorCallback !== undefined)
					errorCallback();
			}
		, {enableHighAccuracy: true});
	} 
	else
	{
		if (errorCallback === undefined)
			alert("Error: Geolocation services are not supported by your device!");
		else
			errorCallback();
	}
}


// Saves the input location to local web storage (HTML 5)
function saveToLocalStorage (location)
{		
	// Checks if local web storage is supported by the device
	if (window.localStorage)
	{
		// Store the latitude and longitude in a convenient object
		var data = 
		{
			lat: (location.lat()).toString(),
			lng: (location.lng()).toString()
		};		
		
		// Convert to a JSON string so it can be saved in local session storage
		var storage_string = JSON.stringify(data);	
		localStorage.savedLocation = storage_string;		
		
		// Snap map to the saved location
		map.setCenter(location);
	}
	else
		alert("Error: localStorage is not supported by your device!");
}

// Loads the last saved location from local web storage (HTML 5) and returns it to the caller
function loadFromLocalStorage ()
{
	if (window.localStorage)
	{
		// Check if a location was saved previously		
		if (!localStorage.hasOwnProperty("savedLocation"))
		{			
			alert("Error: You have not saved a location yet!");
			return undefined;
		}

		// Load the previously saved location into the application
		var data = JSON.parse(localStorage.savedLocation);
		var loaded_location = new google.maps.LatLng(data.lat, data.lng);
		
		return loaded_location;
	}
	else
		alert("Error: localStorage is not supported by your device!");
}


// Clears all rendered overlays from the map
function clear () 
{
	// Clear the search box
	var search_box = document.getElementById("search");
	search_box.value = "";
	
	// Clear all rendered markers
	for (var marker in markers)			
		markers[marker].setMap(null);						
	
	// Clear all rendered paths
	directions_display.setMap(null);	
	
	// Clears the position tracker service
	if (navigator.geolocation)
		navigator.geolocation.clearWatch(watcher_id);
}

// Clears the local web storage (HTML5) of the browser/agent/device
function clearStorage ()
{	
	if (window.localStorage)
	{
		delete localStorage.savedLocation;	
			
		alert("Notice: All saved locations have been cleared!");
	}
	else
		alert("Error: localStorage is not supported in your device!");
}
