// Main Google Maps objects
var api_key = "AIzaSyBdWg8QySMVfQ3GROvIhTqO-l4P4tHSi8U";
var map;
var desired_zoom = 18;

// Places API objects
var places_service;

// Directions API objects
var directions_service; // Google Maps Directions service
var directions_display; // Responsible for rendering the directions on to the map

// Array of all marker objects
var markers = {};

var watcher_id;

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

// Internal resources
var path_images = "img/";
var path_stylesheets = "css/";
var path_scripts = "js/";
var path_icon_me = path_images + "me.png";

// External resources
var bluemarker = "http://bactivegooglemap.googlecode.com/svn-history/r2/trunk/src/assets/marker-BLUE-DOT.png";

// Create and initialize the main Google Maps object
function initializeMap ()
{	

	// Parameters for directions rendering
	var marker_options =
	{
		// animation: google.maps.Animation.DROP
	};
	var polyline_options =
	{
		strokeColor: "#0000CD",
		strokeOpacity: 0.6,
		strokeWeight: 7
	};
	var renderer_options = 
	{
		draggable: true,
		preserveViewport: true,
		markerOptions: marker_options,
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
			// map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
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
			draggable: true,			
			animation: google.maps.Animation.DROP,
			icon: path_icon_me
			// {
				// path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
				// scale: 4
			// }
		}
	);
	
	markers.origin = new google.maps.Marker(
		{
			title: "Start"		
			// animation: google.maps.Animation.DROP,			
		}
	);	
	
	markers.destination = new google.maps.Marker(
		{
			title: "Destination",			
			// animation: google.maps.Animation.DROP,
			icon: bluemarker
		}
	);
	
	
	// Clicking on a general marker centers the map on it
	for (marker in markers)
	{
		// IIFE (Immediately Invoked Function Expression) for dealing with the asynchronous nature of callback functions
		!function (marker_local) // outer
		{
			google.maps.event.addListener(markers[marker], 'click',			
				function () // inner (local)
				{				
					if (map.getZoom < desired_zoom)
						map.setZoom(desired_zoom);
					map.setCenter(markers[marker_local].position);					
				}			
			);			
		}(marker)
	}	
	
	places_service = new google.maps.places.PlacesService(map);

	var search_box = document.getElementById("search");
	search_box.addEventListener("keypress", 
		function (e)
		{
			var key = e.keyCode ? e.keyCode : e.which;
			
			if (key == 13)
				search();
		}
	, false);
			
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
			title: title
			// animation: google.maps.Animation.DROP
		}
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
				if (map.getZoom < desired_zoom)
						map.setZoom(desired_zoom);
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
		if (markers[i] !== undefined)
		{
			markers[i].setMap(map);
			
			if (positions[i] !== undefined)			
				markers[i].setPosition(positions[i]);		
				
			// Optional: Center the map on a marker position
			if (center !== undefined)
			{					
				if (center == null)
				{			
					if (map.getZoom < desired_zoom)
						map.setZoom(desired_zoom);
					map.setCenter(markers[i].position);				
				}
				// Ensures that only one of the input markers can be focused on
				else if (positions[i] == center)
				{
					if (map.getZoom < desired_zoom)
						map.setZoom(desired_zoom);
					map.setCenter(positions[i]);
				}				
			}
		}					
	}
	
}

///////////////////
// ORIGIN /////////
///////////////////

// Compute the current position/location of the user
function getUserLocation (callback, error)
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
			}
		);
	} 
	else
	{
		if (error === undefined)
			alert("Error: Geolocation services are not supported by your device!");
		else
			error();
	}
		
}

// Track the current location of the user's device
function watchUserLocation (callback, error)
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
			}
		, {enableHighAccuracy: true, maximumAge: 30000, timeout: 27000});
	} 
	else
	{
		if (error === undefined)
			alert("Error: Geolocation services are not supported by your device!");
		else
			error();
	}
}


///////////////////
// DESTINATION ////
///////////////////

// Saves the input location to local web storage (HTML 5)
function saveToLocalStorage (location)
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
	
	// TODO: Overlay providing feedback of successful save	
}

// Loads the last saved location from local web storage (HTML 5) and returns it to the caller
function loadFromLocalStorage ()
{
	// Check if a location was saved previously
	if (localStorage.savedLocation === undefined || localStorage.savedLocation == null)
	{			
		alert("Error: You have not saved a location yet!");
		return undefined;
	}

	// Load the previously saved location into the application
	var data = JSON.parse(localStorage.savedLocation);
	var loaded_location = new google.maps.LatLng(data.lat, data.lng);
	
	return loaded_location;
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



// JUST A TESTING FUNCTION
function checkLocalStorage ()
{
	// console.log(localStorage.savedLocation);
	alert(localStorage.savedLocation);
	for (marker in markers)	
		console.log(marker.toString());
}

//////////////////////////////////////
// EXECUTION STARTING POINTS /////////
//////////////////////////////////////

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
		if (markers.hasOwnProperty(value))						
			updateMarkers([markers[value]], [undefined], null);		
		// Create it if it doesn't exist
		else 
		{		
			createMarker(value, selected_building.LatLng, selected_building.name, path_images + "university.png");	
			if (map.getZoom < desired_zoom)
						map.setZoom(desired_zoom);
			map.setCenter(selected_building.LatLng);
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
					
			updateMarkers([markers.user], [location], location)			
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
			
			//TODO: Update markers (optional)			
		}
	);
}

