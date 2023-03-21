import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import Point from 'ol/geom/Point.js';
import OSM from 'ol/source/OSM.js';
import TileJSON from 'ol/source/TileJSON.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import {Icon, Style} from 'ol/style.js';
import {fromLonLat} from 'ol/proj';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import 'bootstrap/dist/css/bootstrap.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap';
const data = [[10.93376479, 50.98380407,"HMTpano_000001_000000.jpg"],[10.93377411, 50.98376802,"HMTpano_000001_000001.jpg"],[10.93378524,50.9837232,"HMTpano_000001_000002.jpg"],[10.93378027,50.98368124,"HMTpano_000001_000003.jpg"],[10.93373754,50.98364982,"HMTpano_000001_000004.jpg"],[10.9336743,50.983634,"HMTpano_000001_000005.jpg"],[10.93361004,50.98363497,"HMTpano_000001_000006.jpg"],[10.93356273,50.98366071,"HMTpano_000001_000007.jpg"],[10.93354303,50.98370195,"HMTpano_000001_000008.jpg"],[10.93353315,50.98374614,"HMTpano_000001_000009.jpg"]];
// const washingtonWebMercator = fromLonLat(washingtonLonLat);
var feature=[];
console.log(fromLonLat([data[0][0],data[0][1]]));
for(var i=0;i<data.length;i++)
{
  feature.push(new Feature({
    geometry: new Point(fromLonLat([data[i][0],data[i][1]])),
    name:i,
    image:data[i][2],
  }));
}
var panourl;
const iconStyle = new Style({
  image: new Icon({
    anchor: [0.7, 0.5],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: '../images/icon.png',
    width:10,
    height:10,
  }),
});
// const iconFeature1 = new Feature({
//   geometry: new Point(washingtonWebMercator1),
//   //setStyle:iconStyle,
// });
//iconFeature.setStyle(iconStyle);
 //iconFeature1.setStyle(iconStyle);
const vectorSource = new VectorSource({
  features: feature,
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const rasterLayer = new TileLayer({
  source: new OSM(),
});
vectorLayer.setStyle(iconStyle);
const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    center: [1217141.128876224, 6618429.35011033],
    zoom: 20,
  }),
});




// display popup on click
const element = document.getElementById('popup');

const popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
});
map.addOverlay(popup);

let popover;
function disposePopover() {
  if (popover) {
    popover.dispose();
    popover = undefined;
  }
}
// display popup on click
map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  disposePopover();
  if (!feature) {
    return;
  }
  popup.setPosition(evt.coordinate);
  popover = new bootstrap.Popover(element, {
    placement: 'top',
    html: true,
    content: "selected marker",
  });
  remove();
  panourl=feature.get('image');
  //console.log(panourl);
  change();
  popover.show();
});

// change mouse cursor when over marker
map.on('pointermove', function (e) {
  const pixel = map.getEventPixel(e.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
// Close the popup when the map is moved
map.on('movestart', disposePopover);
// Close the popup when the map is moved
var z="../images/";
//console.log(z);
const panorama = new PANOLENS.ImagePanorama(z );
// const panorama2 = new PANOLENS.ImagePanorama('images/pano5.jpg');
let imageContainer = document.querySelector('.pano-image');


var infospotPositions = [
    new THREE.Vector3(-2136.06, 16.30, 890.14),
    new THREE.Vector3(-3136.06, 296.30, -4290.14),
    
  ];

const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    
});

panorama.link( panorama, infospotPositions[0]);
// panorama2.link( panorama, infospotPositions[1]);

viewer.add( panorama);
function remove(){
  viewer.remove( panorama );
}
function change(){
  var z="../images/"
  z+=panourl;
  
  var newpanorama = new PANOLENS.ImagePanorama( z );

viewer.add( newpanorama );
viewer.setPanorama( newpanorama );
}


