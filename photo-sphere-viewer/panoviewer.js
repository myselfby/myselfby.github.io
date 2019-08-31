window.onload = function() {
	var file = getQueryVariable("file");
	if(file && file!='')
	{
		var isuser = getQueryVariable("isuser");
		if(isuser==="true")
		{
			loadFromUrlFile(file);
		}
		else
		{
			loadPredefinedPanorama("./images/"+file);
		}
	}
	else
	{
		document.getElementById("selectfile").style.visibility="visible";
		document.getElementById('pano').addEventListener('change', loadFromLocalFile, false);
	}
};
function loadFromLocalFile()
{
	document.getElementById("selectfile").style.visibility="hidden";
	var file = document.getElementById('pano').files[0];
	loadFromUrlFile(file);
}
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
// Load the predefined panorama
function loadPredefinedPanorama(filename) {

	// Loader
	var loader = document.createElement('div');
	loader.className = 'loader';

	// Panorama display
	//var div = document.getElementById('your-pano');
	//div.style.height = '300px';
	var winheight = window.innerHeight;
	PSV = new PhotoSphereViewer({
		// Path to the panorama
		panorama: filename,

		// Container
		container: 'pano-viewport',

		// Deactivate the animation
		time_anim: false,

		// Display the navigation bar
		navbar: true,

		// Resize the panorama
		size: {
			width: '100%',
			height: winheight
		},

		// HTML loader
		//loading_html: loader,

		// Disable smooth moves to test faster
		smooth_user_moves: false,
		long_offset:0.001,
		lat_offset:0.002,
		anim_speed:'1rpm'
	});
}

function loadFromUrlFile(filename)
{
	var reader = new FileReader();
	var winheight = window.innerHeight;
	reader.onload = function() {
		PSV = new PhotoSphereViewer({
			// Panorama, given in base 64
			panorama: reader.result,

			// Container
			container: 'pano-viewport',

			// Deactivate the animation
			time_anim: false,

			// Display the navigation bar
			navbar: true,

			// Resize the panorama
			size: {
				width: '100%',
				height: winheight
			},

			// No XMP data
			usexmpdata: false,
			long_offset:0.001,
		    lat_offset:0.002,
		    anim_speed:'1rpm'
		});
	};

	reader.readAsDataURL(filename);
}
// Yep, an ugly global variable (to make tests with the console)
var PSV;
