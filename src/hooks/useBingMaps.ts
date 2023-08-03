import { useState, FC, useCallback, useEffect } from 'react';

type DescriptionType = {
  name: string;
};

type ContentType = {
  title: string;
  description: DescriptionType;
};

type IContent = {
  title: string;
  description: DescriptionType;
};

type TPushPin = {
  icon: string;
  center: {};
  content: IContent;
};

export type TMapView = {
  mapType?: string;
  bingKey: string;
  centerLocation?: [number, number];
  zoom?: number;
  pushPins?: [];
  pushPinIcon?: any;
};

const useBingMaps = ({
  mapType = '',
  bingKey = '',
  centerLocation = [0, 0],
  zoom = 0,
  pushPins = [],
  pushPinIcon = ''
}): [any, any] => {
  let myWindow = window as any;
  const initMap = useCallback(() => {
    let Maps = myWindow.Microsoft.Maps;
    var map = new Maps.Map('#bing-map', {
      credentials: bingKey,
      center: new Maps.Location(centerLocation[0], centerLocation[1]),
      mapTypeId: Maps.MapTypeId[mapType],
      showLogo: false,
      zoom: Number(zoom)
    });
    let infoBox = new Maps.Infobox(map.getCenter(), {
      visible: false
    });
    infoBox.setMap(map);
    addPushPins(map, infoBox, Maps);
  }, []);

  const addPushPins = (map: any, infoBox: any, Maps: any) => {
    for (let ele in pushPins) {
      let pin = new Maps.Pushpin(centerLocation, pushPinIcon);
      const data: ContentType = pushPins[ele]['content'];
      handleOnInfoBox(map, pin, infoBox, data, Maps);
    }
  };

  const handleOnInfoBox = (
    map: any,
    pin: any,
    infoBox: any,
    data: ContentType,
    Maps: any
  ) => {
    Maps.Events.addHandler(pin, 'click', (e: any) => {
      infoBox.setOptions({
        visible: true,
        location: e.target.getLocation(),
        title: data.title,
        description: data.description.name
      });
    });
    map.entities.push(pin);
    const zoomLevel = getZoomLevel(100, map.getCenter().latitude, 350, 250);
    map.setView({
      center: centerLocation,
      zoom: zoomLevel,
      padding: 100,
      strokeOpacity: 0.6
    });
  };

  const getZoomLevel = (
    radius: any,
    latitude: any,
    heightOfMapInPixels: any,
    widthOfMapInPixels: any
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
