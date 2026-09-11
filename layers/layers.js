var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_rivers_creeks_1 = new ol.format.GeoJSON();
var features_rivers_creeks_1 = format_rivers_creeks_1.readFeatures(json_rivers_creeks_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_rivers_creeks_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_rivers_creeks_1.addFeatures(features_rivers_creeks_1);
var lyr_rivers_creeks_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_rivers_creeks_1, 
                style: style_rivers_creeks_1,
                popuplayertitle: 'rivers_creeks',
                interactive: true,
    title: 'rivers_creeks<br />\
    <img src="styles/legend/rivers_creeks_1_0.png" /> Creek/stream<br />\
    <img src="styles/legend/rivers_creeks_1_1.png" /> Major river<br />' });
var format_innundation_zone_2 = new ol.format.GeoJSON();
var features_innundation_zone_2 = format_innundation_zone_2.readFeatures(json_innundation_zone_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_innundation_zone_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_innundation_zone_2.addFeatures(features_innundation_zone_2);
var lyr_innundation_zone_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_innundation_zone_2, 
                style: style_innundation_zone_2,
                popuplayertitle: 'innundation_zone',
                interactive: true,
    title: 'innundation_zone<br />\
    <img src="styles/legend/innundation_zone_2_0.png" /> High<br />\
    <img src="styles/legend/innundation_zone_2_1.png" /> Medium<br />\
    <img src="styles/legend/innundation_zone_2_2.png" /> No Risk<br />\
    <img src="styles/legend/innundation_zone_2_3.png" /> Very High<br />' });
var format_road_centerline_3 = new ol.format.GeoJSON();
var features_road_centerline_3 = format_road_centerline_3.readFeatures(json_road_centerline_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_road_centerline_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_road_centerline_3.addFeatures(features_road_centerline_3);
var lyr_road_centerline_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_road_centerline_3, 
                style: style_road_centerline_3,
                popuplayertitle: 'road_centerline',
                interactive: true,
                title: '<img src="styles/legend/road_centerline_3.png" /> road_centerline'
            });
var format_gradient_slope_4 = new ol.format.GeoJSON();
var features_gradient_slope_4 = format_gradient_slope_4.readFeatures(json_gradient_slope_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_gradient_slope_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_gradient_slope_4.addFeatures(features_gradient_slope_4);
var lyr_gradient_slope_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_gradient_slope_4, 
                style: style_gradient_slope_4,
                popuplayertitle: 'gradient_slope',
                interactive: true,
    title: 'gradient_slope<br />\
    <img src="styles/legend/gradient_slope_4_0.png" /> Flat<br />\
    <img src="styles/legend/gradient_slope_4_1.png" /> Hilly<br />\
    <img src="styles/legend/gradient_slope_4_2.png" /> Mountainous<br />\
    <img src="styles/legend/gradient_slope_4_3.png" /> Rolling<br />' });
var format_stream_outlets_5 = new ol.format.GeoJSON();
var features_stream_outlets_5 = format_stream_outlets_5.readFeatures(json_stream_outlets_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_stream_outlets_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_stream_outlets_5.addFeatures(features_stream_outlets_5);
var lyr_stream_outlets_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_stream_outlets_5, 
                style: style_stream_outlets_5,
                popuplayertitle: 'stream_outlets',
                interactive: true,
    title: 'stream_outlets<br />\
    <img src="styles/legend/stream_outlets_5_0.png" /> Ephemeral<br />\
    <img src="styles/legend/stream_outlets_5_1.png" /> Intermittent<br />\
    <img src="styles/legend/stream_outlets_5_2.png" /> Perennial<br />' });
var format_culverts_6 = new ol.format.GeoJSON();
var features_culverts_6 = format_culverts_6.readFeatures(json_culverts_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_culverts_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_culverts_6.addFeatures(features_culverts_6);
var lyr_culverts_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_culverts_6, 
                style: style_culverts_6,
                popuplayertitle: 'culverts',
                interactive: true,
    title: 'culverts<br />\
    <img src="styles/legend/culverts_6_0.png" /> Barely Functional<br />\
    <img src="styles/legend/culverts_6_1.png" /> Deteriorated<br />\
    <img src="styles/legend/culverts_6_2.png" /> Functional<br />\
    <img src="styles/legend/culverts_6_3.png" /> Unclassified<br />' });
var format_chainage_points_7 = new ol.format.GeoJSON();
var features_chainage_points_7 = format_chainage_points_7.readFeatures(json_chainage_points_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_chainage_points_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_chainage_points_7.addFeatures(features_chainage_points_7);
var lyr_chainage_points_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_chainage_points_7, 
                style: style_chainage_points_7,
                popuplayertitle: 'chainage_points',
                interactive: true,
                title: '<img src="styles/legend/chainage_points_7.png" /> chainage_points'
            });
var group_refactored_webready = new ol.layer.Group({
                                layers: [lyr_rivers_creeks_1,lyr_innundation_zone_2,lyr_road_centerline_3,lyr_gradient_slope_4,lyr_stream_outlets_5,lyr_culverts_6,lyr_chainage_points_7,],
                                fold: 'open',
                                title: 'refactored_webready'});

