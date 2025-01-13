'use client'
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
const icon = L.icon({ 
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px'
  });
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  useEffect(() => {
    const getCoordinates = async () => {
      // Debug log to see what property.location contains
      console.log("Property location data:", property?.location);

      if (!property?.location) {
        setGeoCodeError(true);
        setLoading(false);
        return;
      }

      try {
        // Handle different location format possibilities
        let addressString = '';
        
        if (typeof property.location === 'string') {
          // If location is already a string, use it directly
          addressString = property.location;
        } else if (typeof property.location === 'object') {
          // If location is an object, construct the address string
          const loc = property.location;
          addressString = [
            loc.street,
            loc.city,
            loc.state,
            loc.zipcode
          ].filter(Boolean).join(' '); // filter(Boolean) removes any undefined/null values
        }

        console.log("Constructed address string:", addressString);

        if (!addressString) {
          throw new Error("Invalid address format");
        }

        const encodedAddress = encodeURIComponent(addressString);
  

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`
        );

        const data = await response.json();
        console.log("API response:", data);

        if (data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);

          console.log("Found coordinates:", { latitude, longitude });

          setLat(latitude);
          setLng(longitude);
          
          setViewPort(prev => ({
            ...prev,
            latitude,
            longitude
          }));
        } else {
          console.log("No results found for address");
          setGeoCodeError(true);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        setGeoCodeError(true);
      } finally {
        setLoading(false);
      }
    };

    getCoordinates();
  }, [property?.location]);
    if (loading) return <div>Loading map...</div>;
    if (geoCodeError) return <div>Error loading map. Please check the address.</div>;
    if (!lat || !lng) return <div>Location not found</div>;

    return (
        <MapContainer 
            center={[lat, lng]} 
            zoom={13} 
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} icon={icon}>
                <Popup>
                    Property Location
                </Popup>
            </Marker>
        </MapContainer>
    );

};

export default PropertyMap;