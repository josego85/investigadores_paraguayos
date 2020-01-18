var map = null;

function loadMap()
{
    // Asuncion - Paraguay.
    var lon = 0;
    var lat = 10;
    var zoom = 3;

    map = new L.map('map-container',
    {
       minZoom: 0,
       maxZoom: 12,
       center: [lat, lon],
       zoom: zoom
    });
 

    // Humanitarian Style.
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    {
        maxZoom: 18,
        attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
    }).addTo(map);

    var style_scientist =
    {
	    radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
	};

	var layer_scientist;
    $.getJSON("datos/scientist_py.geojson", function(data_scientist)
    {
        layer_scientist = L.geoJson(data_scientist,
        {
            onEachFeature: onEachFeature,
            pointToLayer: function(feature, latlng)
            {
			    return L.circleMarker(latlng, style_scientist);
			}
		}).addTo(map);
    });

	// Show information in a popup.
	function onEachFeature(p_feature, p_layer) {
		if (p_feature.properties) {
            var v_popupString = '<div class="popup">';

            for (var k in p_feature.properties) {
                var v = p_feature.properties[k];
                v_popupString += '<b>' + k + '</b>: ' + v + '<br />';
            }
            v_popupString += '</div>';
            p_layer.bindPopup(v_popupString);
        }
	}
}