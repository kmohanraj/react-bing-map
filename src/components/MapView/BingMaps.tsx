import React, { FC, useEffect, useMemo } from 'react';
import useBingMaps from '../../hooks/useBingMaps';
import { TMapView, TPushPin } from '../../type/component.type';

const BING_SCRIPT_SELECTOR = 'script[data-bing="true"]';
const BING_CALLBACK = '__reactBingMapInit';
const BING_QUEUE = '__reactBingMapPendingInits';
const DEFAULT_CENTER_LOCATION: [number, number] = [0, 0];
const DEFAULT_PUSH_PINS: TPushPin[] = [];

export const BingMaps: FC<TMapView> = ({
  mapType = 'grayscale',
  bingKey = '',
  centerLocation = DEFAULT_CENTER_LOCATION,
  language = 'en-IN',
  zoom = 0,
  pushPins = DEFAULT_PUSH_PINS,
  pushPinIcon = '',
  showScalebar = true,
  showCopyright = true,
  showLogo = true,
  disableZooming = false,
  showBreadcrumb = true,
  showLocateMeButton = true,
  showZoomButtons = true,
  showMapTypeSelector = true,
  mapPosition,
  infoBoxStyle,
  source,
  destination,
  showRoute,
  routeMode = 'driving',
  useGPS = false,
  onGPSLocationFound,
  onGPSError,
  onRouteCalculated,
}) => {
  const mapId = useMemo(
    () => `bing-map-${Math.random().toString(36).slice(2, 11)}`,
    []
  );

  const mapView: TMapView = {
    mapType: mapType,
    bingKey: bingKey,
    centerLocation: centerLocation,
    language: language,
    zoom: zoom,
    pushPins: pushPins,
    pushPinIcon: pushPinIcon,
    showScalebar: showScalebar,
    showCopyright: showCopyright,
    showLogo: showLogo,
    disableZooming: disableZooming,
    showBreadcrumb: showBreadcrumb,
    showLocateMeButton: showLocateMeButton,
    showZoomButtons: showZoomButtons,
    showMapTypeSelector: showMapTypeSelector,
    mapPosition: mapPosition,
    infoBoxStyle: infoBoxStyle,
    source: source,
    destination: destination,
    showRoute: showRoute,
    routeMode: routeMode,
    useGPS: useGPS,
    onGPSLocationFound: onGPSLocationFound,
    onGPSError: onGPSError,
    onRouteCalculated: onRouteCalculated,
  };
  const initMap = useBingMaps({ ...mapView, mapId });

  useEffect(() => {
    const myWindow = window as any;
    const pendingInits = (myWindow[BING_QUEUE] ?? []) as Array<() => void>;
    const runInit = () => {
      initMap();
    };

    if (myWindow.Microsoft?.Maps) {
      runInit();
      return;
    }

    myWindow[BING_QUEUE] = [...pendingInits, runInit];
    myWindow[BING_CALLBACK] = () => {
      const callbacks = (myWindow[BING_QUEUE] ?? []) as Array<() => void>;
      callbacks.forEach((callback) => callback());
      myWindow[BING_QUEUE] = [];
    };

    if (!document.querySelector(BING_SCRIPT_SELECTOR)) {
      const scriptTag = document.createElement('script');
      scriptTag.src =
        `https://www.bing.com/api/maps/mapcontrol?callback=${BING_CALLBACK}&setLang=${language}`;
      scriptTag.async = true;
      scriptTag.dataset.bing = 'true';
      document.body.appendChild(scriptTag);
    }

    return () => {
      const callbacks = (myWindow[BING_QUEUE] ?? []) as Array<() => void>;
      myWindow[BING_QUEUE] = callbacks.filter((callback) => callback !== runInit);
    };
  }, [initMap, language]);

  return (
    <div
      id={mapId}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
    />
  );
};