// Plot a path from the user's current location to the desired destination
function plot (destination) 
{	
	watchUserLocation(
		function (position)
		{
			 var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // User's current location
			// If a destination has not been provided, load from local web storage (HTML 5)
			if (destination === undefined) 
			{
				var destination = loadFromLocalStorage();
			}	
			

			if (destination !== undefined) // If a destination does exist (Note that loadFromLocalStorage() can return undefined			
			{
				render(origin, destination);				
				
				updateMarkers([markers.user, markers.destination], [origin, destination]);
			}
		}
	);	
}


function search ()
{
	var input = document.getElementById("search").value;
		
	var request = 
	{
		keyword: input,
		location: new google.maps.LatLng(43.52920131802691, -80.22871387117925),
		radius: '500'		
	}
		
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
						
														
					var shrink_icon = new google.maps.MarkerImage(
						place.icon, new google.maps.Size(71, 71), // Assumes that the original image is 71x71
						new google.maps.Point(0, 0),  // origin point of the image (usually 0,0)
						new google.maps.Point(35, 71),  // anchor point, i.e. where it points to the location (usually in the bottom middle, so at (floor(max_x/2),max_y))
						new google.maps.Size(34, 34)  // final dimensions of scaled image
					);
					
					createMarker(place.id, place.geometry.location, place.name, shrink_icon);
				}	
			}
			else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS)			
				alert("Search: No results were found for \"" + input + "\"");			
			
			// The response contains max 20 locations per request; we must scroll through the remaining 'pages' of results
			if (pagination.hasNextPage)
			{
				sleep:2; // Google imposes a 2-second delay between each search request
				pagination.nextPage(); // nextPage() calls this callback function once again
			}
		}
	);
}


// Clears all rendered overlays from the map
function clear () 
{
	// Clear all rendered markers
	for (var marker in markers)	
		if (markers.hasOwnProperty(marker))				
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
	
	delete localStorage.savedLocation;	
	
	// TODO: Overlay providing feedback of successful emptying of storage
}


































































/*

function saveLocation ()
{
	// Check if HTML5 web storage is supported by the device
	if (typeof(Storage) === "undefined")
	{
		alert("Error: Local web storage is not supported by your device!");
		return;
	}

	// Save the user's current location persistently for later access
	whereAmI("save");		
}

function plotTrip ()
{
	// Check if a location was saved previously
	if (localStorage.savedLocation === undefined)
	{			
		alert("Error: You have not saved a location yet!");
		return;
	}

	// Load the previously saved location into the application
	var data = JSON.parse(localStorage.savedLocation);		
	saved_location = new google.maps.LatLng(data.lat, data.lng); // Global variable is updated

	// Snap map to user's current location and draw a path from there to the previously saved location
	whereAmI("plot");	
}

function whereAmI (operation) 
{
 	// Grab user's current location (geolocation services must be enabled)
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(			
 			function (position)
			{					
				getCurrentPositionSuccess(position);				
												
				if (operation == "plot") // Plot a path between respective locations
					drawPath();
				else if (operation == "save") // Save a location into local web storage (HTML5)
					saveToLocalStorage();
			}
		);
	} 
	else	
		alert("Error: Geolocation services are not supported by your device!");
}

function getCurrentPositionSuccess (position)
{
	// Saves the user's current location
	user_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);	

	// Centers the map on to the user's current location
	map.setCenter(user_location);
	user_marker.setMap(map);				
	user_marker.setPosition(user_location);		
}

function drawPath ()
{
 	// Clear the extra marker representing the user
	// user_marker.setMap(null);

 	// Update the marker on the saved location
	saved_marker.setMap(map);
	saved_marker.setPosition(saved_location);

	// Calculate the route using the directions API
	var request = 
	{
		origin: user_location,
		destination: saved_location,
		travelMode: google.maps.TravelMode.WALKING		
	};
	directions_service.route(request, 
		function (result, status)
		{
			if (status == google.maps.DirectionsStatus.OK)
			{				
				directions_display.setMap(map);
				directions_display.setDirections(result);
			}
		}
	);
	
 	// Plot a [poly]line from the current location to the saved location
	// trip_path.setMap(map);
	// trip_path.setPath([user_location, saved_location]); // Array containing start [, intermediary] and end points
}

function saveToLocalStorage ()
{
	// Store the latitude and longitude in a convenient object
	var data = {};	
	data.lat = (user_location.lat()).toString();
	data.lng = (user_location.lng()).toString();
	
	// Convert to a JSON string so it can be saved in local session storage
	var storage_string = JSON.stringify(data);	
	localStorage.savedLocation = storage_string;
	
	// TODO: Overlay providing feedback of successful save
}

function clear ()
{
	user_marker.setMap(null);
	saved_marker.setMap(null);
	
	trip_path.setMap(null);
	
	directions_display.setMap(null);			
}

*/