lyr_OpenStreetMap_0.setVisible(true);lyr_rivers_creeks_1.setVisible(true);lyr_innundation_zone_2.setVisible(true);lyr_road_centerline_3.setVisible(true);lyr_gradient_slope_4.setVisible(true);lyr_stream_outlets_5.setVisible(true);lyr_culverts_6.setVisible(true);lyr_chainage_points_7.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,group_refactored_webready];
lyr_rivers_creeks_1.set('fieldAliases', {'fid': 'fid', 'waterway_id': 'Waterway ID', 'waterway_type': 'Waterway Type', });
lyr_innundation_zone_2.set('fieldAliases', {'fid': 'fid', 'risk_zone_id': 'Risk Zone ID', 'risk_level': 'Innundation Risk', 'risk_rank': 'Risk Rank', 'source_description': 'source_description', });
lyr_road_centerline_3.set('fieldAliases', {'fid': 'fid', 'road_id': 'Road ID', 'feature_type': 'Feature Type', 'length_m': 'Road Lenght (m)', });
lyr_gradient_slope_4.set('fieldAliases', {'fid': 'fid', 'segment_id': 'Segment ID', 'gradient_pct': 'Gradient (%)', 'terrain_class': 'Terrain  Class', 'chainage': 'Chainage', 'segment_lenght_m': 'Segment Lenght (m)', 'source_gradient': 'source_gradient', 'source_category': 'source_category', });
lyr_stream_outlets_5.set('fieldAliases', {'fid': 'fid', 'outlet_id': 'Outlet ID', 'waterway_name': 'Waterway Name', 'flow_status': 'Flow Status', });
lyr_culverts_6.set('fieldAliases', {'fid': 'fid', 'culvert_id': 'Culvert ID', 'structure': 'Culvert Type', 'length_m': 'Culvert Lenght (m)', 'diameter_m': 'Diameter (m)', 'condition': 'Condition', 'function': 'Function', 'reccomendation': 'Recommended Action', 'source_condition': 'source_condition', 'data_note': 'Verification Note', });
lyr_chainage_points_7.set('fieldAliases', {'fid': 'fid', 'chainage_id': 'Chainage ID', 'chainage': 'Chainage', 'elevation_m': 'Elevation (m)', 'easting': 'easting', 'northing': 'northing', });
lyr_rivers_creeks_1.set('fieldImages', {'fid': 'Hidden', 'waterway_id': 'TextEdit', 'waterway_type': 'TextEdit', });
lyr_innundation_zone_2.set('fieldImages', {'fid': 'Hidden', 'risk_zone_id': 'TextEdit', 'risk_level': 'TextEdit', 'risk_rank': 'TextEdit', 'source_description': 'Hidden', });
lyr_road_centerline_3.set('fieldImages', {'fid': 'Hidden', 'road_id': 'TextEdit', 'feature_type': 'TextEdit', 'length_m': 'TextEdit', });
lyr_gradient_slope_4.set('fieldImages', {'fid': 'Hidden', 'segment_id': 'TextEdit', 'gradient_pct': 'TextEdit', 'terrain_class': 'TextEdit', 'chainage': 'TextEdit', 'segment_lenght_m': 'TextEdit', 'source_gradient': 'Hidden', 'source_category': 'Hidden', });
lyr_stream_outlets_5.set('fieldImages', {'fid': 'TextEdit', 'outlet_id': 'TextEdit', 'waterway_name': 'TextEdit', 'flow_status': 'TextEdit', });
lyr_culverts_6.set('fieldImages', {'fid': 'Hidden', 'culvert_id': 'TextEdit', 'structure': 'TextEdit', 'length_m': 'TextEdit', 'diameter_m': 'TextEdit', 'condition': 'TextEdit', 'function': 'TextEdit', 'reccomendation': 'TextEdit', 'source_condition': 'Hidden', 'data_note': 'TextEdit', });
lyr_chainage_points_7.set('fieldImages', {'fid': 'Hidden', 'chainage_id': 'TextEdit', 'chainage': 'TextEdit', 'elevation_m': 'TextEdit', 'easting': 'Hidden', 'northing': 'Hidden', });
lyr_rivers_creeks_1.set('fieldLabels', {'waterway_id': 'inline label - always visible', 'waterway_type': 'inline label - always visible', });
lyr_innundation_zone_2.set('fieldLabels', {'risk_zone_id': 'inline label - always visible', 'risk_level': 'inline label - always visible', 'risk_rank': 'inline label - always visible', });
lyr_road_centerline_3.set('fieldLabels', {'road_id': 'inline label - always visible', 'feature_type': 'inline label - always visible', 'length_m': 'inline label - always visible', });
lyr_gradient_slope_4.set('fieldLabels', {'segment_id': 'inline label - always visible', 'gradient_pct': 'inline label - always visible', 'terrain_class': 'inline label - always visible', 'chainage': 'inline label - always visible', 'segment_lenght_m': 'inline label - always visible', });
lyr_stream_outlets_5.set('fieldLabels', {'fid': 'hidden field', 'outlet_id': 'inline label - always visible', 'waterway_name': 'inline label - always visible', 'flow_status': 'inline label - always visible', });
lyr_culverts_6.set('fieldLabels', {'culvert_id': 'inline label - always visible', 'structure': 'inline label - always visible', 'length_m': 'inline label - always visible', 'diameter_m': 'inline label - always visible', 'condition': 'inline label - always visible', 'function': 'inline label - always visible', 'reccomendation': 'inline label - visible with data', 'data_note': 'inline label - visible with data', });
lyr_chainage_points_7.set('fieldLabels', {'chainage_id': 'inline label - always visible', 'chainage': 'inline label - always visible', 'elevation_m': 'inline label - always visible', });
lyr_chainage_points_7.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});