import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete, Circle, Marker } from '@react-google-maps/api';
import { Input } from '.';

const libraries = ['places'];

const LocationCoverage = ({ callback = () => {} }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 5.06, lng: 0.18 }); // Default center
  const [radius, setRadius] = useState(5000); // Default radius (5 km)
  const [autocomplete, setAutocomplete] = useState(null);
  const [location, setLocation] = useState({ lat: 5.06, lng: 0.18 });
  const [locationName, setLocationName] = useState('New Life Amasaman, Accra, Ghana'); // New state for location name

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCfRy6knjE3GE17YTPzMeeZiqLPKx_FjLM', // Replace with your API key
    libraries,
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setLocation({
          lat: location.lat(),
          lng: location.lng(),
        });
        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
        // Set the location name or formatted address
        const name = place.name || place.formatted_address;
        setLocationName(name);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  // Handle marker drag event
  const onMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ lat, lng });
    setCenter({ lat, lng });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full'>
      <div>
        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
          <>
            <label htmlFor="location" className={Input.styles.label + ' mb-3 '}>Location</label>
            <input
              type="text"
              placeholder="Enter a location"
              className={Input.styles.input + ' w-full '}
            />
          </>
        </Autocomplete>

        <div className="my-3">
          <label htmlFor="area" className={Input.styles.label + ' mb-3 '}>Coverage Area</label>
          <input
            type="range"
            min="1000"
            max="200000"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <span>{(radius / 1000).toFixed(1)} km</span>
        </div>
      </div>
      <GoogleMap
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerStyle={{ height: '40vh', width: '100%' }}
      >
        {location && (
          <>
            {/* Draggable Marker */}
            <Marker
              position={location}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />
            {/* Circle to show coverage area */}
            <Circle
              center={location}
              radius={radius}
              options={{
                fillColor: '#AA0000',
                fillOpacity: 0.2,
                strokeColor: '#AA0000',
                strokeOpacity: 0.5,
                strokeWeight: 2,
                clickable: false,
              }}
            />
          </>
        )}
      </GoogleMap>

      <button onClick={() => callback({ ...location, radius, name: locationName })} className='hover:bg-blue-500 border-2 border-blue-500 text-blue-600 hover:text-white font-semibold w-full mt-3 px-3 py-3 rounded-lg' type="button">
        Add Selected Location
      </button>
    </div>
  );
};

export default LocationCoverage;