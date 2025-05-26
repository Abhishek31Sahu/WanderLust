mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/satellite-streets-v11", // style URL
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

const mappointer = new mapboxgl.Marker({ color: "#FF0000" }) // create a new marker with a red color
  .setLngLat(listing.geometry.coordinates) // set the marker position
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h5>${listing.title}</h5><p>exact location will be provided after booking</p>`
      )
  )
  .addTo(map); // add the marker to the map
