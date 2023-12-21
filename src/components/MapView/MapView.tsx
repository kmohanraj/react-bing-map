import React, { useEffect } from 'react';
import useBingMaps, { TMapView } from '../../hooks/useBingMaps';
// const logo: string = require("../assets/legend-f.svg");
// import * as logo from 'logo.svg'
// const logo = require("../../assets/legend-f.svg") as string;

interface MapProps {
  mapType?: string;
  bingKey?: string;
  centerLocation?: [number, number];
  zoom: number;
  pushPins: [];
  pushPinIcon: string;
  showScalebar: boolean;
  showCopyright: boolean;
  showLogo: boolean;
  disableZooming: boolean;
  showBreadcrumb: boolean;
  showLocateMeButton: boolean;
  showZoomButtons: boolean;
  showMapTypeSelector: boolean;
}

export const MapView = ({
  mapType = '',
  bingKey = '',
  centerLocation = [0, 0],
  zoom = 0,
  pushPins = [],
  pushPinIcon = '',
  showScalebar = true,
  showCopyright = true,
  showLogo = true,
  disableZooming = false,
  showBreadcrumb = true,
  showLocateMeButton = true,
  showZoomButtons = true,
  showMapTypeSelector = true
}: MapProps) => {

  const mapView: TMapView = {
    mapType: mapType,
    bingKey: bingKey,
    centerLocation: centerLocation,
    zoom: zoom,
    pushPins: pushPins,
    pushPinIcon: pushPinIcon ?? pushPinIcon,
    showScalebar: showScalebar,
    showCopyright: showCopyright,
    showLogo: showLogo,
    disableZooming: disableZooming,
    showBreadcrumb: showBreadcrumb,
    showLocateMeButton: showLocateMeButton,
    showZoomButtons: showZoomButtons,
    showMapTypeSelector: showMapTypeSelector
  };
  const [myWindow, initMap] = useBingMaps(mapView);
  myWindow.initMap = initMap;

  useEffect(() => {
    if (!document.querySelector('[data-bing="true"]')) {
      const scriptTag = document.createElement('script');
      scriptTag.src =
        'https://www.bing.com/api/maps/mapcontrol?callback=initMap';
      scriptTag.async = true;
      scriptTag.dataset.bing = 'true';
      document.body.appendChild(scriptTag);
    }
  }, [initMap]);

  return (
    <div
      id='bing-map'
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
    ></div>
  );
};
