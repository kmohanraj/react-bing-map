import { useCallback, useEffect, useRef } from "react";
import { TPushPin, TContent, TMapView, TLocation, TRouteMode } from "../type/component.type";

const DEFAULT_CENTER_LOCATION: [number, number] = [0, 0];
const DEFAULT_PUSH_PINS: TPushPin[] = [];
const DEFAULT_MAP_POSITION = { north: 49.234, south: 24.175, east: -65.573, west: -125.778 };
const DEFAULT_INFO_BOX_STYLE = { maxWidth: 600, maxHeight: 450 };

const useBingMaps = ({
  mapId,
  mapType = "",
  bingKey = "",
  centerLocation = DEFAULT_CENTER_LOCATION,
  zoom = 0,
  pushPins = DEFAULT_PUSH_PINS,
  pushPinIcon = "",
  showScalebar = true,
  showCopyright = true,
  showLogo = true,
  disableZooming = false,
  showBreadcrumb = true,
  showLocateMeButton = true,
  showZoomButtons = true,
  showMapTypeSelector = true,
  mapPosition = DEFAULT_MAP_POSITION,
  infoBoxStyle = DEFAULT_INFO_BOX_STYLE,
  source,
  destination,
  showRoute = false,
  routeMode = 'driving' as TRouteMode,
  useGPS = false,
  onGPSLocationFound,
  onGPSError,
  onRouteCalculated,
}: TMapView & { mapId: string }): (() => void) => {
  const myWindow = window as any;
  const onGPSLocationFoundRef = useRef(onGPSLocationFound);
  const onGPSErrorRef = useRef(onGPSError);
  const onRouteCalculatedRef = useRef(onRouteCalculated);

  useEffect(() => {
    onGPSLocationFoundRef.current = onGPSLocationFound;
  }, [onGPSLocationFound]);

  useEffect(() => {
    onGPSErrorRef.current = onGPSError;
  }, [onGPSError]);

  useEffect(() => {
    onRouteCalculatedRef.current = onRouteCalculated;
  }, [onRouteCalculated]);

  const initMap = useCallback(() => {
    const Maps = myWindow.Microsoft?.Maps;

    if (!Maps) {
      return;
    }

    const mapElement = document.getElementById(mapId);

    if (!mapElement) {
      return;
    }

    const center = new Maps.Location(centerLocation[0], centerLocation[1]);
    const map = new Maps.Map(mapElement, {
      credentials: bingKey,
      center: center,
      bounds: Maps.LocationRect.fromEdges(
        mapPosition.north,
        mapPosition.west,
        mapPosition.south,
        mapPosition.east
      ),
      mapTypeId: Maps.MapTypeId[mapType],
      zoom: zoom,
      showScalebar: showScalebar,
      showCopyright: showCopyright,
      showLogo: showLogo,
      disableZooming: disableZooming,
      showBreadcrumb: showBreadcrumb,
      showLocateMeButton: showLocateMeButton,
      showZoomButtons: showZoomButtons,
      showMapTypeSelector: showMapTypeSelector,
    });
    const infoBox = new Maps.Infobox(map.getCenter(), {
      visible: false,
    });

    infoBox.setMap(map);
    addPushPins(center, infoBox, map, Maps, pushPins);

    if (showRoute && source && destination && !useGPS) {
      renderRoute(map, Maps, source, destination, bingKey, routeMode);
    }

    // Request GPS location if enabled
    if (useGPS && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const gpsLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log("GPS location found:", gpsLocation);

          // Add GPS location pin
          const gpsPin = new Maps.Pushpin(
            new Maps.Location(gpsLocation.latitude, gpsLocation.longitude),
            {
              color: new Maps.Color(255, 0, 0, 255),
              title: "Current Location (GPS)",
            }
          );
          map.entities.push(gpsPin);

          if (showRoute && destination) {
            renderRoute(map, Maps, gpsLocation, destination, bingKey, routeMode);
          } else {
            // Center map on GPS location
            map.setView({
              center: new Maps.Location(gpsLocation.latitude, gpsLocation.longitude),
              zoom: 14,
            });
          }

          onGPSLocationFoundRef.current?.(gpsLocation);
        },
        (error) => {
          const errorMsg = `GPS Error: ${error.message}`;
          console.error(errorMsg);
          onGPSErrorRef.current?.(errorMsg);

          if (showRoute && source && destination) {
            renderRoute(map, Maps, source, destination, bingKey, routeMode);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else if (showRoute && source && destination) {
      if (useGPS) {
        onGPSErrorRef.current?.("GPS Error: Geolocation is not supported by this browser.");
      }

      renderRoute(map, Maps, source, destination, bingKey, routeMode);
    }
  }, [
    bingKey,
    centerLocation,
    destination,
    disableZooming,
    infoBoxStyle,
    mapId,
    mapPosition,
    mapType,
    pushPinIcon,
    pushPins,
    routeMode,
    showBreadcrumb,
    showCopyright,
    showLocateMeButton,
    showLogo,
    showMapTypeSelector,
    showRoute,
    showScalebar,
    showZoomButtons,
    source,
    useGPS,
    zoom,
  ]);

  const addPushPins = (
    center: any,
    infoBox: any,
    map: any,
    Maps: any,
    pushPins: TPushPin[]
  ) => {
    pushPins?.forEach((item: TPushPin) => {
      const pin = new Maps.Pushpin(item.location, {
        icon: item.icon ? item.icon : pushPinIcon ,
      });

      const data: TContent = item.content;
      handleOnInfoBox(center, data, infoBox, map, Maps, pin);
    });
  };

  const handleOnInfoBox = (
    center: number[],
    data: TContent,
    infoBox: any,
    map: any,
    Maps: any,
    pin: any
  ) => {
    Maps.Events.addHandler(pin, "click", (e: any) => {
      infoBox.setOptions({
        visible: true,
        ...infoBoxStyle,
        location: e.target.getLocation(),
        title: data.title,
        description: data.description,
      });
    });
    map.entities.push(pin);
    const zoomLevel = getZoomLevel(100, map.getCenter().latitude, 350, 250);
    map.setView({
      center: center,
      zoom: zoom ? zoom : zoomLevel,
      padding: 100,
      strokeOpacity: 0.6,
    });
  };

  const getZoomLevel = (
    radius: number,
    latitude: number,
    heightOfMapInPixels: number,
    widthOfMapInPixels: number
  ) => {
    const range = radius * 1.6 * 1000;
    const limitBoundPixels = Math.min(heightOfMapInPixels, widthOfMapInPixels);
    const zoom = Math.floor(
      Math.log(
        (156543.03392 * Math.cos((latitude * Math.PI) / 180)) /
          (range / limitBoundPixels)
      ) / Math.log(2)
    );
    return zoom;
  };

  const calculateStraightLineDistance = (
    sourceLocation: TLocation,
    destinationLocation: TLocation
  ) => {
    const earthRadiusInKilometers = 6371;
    const latitudeDifference = ((destinationLocation.latitude - sourceLocation.latitude) * Math.PI) / 180;
    const longitudeDifference = ((destinationLocation.longitude - sourceLocation.longitude) * Math.PI) / 180;
    const sourceLatitude = (sourceLocation.latitude * Math.PI) / 180;
    const destinationLatitude = (destinationLocation.latitude * Math.PI) / 180;
    const haversineValue =
      Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
      Math.cos(sourceLatitude) *
        Math.cos(destinationLatitude) *
        Math.sin(longitudeDifference / 2) *
        Math.sin(longitudeDifference / 2);
    const angularDistance = 2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

    return earthRadiusInKilometers * angularDistance;
  };

  const renderRoute = (
    map: any,
    Maps: any,
    sourceLocation: TLocation,
    destLocation: TLocation,
    key: string,
    mode: TRouteMode = 'driving'
  ) => {
    const sourceMapLocation = new Maps.Location(sourceLocation.latitude, sourceLocation.longitude);
    const destinationMapLocation = new Maps.Location(destLocation.latitude, destLocation.longitude);

    // Add source pin (green) - always show
    const sourcePin = new Maps.Pushpin(
      sourceMapLocation,
      {
        color: new Maps.Color(255, 0, 204, 0),
        title: "Source",
      }
    );
    map.entities.push(sourcePin);

    // Add destination pin (red) - always show
    const destPin = new Maps.Pushpin(
      destinationMapLocation,
      {
        color: new Maps.Color(255, 255, 0, 0),
        title: "Destination",
      }
    );
    map.entities.push(destPin);

    const fitRouteEndpoints = () => {
      const viewBoundaries = Maps.LocationRect.fromLocations([
        sourceMapLocation,
        destinationMapLocation,
      ]);

      map.setView({
        bounds: viewBoundaries,
        padding: 80,
      });
    };

    const drawFallbackRoute = () => {
      const fallbackLine = new Maps.Polyline([sourceMapLocation, destinationMapLocation], {
        strokeColor: new Maps.Color(230, 0, 102, 204),
        strokeThickness: 5,
      });

      map.entities.push(fallbackLine);
      fitRouteEndpoints();
      onRouteCalculatedRef.current?.({
        source: sourceLocation,
        destination: destLocation,
        distance: calculateStraightLineDistance(sourceLocation, destLocation),
        distanceUnit: 'kilometers',
        isFallback: true,
      });
    };

    fitRouteEndpoints();

    const routeModeMap: Record<TRouteMode, string> = {
      driving: 'Driving',
      walking: 'Walking',
      transit: 'Transit',
    };
    const routeParams = new URLSearchParams({
      'wp.0': `${sourceLocation.latitude},${sourceLocation.longitude}`,
      'wp.1': `${destLocation.latitude},${destLocation.longitude}`,
      routePathOutput: 'Points',
      distanceUnit: 'km',
      key,
    });
    const routeUrl = `https://dev.virtualearth.net/REST/v1/Routes/${routeModeMap[mode] ?? 'Driving'}?${routeParams.toString()}`;

    fetch(routeUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Route request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const route = data.resourceSets?.[0]?.resources?.[0];
        const routePathCoordinates = route?.routePath?.line?.coordinates;

        if (!Array.isArray(routePathCoordinates) || routePathCoordinates.length === 0) {
          throw new Error(data.errorDetails?.[0] || 'No route path returned from Bing Routes API.');
        }

        const routeCoordinates = routePathCoordinates.map(
          (coordinate: number[]) => new Maps.Location(coordinate[0], coordinate[1])
        );
        const routePolyline = new Maps.Polyline(routeCoordinates, {
          strokeColor: new Maps.Color(230, 0, 102, 204),
          strokeThickness: 5,
        });

        map.entities.push(routePolyline);
        onRouteCalculatedRef.current?.({
          source: sourceLocation,
          destination: destLocation,
          distance: Number(route.travelDistance) || calculateStraightLineDistance(sourceLocation, destLocation),
          distanceUnit: 'kilometers',
          duration: route.travelDuration,
          isFallback: false,
        });

        if (route.bbox) {
          map.setView({
            bounds: Maps.LocationRect.fromEdges(route.bbox[0], route.bbox[1], route.bbox[2], route.bbox[3]),
            padding: 80,
          });
          return;
        }

        map.setView({
          bounds: Maps.LocationRect.fromLocations(routeCoordinates),
          padding: 80,
        });
      })
      .catch((error) => {
        console.error('Route render error:', error);
        onGPSErrorRef.current?.(`Route Error: ${error.message}`);
        drawFallbackRoute();
      });
  };

  return initMap;
};

export default useBingMaps;
