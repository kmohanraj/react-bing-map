# React Bing Map

A React + TypeScript wrapper for Bing Maps with pushpins, infoboxes, route navigation, device GPS support, route distance, route duration, and a ready-to-use route selection panel.

## Features

- Render Bing Maps in React applications.
- Add multiple pushpins with custom icons and infobox content.
- Draw routes between a `source` and `destination`.
- Use the browser/device current location as the route source.
- Receive route distance and duration with `onRouteCalculated`.
- Use `RouteSelectionWithGPS` for a built-in route form and map layout.
- Position the route drawer on the `left`, `right`, `top`, or `bottom`.
- Supports React `16`, `17`, `18`, and `19`.

## Prerequisites

You need a Bing Maps API key from the [Bing Maps Dev Center](https://www.bingmapsportal.com).

GPS/current-location features require a secure browser context:

- `localhost` during development
- `https://` in production

The browser user must also allow location permission.

## Installation

```sh
npm install react-bing-map
```

```sh
yarn add react-bing-map
```

## Basic Usage

```tsx
import { BingMaps } from "react-bing-map";

export const App = () => {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <BingMaps
        bingKey="YOUR_BING_MAPS_KEY"
        mapType="grayscale"
        centerLocation={[28.6448, 77.216721]}
        zoom={6}
      />
    </div>
  );
}
```

The parent container should have a height and `position: "relative"` because the map fills its parent.

## Pushpins and Infoboxes

```tsx
import { BingMaps } from "react-bing-map";

const pushPins = [
  {
    icon: "",
    location: {
      latitude: 28.6448,
      longitude: 77.216721,
    },
    content: {
      title: "Delhi",
      description: "Simple text or HTML content",
    },
  },
];

export const MapWithPins = () => {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <BingMaps
        bingKey="YOUR_BING_MAPS_KEY"
        mapType="road"
        centerLocation={[28.6448, 77.216721]}
        zoom={8}
        pushPins={pushPins}
        pushPinIcon=""
        infoBoxStyle={{ maxWidth: 490, maxHeight: 600 }}
      />
    </div>
  );
}
```

## Route Navigation

Use `source`, `destination`, and `showRoute` to draw a route between two coordinates.

```tsx
import { BingMaps } from "react-bing-map";

const source = { latitude: 13.0827, longitude: 80.2707 }; // Chennai
const destination = { latitude: 12.9716, longitude: 77.5946 }; // Bangalore

export function RouteMap() {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <BingMaps
        bingKey="YOUR_BING_MAPS_KEY"
        mapType="road"
        source={source}
        destination={destination}
        showRoute={true}
        routeMode="driving"
        zoom={6}
        onRouteCalculated={(routeInfo) => {
          console.log("Distance:", routeInfo.distance, routeInfo.distanceUnit);
          console.log("Duration in seconds:", routeInfo.duration);
        }}
      />
    </div>
  );
}
```

Route modes:

```ts
type TRouteMode = "driving" | "walking" | "transit";
```

## Use Current Location as Source

Set `useGPS={true}` with a `destination`. The component gets the browser/device location and uses it as the route source.

```tsx
import { BingMaps } from "react-bing-map";

const destination = { latitude: 12.9716, longitude: 77.5946 }; // Bangalore

export function CurrentLocationRoute() {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <BingMaps
        bingKey="YOUR_BING_MAPS_KEY"
        mapType="road"
        destination={destination}
        showRoute={true}
        useGPS={true}
        routeMode="driving"
        onGPSLocationFound={(location) => {
          console.log("Device location:", location);
        }}
        onGPSError={(error) => {
          console.error(error);
        }}
        onRouteCalculated={(routeInfo) => {
          console.log(`${routeInfo.distance.toFixed(2)} km`);
        }}
      />
    </div>
  );
}
```

If GPS is unavailable or permission is denied, `onGPSError` is called. If `source` is also provided, the component can fall back to routing from `source` to `destination`.

## Route Selection Component

`RouteSelectionWithGPS` is a ready-made map + route form component. It includes source selection, destination selection, a `Current Location` source option, GPS checkbox, route mode selector, route summary, distance, duration, and drawer positioning.

```tsx
import { RouteSelectionWithGPS } from "react-bing-map";

export function RoutePlanner() {
  return (
    <RouteSelectionWithGPS
      bingKey="YOUR_BING_MAPS_KEY"
      drawerPosition="right"
      mapType="grayscale"
      zoom={5}
    />
  );
}
```

### Custom Locations

```tsx
import { RouteSelectionWithGPS } from "react-bing-map";

const locations = {
  chennai: { latitude: 13.0827, longitude: 80.2707 },
  bangalore: { latitude: 12.9716, longitude: 77.5946 },
  hyderabad: { latitude: 17.385, longitude: 78.4867 },
};

export function CustomRoutePlanner() {
  return (
    <RouteSelectionWithGPS
      bingKey="YOUR_BING_MAPS_KEY"
      locations={locations}
      initialSourceKey="chennai"
      initialDestinationKey="bangalore"
      drawerPosition="bottom"
      mapType="road"
    />
  );
}
```

### Drawer Positions

```tsx
<RouteSelectionWithGPS drawerPosition="left" />
<RouteSelectionWithGPS drawerPosition="right" />
<RouteSelectionWithGPS drawerPosition="top" />
<RouteSelectionWithGPS drawerPosition="bottom" />
```

## `BingMaps` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `bingKey` | `string` | `""` | Bing Maps API key. Required for map and route features. |
| `mapType` | `string` | `"grayscale"` | Bing Maps map type. |
| `centerLocation` | `[number, number]` | `[0, 0]` | Initial map center as `[latitude, longitude]`. |
| `language` | `string` | `"en-IN"` | Bing Maps script language. |
| `zoom` | `number` | `0` | Initial map zoom level. |
| `pushPins` | `TPushPin[]` | `[]` | List of pushpins to render. |
| `pushPinIcon` | `string` | `""` | Global pushpin icon used when an item has no icon. |
| `mapPosition` | `TMapPosition` | US bounds | Initial map bounds. |
| `infoBoxStyle` | `TInfoBoxStyle` | `{ maxWidth: 600, maxHeight: 450 }` | Infobox sizing options. |
| `showScalebar` | `boolean` | `true` | Show or hide scale bar. |
| `showCopyright` | `boolean` | `true` | Show or hide copyright text. |
| `showLogo` | `boolean` | `true` | Show or hide Bing logo. |
| `disableZooming` | `boolean` | `false` | Disable user zoom interaction. |
| `showBreadcrumb` | `boolean` | `true` | Show or hide breadcrumb control. |
| `showLocateMeButton` | `boolean` | `true` | Show or hide locate me button. |
| `showZoomButtons` | `boolean` | `true` | Show or hide zoom buttons. |
| `showMapTypeSelector` | `boolean` | `true` | Show or hide map type selector. |
| `source` | `TLocation` | `undefined` | Route source coordinate. |
| `destination` | `TLocation` | `undefined` | Route destination coordinate. |
| `showRoute` | `boolean` | `false` | Draw route when `source`/GPS and `destination` are available. |
| `routeMode` | `"driving" \| "walking" \| "transit"` | `"driving"` | Route travel mode. |
| `useGPS` | `boolean` | `false` | Use browser/device current location as route source. |
| `onGPSLocationFound` | `(location: TLocation) => void` | `undefined` | Called when GPS location is found. |
| `onGPSError` | `(error: string) => void` | `undefined` | Called when GPS or route calculation fails. |
| `onRouteCalculated` | `(routeInfo: TRouteInfo) => void` | `undefined` | Called with route distance and duration. |

## `RouteSelectionWithGPS` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `bingKey` | `string` | `""` | Bing Maps API key. |
| `drawerPosition` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Position of the route configuration panel. |
| `locations` | `Record<string, TLocation>` | Built-in India city list | Source/destination options shown in the form. |
| `initialSourceKey` | `string` | `"delhi"` | Initial source key from `locations`. |
| `initialDestinationKey` | `string` | `"mumbai"` | Initial destination key from `locations`. |
| `mapType` | `string` | `"grayscale"` | Map type passed to `BingMaps`. |
| `language` | `string` | `"en-IN"` | Map language passed to `BingMaps`. |
| `zoom` | `number` | `5` | Initial map zoom. |
| `disableZooming` | `boolean` | `false` | Disable map zooming. |
| `showScalebar` | `boolean` | `true` | Show scale bar. |
| `showCopyright` | `boolean` | `true` | Show copyright text. |
| `showLogo` | `boolean` | `true` | Show Bing logo. |
| `showBreadcrumb` | `boolean` | `true` | Show breadcrumb control. |
| `showLocateMeButton` | `boolean` | `true` | Show locate me button. |
| `showZoomButtons` | `boolean` | `true` | Show zoom buttons. |
| `showMapTypeSelector` | `boolean` | `true` | Show map type selector. |

## Types

```ts
type TLocation = {
  latitude: number;
  longitude: number;
};

type TMapPosition = {
  north: number;
  south: number;
  east: number;
  west: number;
};

type TPushPin = {
  icon: string | any;
  location: TLocation;
  content: {
    title: string;
    description: HTMLElement | string;
  };
};

type TRouteInfo = {
  source: TLocation;
  destination: TLocation;
  distance: number;
  distanceUnit: "kilometers";
  duration?: number;
  isFallback?: boolean;
};
```

## Map Type Options

```ts
[
  "aerial",
  "canvasDark",
  "canvasLight",
  "birdseye",
  "grayscale",
  "mercator",
  "ordnanceSurvey",
  "road",
  "streetside",
]
```

## Development

```sh
npm install
npm run storybook
npm run build
```

## Troubleshooting

- Make sure `bingKey` is valid and created for a web application.
- Routes require reachable source and destination coordinates.
- GPS requires `localhost` or HTTPS and browser location permission.
- The map fills its parent; always give the parent container a height.
- If route calculation fails, `onRouteCalculated` may return `isFallback: true` with straight-line distance.

## License

MIT
