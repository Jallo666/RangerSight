import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Mappa({ points = [], loading = false }) {
  const validPoints = points.filter((p) => p?.lat && p?.lon);

  const latMedia =
    validPoints.length
      ? validPoints.reduce((sum, p) => sum + p.lat, 0) / validPoints.length
      : 41.9;
  const lonMedia =
    validPoints.length
      ? validPoints.reduce((sum, p) => sum + p.lon, 0) / validPoints.length
      : 12.5;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MapContainer
        center={[latMedia, lonMedia]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkersLayer points={validPoints} />
      </MapContainer>

      {(loading || !validPoints.length) && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

function MarkersLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    const group = L.layerGroup().addTo(map);

    points.forEach((p) => {
      let icon;

      if (p.icon && p.icon instanceof L.DivIcon) {
        icon = p.icon;
      } else if (p.icon === "rain") {
        icon = new L.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/414/414974.png",
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
      } else {
        icon = new L.Icon.Default();
      }

      const marker = L.marker([p.lat, p.lon], { icon });

      const popupContent = p.info
        ?.map((i) => `<strong>${i.label}:</strong> ${i.text}`)
        .join("<br/>");

      marker.bindPopup(popupContent || "Nessuna informazione");

      marker.addTo(group);
    });

    return () => {
      group.clearLayers();
      map.removeLayer(group);
    };
  }, [points, map]);

  return null;
}
