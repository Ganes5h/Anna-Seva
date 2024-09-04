import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const MapWithGeocoder = ({ onLocationSelect }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const apiKey = "f2bcfb32d1f441e786bcae761a2f81cd";
  console.log(apiKey);
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const options = {
        key: apiKey,
        limit: 10,
      };

      L.Control.geocoder(options)
        .on("markgeocode", function (e) {
          const { lat, lng } = e.geocode.center;
          onLocationSelect({ lat, lng });
          map.flyTo([lat, lng], 13);
        })
        .addTo(map);

      map.on("click", function (e) {
        const query = `${e.latlng.lat},${e.latlng.lng}`;
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${options.key}`
        )
          .then((response) => response.json())
          .then((data) => {
            const result = data.results[0];
            if (result) {
              onLocationSelect({
                lat: result.geometry.lat,
                lng: result.geometry.lng,
                address: result.formatted,
              });
              L.marker([result.geometry.lat, result.geometry.lng])
                .bindPopup(result.formatted)
                .addTo(map)
                .openPopup();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }
  }, []);

  return <div style={{ height: "500px" }} ref={mapContainerRef}></div>;
};

export default MapWithGeocoder;
