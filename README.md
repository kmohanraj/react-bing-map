## React - Bing Map


## Prerequisites

To fully utilize this component, you need a Bing Maps API key, which can be obtained from the [Bing Maps Dev Center](https://www.bingmapsportal.com).

## Installation

```
yarn add react-bing-map

OR

npm i react-bing-map
```

## Usage

#### Import the BingMapsReact component.

Import the Bing Maps component

```js
import { BingMaps } from "react-bing-map";
```

#### Customized Example:

```js
 <BingMaps
  mapType=''
  bingKey='key'
  centerLocation={[28.6448, 77.216721]}
  language={'en-IN'}
  zoom ={0}
  pushPins= {[]}
  pushPinIcon=''
  showScalebar={true}
  showCopyright={true}
  showLogo={true}
  disableZooming={false}
  showBreadcrumb={true}
  showLocateMeButton={true}
  showZoomButtons={true}
  showMapTypeSelector={true}
/>
```

#### Output:

![screenshot](/output.png)
