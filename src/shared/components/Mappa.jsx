import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Marker, Popup } from "react-leaflet";
import { Button } from "@mui/material";

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
  return points.map((p, idx) => (
    <Marker
      key={idx}
      position={[p.lat, p.lon]}
      icon={p.icon || new L.Icon.Default()}
    >
      <Popup>
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: 100 }}>
          {p.info?.map((i, j) => (
            <Box key={j} sx={{ display: "flex", gap: 2 }}>
              <strong>{i.label}:</strong>
              <span>{i.text}</span>
            </Box>
          ))}

          {p.actions?.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
              {p.actions.map((a, k) => (
                <Button
                  key={k}
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: "auto", padding: "2px 4px", fontSize: "0.7rem" }}
                  onClick={a.callback}
                >
                  {a.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Popup>
    </Marker>
  ));
}