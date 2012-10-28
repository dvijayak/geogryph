/* BEGIN GLOBAL VARIABLE DECLARATIONS */

// Main Google Maps objects
var api_key = "ENTER YOUR OWN API KEY HERE";
var map;
var desired_zoom = 18; // Tweak both parameters as desired
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

/* END GLOBAL VARIABLE DECLARATIONS */

// Create and initialize the key Google Maps objects
function initializeMap ()
{	

	// Parameters for directions rendering
	var polyline_options;
	var renderer_options  = 
		{
			polylineOptions: polyline_options
		};	
			
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

	// Markers
	markers.user = new google.maps.Marker(
		{
			title: "You are HERE",							
			icon: path_icon_me			
		}
	);	
	markers.destination = new google.maps.Marker(
		{
			title: "Destination",						
			icon: blue_marker
		}
	);
		
	// Circle enclosing the known campus area

	
	// Subscribe the map object to the Google Places service
	places_service = new google.maps.places.PlacesService(map);		
}


// Select (mark) a building to save in local web storage (HTML 5)
function mark ()
{
	var select = document.getElementById("buildings");
	var value = select.options[select.selectedIndex].value; // Get the value (abbr) of the selected building
	
	if (value != "null") // Does nothing if user selects the placeholder '<Buildings>' option
	{
		
	}		
	
}

// Snap the focus on to the user's current location
function snap () 
{		
	getUserLocation(
		function (position)
		{
		
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

}

// Plot a path from the user's current location to the desired destination
function plot (destination) 
{	
	if (destination !== undefined) // If a destination does exist (Note that loadFromLocalStorage() can return undefined
	{
		getUserLocation(
			function (position)
			{
			
			},
			function ()
			{
				map.setCenter(stone_gordon);
			}
		);
	}	
}

// Search for points of interest and display them on the map
function search ()
{
	var input = document.getElementById("search").value;

}


// Restricts the possible zoom levels of the map
function checkMapZoom (current_zoom)
{	

}

// Takes an origin and a destination location, plots the directions between the two and then renders the path on the map
function render (origin, destination)
{
	// Calculate the route using the directions API
	var request = 
		{
			origin: origin,
			destination: destination,
			travelMode: google.maps.TravelMode.WALKING // This is the most appropriate mode for the use of this application
		};
	
	directions_service.route(request, 
		function (result, status)
		{

		}
	);		 	
}

// Create a marker object representing a location and add it to the global array of markers
// Optional: add a custom icon to the marker object
function createMarker (id, position, title, icon)
{
	var marker_options;

	
	var content = "<DIV style='text-align:center; padding:0 2px 0 2px; background-color:#313131; color:#EEEECE;'>" + 
		"<H3><B>" + title + "</B></H3></DIV>";

	// The info window of the marker
	var info_window = new google.maps.InfoWindow({		
		content: content
	});		
			
	google.maps.event.addListener(markers[id], 'click',				
		function ()
		{										
			
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

// Update the position of the inputted markers on the map
// Optional: Center the map on one of the inputted markers
function updateMarkers (markers, positions, center)
{	
	for (var i = 0; i < markers.length; i++)
	{										
		
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
	
			}
			// Deal with errors
			, function (error)
			{
				switch(error.code)
				{
					case error.PERMISSION_DENIED:
						alert("Error: Denied access to location services!");
						break;

				}

			}
		, {enableHighAccuracy: true});
	} 
		
}

// Saves the input location to local web storage (HTML 5)
function saveToLocalStorage (location)
{		
	
}

// Loads the last saved location from local web storage (HTML 5) and returns it to the caller
function loadFromLocalStorage ()
{
	if (window.localStorage)
	{		

		// Load the previously saved location into the application
		var data;
		
	}
	else
		alert("Error: localStorage is not supported by your device!");
}


// Clears all rendered overlays from the map
function clear () 
{

}

// Clears the local web storage (HTML5) of the browser/agent/device
function clearStorage ()
{	

}
