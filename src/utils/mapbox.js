import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

export default mapboxgl;