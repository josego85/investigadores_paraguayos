var map = null;

function loadMap()
{
    // Asuncion - Paraguay.
    var lon = 5.0;
    var lat = 20.0;
    var zoom = 2;
    var minZoom = 2;
    var maxZoom = 5;

    map = new L.map('map-container',
    {
        center: [lat, lon],
        minZoom: minZoom,
        zoom: zoom,
        scrollWheelZoom: false
    });
 
    // Humanitarian Style.
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    {
        maxZoom: maxZoom,
        attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright">' +
          'OpenStreetMap Contributors </a> Tiles \u00a9 HOT',
    }).addTo(map);

    var layer_scientist;
    var yellowIcon = new L.Icon(
    {
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    $.getJSON("datos/scientist_py.geojson", function(data_scientist)
    {
        layer_scientist = L.geoJson(data_scientist,
        {
            onEachFeature: onEachFeature,
            pointToLayer: function(feature, latlng)
            {
                return L.marker(latlng, {icon: yellowIcon});
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