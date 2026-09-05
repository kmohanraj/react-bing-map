import React, { useState } from "react";
import { BingMaps } from "./MapView/BingMaps";
import { TLocation, TRouteInfo, TRouteMode } from "../type/component.type";

export type TDrawerPosition = "left" | "right" | "top" | "bottom";

export type TRouteSelectionWithGPSProps = {
  bingKey?: string;
  drawerPosition?: TDrawerPosition;
  locations?: Record<string, TLocation>;
  initialSourceKey?: string;
  initialDestinationKey?: string;
  mapType?: string;
  language?: string;
  zoom?: number;
  disableZooming?: boolean;
  showScalebar?: boolean;
  showCopyright?: boolean;
  showLogo?: boolean;
  showBreadcrumb?: boolean;
  showLocateMeButton?: boolean;
  showZoomButtons?: boolean;
  showMapTypeSelector?: boolean;
};

const DEFAULT_LOCATIONS: Record<string, TLocation> = {
  delhi: { latitude: 28.7041, longitude: 77.1025 },
  mumbai: { latitude: 19.076, longitude: 72.8777 },
  bangalore: { latitude: 12.9716, longitude: 77.5946 },
  hyderabad: { latitude: 17.385, longitude: 78.4867 },
  chennai: { latitude: 13.0827, longitude: 80.2707 },
  kolkata: { latitude: 22.5726, longitude: 88.3639 },
};

const CURRENT_LOCATION_SOURCE = "current-location";

const getInitialLocation = (
  locations: Record<string, TLocation>,
  preferredKey: string,
  fallbackIndex: number
) => locations[preferredKey] ?? Object.values(locations)[fallbackIndex] ?? Object.values(DEFAULT_LOCATIONS)[fallbackIndex];

