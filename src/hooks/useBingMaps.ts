import { useCallback } from "react";
import { TPushPin, TContent } from "../type/component.type";

const useBingMaps = ({
  mapType = "",
  bingKey = "",
  centerLocation = [0, 0],
  zoom = 0,
  pushPins = [],
  pushPinIcon = "",
  showScalebar = true,
  showCopyright = true,
  showLogo = true,
  disableZooming = false,
  showBreadcrumb = true,
  showLocateMeButton = true,
  showZoomButtons = true,
  showMapTypeSelector = true,
  mapPosition = { north: 49.234, south: 24.175, east: -65.573, west: -125.778 },
  infoBoxStyle = { maxWidth: 600, maxHeight: 450 },
}): [any, any] => {
  let myWindow = window as any;

  const initMap = useCallback(() => {
    let Maps = myWindow.Microsoft.Maps;
    const center = new Maps.Location(centerLocation[0], centerLocation[1]);
    let map = new Maps.Map("#bing-map", {
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
    let infoBox = new Maps.Infobox(map.getCenter(), {
      visible: false,
    });
    infoBox.setMap(map);
    addPushPins(center, infoBox, map, Maps, pushPins);
  }, [pushPins]);

  const addPushPins = (
    center: number[],
    infoBox: any,
    map: any,
    Maps: any,
    pushPins: TPushPin[]
  ) => {
    pushPins?.forEach((item: TPushPin) => {
      let pin = new Maps.Pushpin(item.location, {
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
  return [myWindow, initMap];
};

export default useBingMaps;
