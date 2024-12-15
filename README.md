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
  mapType="grayscale"
  bingKey="key"
  centerLocation={[28.6448, 77.216721]}
  language="en-IN"
  zoom={0}
  pushPins={[]}
  mapPosition={ north: 49.234, south: 24.175, east: -65.573, west: -125.778 }
  infoBoxStyle={ maxWidth: 490, maxHeight: 600 }
  pushPinIcon=""
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

##### Props Details

#### 1. mapType

Following options are available to use based on requirements

```js
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
];
```

#### 2. bingKey

Get the keys from the Bing Maps Dev Portal and use them.

#### 3. centerLocation

It is used to set the map position at the center of the browser screen like the output image.

```js
centerLocation={[28.6448, 77.216721]}
```

#### 4. language

It is used to define the map language based on specific needs.

```js
language = "en-IN";
```

#### 5. zoom

We can customize the zoom level of the map and support min 1 and max 19

```js
  zoom={0}
```

#### 6. pushPins

It is a list of array objects, and the structure should be as follows

```json
{
  "icon": "",
  "location": {
    "latitude": 13.067439,
    "longitude": 80.237617
  },
  "content": {
    "title": "Chennai",
    "description": `html or simple text`
  }
}
```

##### 1. icon

This icon used to show the category based pushpin we can use it or else set empty sting and use the `pushPinIon`key for global icon.

The content of the description should be like the inner HTML content below

##### 2. content

The content structure looks like the one below

```json

 "content": {
    "title": "Chennai",
    "description": `
      <div class="pin-detail">
        <section>
          <div class="name">Partner:</div>
          <div class="value">
            1067207 <span id="copy_42" class="copy-section"></span>
          </div>
        </section>
      </div>
    `
  }

```

or else use this simple description

```js
 "content": {
    "title": "Chennai",
    "description": "Description"
  }
```

#### 7. pushPinIcon

It is used for global pushpin icon

```js
pushPinIcon = "url";
```

#### 8. mapPosition

#### 9. infoBoxStyle

It is used to customize the infoBox maxWidth and maxHeight

```js
  infoBoxStyle={ maxWidth: 490, maxHeight: 600 }
```
![alt text](<infoBox.png>)

#### Output:

![screenshot](/output.png)