const formatRouteDuration = (durationInSeconds?: number) => {
  if (!durationInSeconds) {
    return "Not available";
  }

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.round((durationInSeconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} min`;
  }

  return `${hours} hr ${minutes} min`;
};

const getContainerDirection = (drawerPosition: TDrawerPosition) => {
  if (drawerPosition === "left") {
    return "row-reverse";
  }

  if (drawerPosition === "top") {
    return "column-reverse";
  }

  if (drawerPosition === "bottom") {
    return "column";
  }

  return "row";
};

const getDrawerStyle = (drawerPosition: TDrawerPosition): React.CSSProperties => {
  const isHorizontal = drawerPosition === "left" || drawerPosition === "right";

  return {
    width: isHorizontal ? "300px" : "100%",
    maxHeight: isHorizontal ? undefined : "260px",
    overflowY: "auto",
    flexShrink: 0,
    borderLeft: drawerPosition === "right" ? "1px solid #ccc" : undefined,
    borderRight: drawerPosition === "left" ? "1px solid #ccc" : undefined,
    borderTop: drawerPosition === "bottom" ? "1px solid #ccc" : undefined,
    borderBottom: drawerPosition === "top" ? "1px solid #ccc" : undefined,
    paddingLeft: drawerPosition === "right" ? "20px" : undefined,
    paddingRight: drawerPosition === "left" ? "20px" : undefined,
    paddingTop: drawerPosition === "bottom" ? "16px" : undefined,
    paddingBottom: drawerPosition === "top" ? "16px" : undefined,
  };
};

export const RouteSelectionWithGPS: React.FC<TRouteSelectionWithGPSProps> = ({
  bingKey = "",
  drawerPosition = "right",
  locations = DEFAULT_LOCATIONS,
  initialSourceKey = "delhi",
  initialDestinationKey = "mumbai",
  mapType = "grayscale",
  language = "en-IN",
  zoom = 5,
  disableZooming = false,
  showScalebar = true,
  showCopyright = true,
  showLogo = true,
  showBreadcrumb = true,
  showLocateMeButton = true,
  showZoomButtons = true,
  showMapTypeSelector = true,
}) => {
  const [source, setSource] = useState<TLocation>(() => getInitialLocation(locations, initialSourceKey, 0));
  const [destination, setDestination] = useState<TLocation>(() => getInitialLocation(locations, initialDestinationKey, 1));
  const [routeMode, setRouteMode] = useState<TRouteMode>("driving");
  const [useGPS, setUseGPS] = useState<boolean>(false);
  const [gpsLocation, setGpsLocation] = useState<TLocation | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsStatus, setGpsStatus] = useState<"idle" | "locating" | "found" | "error">("idle");
  const [routeInfo, setRouteInfo] = useState<TRouteInfo | null>(null);

  const resetGPSState = (enabled: boolean) => {
    setUseGPS(enabled);
    setGpsLocation(null);
    setGpsError(null);
    setGpsStatus(enabled ? "locating" : "idle");
    setRouteInfo(null);
  };

  const selectedSourceKey = Object.keys(locations).find((key) => locations[key].latitude === source.latitude) || "";
  const selectedDestinationKey = Object.keys(locations).find((key) => locations[key].latitude === destination.latitude) || "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: getContainerDirection(drawerPosition),
        height: "100vh",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1, minHeight: drawerPosition === "top" || drawerPosition === "bottom" ? "420px" : undefined, position: "relative", overflow: "hidden" }}>
        {!bingKey ? (
          <div style={{ padding: "20px", backgroundColor: "#fff3cd", borderRadius: "4px", border: "1px solid #ffc107" }}>
            <h3>⚠️ API Key Required</h3>
            <p>Set the <code>bingKey</code> prop/control to test maps, routes, GPS, and distance.</p>
          </div>
        ) : (
          <BingMaps
            mapType={mapType}
            bingKey={bingKey}
            language={language}
            zoom={zoom}
            disableZooming={disableZooming}
            source={source}
            destination={destination}
            showRoute={true}
            routeMode={routeMode}
            useGPS={useGPS}
            showScalebar={showScalebar}
            showCopyright={showCopyright}
            showLogo={showLogo}
            showBreadcrumb={showBreadcrumb}
            showLocateMeButton={showLocateMeButton}
            showZoomButtons={showZoomButtons}
            showMapTypeSelector={showMapTypeSelector}
            onGPSLocationFound={(location) => {
              setGpsLocation(location);
              setGpsError(null);
              setGpsStatus("found");
            }}
            onGPSError={(error) => {
              setGpsError(error);
              setGpsStatus("error");
            }}
            onRouteCalculated={(calculatedRouteInfo) => {
              setRouteInfo(calculatedRouteInfo);
            }}
          />
        )}
      </div>
      <div style={getDrawerStyle(drawerPosition)}>
        <h2>Route Configuration</h2>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Source Location:</label>
          <select
            value={useGPS ? CURRENT_LOCATION_SOURCE : selectedSourceKey}
            onChange={(event) => {
              if (event.target.value === CURRENT_LOCATION_SOURCE) {
                resetGPSState(true);
                return;
              }

              setSource(locations[event.target.value]);
              resetGPSState(false);
            }}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          >
            <option value={CURRENT_LOCATION_SOURCE}>📍 Current Location</option>
            {Object.entries(locations).map(([name]) => (
              <option key={name} value={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Destination Location:</label>
          <select
            value={selectedDestinationKey}
            onChange={(event) => {
              setDestination(locations[event.target.value]);
              setRouteInfo(null);
            }}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          >
            {Object.entries(locations).map(([name]) => (
              <option key={name} value={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Route Mode:</label>
          <select
            value={routeMode}
            onChange={(event) => {
              setRouteMode(event.target.value as TRouteMode);
              setRouteInfo(null);
            }}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          >
            <option value="driving">🚗 Driving</option>
            <option value="walking">🚶 Walking</option>
            <option value="transit">🚌 Transit</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="checkbox" checked={useGPS} onChange={(event) => resetGPSState(event.target.checked)} />
            <span style={{ fontWeight: "bold" }}>Use GPS Location</span>
          </label>
          <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
            Enable to show your current location and calculate routes from GPS.
          </p>
          {useGPS && gpsStatus === "locating" && (
            <p style={{ fontSize: "12px", color: "#0056b3", margin: "8px 0 0" }}>
              Locating your device... allow location permission in the browser.
            </p>
          )}
        </div>

        {gpsLocation && (
          <div style={{ padding: "12px", backgroundColor: "#d4edda", borderRadius: "4px", marginBottom: "20px" }}>
            <h4 style={{ marginTop: 0, color: "#155724" }}>📍 GPS Location</h4>
            <p style={{ margin: "8px 0", fontSize: "14px" }}><strong>Latitude:</strong> {gpsLocation.latitude.toFixed(4)}</p>
            <p style={{ margin: "8px 0", fontSize: "14px" }}><strong>Longitude:</strong> {gpsLocation.longitude.toFixed(4)}</p>
          </div>
        )}

        {gpsError && (
          <div style={{ padding: "12px", backgroundColor: "#f8d7da", borderRadius: "4px", marginBottom: "20px" }}>
            <h4 style={{ marginTop: 0, color: "#721c24" }}>⚠️ GPS/Route Error</h4>
            <p style={{ margin: "8px 0", fontSize: "14px", color: "#721c24" }}>{gpsError}</p>
          </div>
        )}

        <div style={{ padding: "12px", backgroundColor: "#e7f3ff", borderRadius: "4px" }}>
          <h4 style={{ marginTop: 0 }}>📍 Current Route</h4>
          <p style={{ margin: "8px 0", fontSize: "14px" }}>
            <strong>From:</strong> {useGPS
              ? gpsLocation
                ? `DEVICE GPS (${gpsLocation.latitude.toFixed(4)}, ${gpsLocation.longitude.toFixed(4)})`
                : "DEVICE GPS"
              : selectedSourceKey.toUpperCase()}
          </p>
          <p style={{ margin: "8px 0", fontSize: "14px" }}>
            <strong>To:</strong> {selectedDestinationKey.toUpperCase()}
          </p>
          <p style={{ margin: "8px 0", fontSize: "14px" }}><strong>Mode:</strong> {routeMode.toUpperCase()}</p>
          <p style={{ margin: "8px 0", fontSize: "14px" }}>
            <strong>Distance:</strong> {routeInfo
              ? `${routeInfo.distance.toFixed(2)} km${routeInfo.isFallback ? " (straight line)" : ""}`
              : "Calculating..."}
          </p>
          <p style={{ margin: "8px 0", fontSize: "14px" }}>
            <strong>Duration:</strong> {routeInfo ? formatRouteDuration(routeInfo.duration) : "Calculating..."}
          </p>
          <p style={{ margin: "8px 0", fontSize: "14px" }}><strong>Drawer:</strong> {drawerPosition.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};
