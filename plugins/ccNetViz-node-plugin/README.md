## Description

This plugin allows you to add different node styles to your ccNetViz library.

### Supported node styles

- Ellipses - circle - ellipse
- Polygons - triangle - quadrilateral - pentagon - hexagon - heptagon - octagon - nonagon - decagon
- Stars - star-3 - star-4 - star-5 - star-6 - star-7 - star-8 - star-9 - star-10
- Customs - square - vee - tag
- Statistical nodes - DoughnutChart - GaugeChart - PieChart - RadialHistogram

## Basic Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ccNetViz example</title>
    <style type="text/css">
      #container {
        width: 500px;
        height: 500px;
      }
    </style>
    <script src="/lib/plugins/ccNetViz-node-plugin.js"></script>
    <script src="/lib/ccNetViz.js"></script>
  </head>

  <body>
    <canvas id="container" />
    <script>
      var graph = new ccNetViz(document.getElementById('container'), {
        styles: {
          edge: { arrow: { texture: 'images/arrow.png' } },
        },
      });
      var nodes = [
        {
          style: 'triangle',
        },
        {
          style: 'circle',
        },
        {
          style: 'tag',
        },
      ];
      var edges = [
        { source: nodes[0], target: nodes[1] },
        { source: nodes[1], target: nodes[2] },
        { source: nodes[2], target: nodes[1] },
      ];
      graph.set(nodes, edges, 'force');
      graph.draw();
    </script>
  </body>
</html>
```

## Advanced Examples

### Duplicating build-in shapes

```javascript
'red triangle': {
  type: 'Polygon',
  edges: 3,
  textureColor: '#ff0000',
}
```

All of the polygons were created with the edge count. For the detailed configurations read the Documentation section.

### Generating new styles

```javascript
'custom shape': {
  type: 'Custom',
  lines: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 }
  ]
}
```

Custom shapes can create all of the coordinate-based shapes.

### Animations

ccNetViz Node Plugin supports the 3 types of animations.

#### Stroke animation

```javascript
triangle: {
  animation: {
    type: "stroke",
    color: "#ff0000"
  }
}
```

Stroke color and size increase between two colors. Stroke start color is textureColor stroke end color is animation color.

#### Color animation

```javascript
triangle: {
  textureColor: '#333333',
  animation: {
    type: 'color',
    color: '#ff0000'
  }
}
```

For this example, color transition start color is #333333 end color is #ff0000.

#### Size animation

```javascript
triangle: {
  animation: {
    type: 'size';
  }
}
```

Node size increased/decreased every frame.

### Statistical Nodes

#### Doughnut Chart

_Chart ratios sum must be 100. If it less; showing node background. If it more, overwriting texture._

```javascript
{
  type: 'DoughnutChart',
  textureColor: '#ccc',
  chart: [
    { color: '#fcb25c', ratio: 5 },
    { color: '#ef7762', ratio: 15 },
    { color: '#d2584a', ratio: 20 },
    { color: '#e28735', ratio: 25 },
    { color: '#49b483', ratio: 35 },
  ],
  size: 50,
}
```

![node-d](https://user-images.githubusercontent.com/14062599/60178606-9f473780-9824-11e9-8c48-1146183fd659.png)

#### Gauge Chart

_Chart ratios must be range 0-100._

User can change gauge gradient with colorSet parameter.
`colorset: [[0, 128, 0], [255, 255, 0], [255, 0, 0]]`

```javascript
{
  type: 'GaugeChart',
  textureColor: '#ccc',
  size: 50,
  chart: [{ color: '#222', ratio: 33 }]
}
```

![node-g](https://user-images.githubusercontent.com/14062599/60178828-fd741a80-9824-11e9-8ae1-b56455edbfaa.png)

#### Pie Chart

_Chart ratios sum must be 100. If it less; showing node background. If it more, overwriting texture._

```javascript
{
  type: 'PieChart',
  textureColor: '#ccc',
  chart: [
    { color: '#fcb25c', ratio: 5 },
    { color: '#ef7762', ratio: 15 },
    { color: '#d2584a', ratio: 20 },
    { color: '#e28735', ratio: 25 },
    { color: '#49b483', ratio: 35 },
  ],
  size: 50,
}
```

![node-p](https://user-images.githubusercontent.com/14062599/60178922-344a3080-9825-11e9-8895-fac8296ad09c.png)

#### Radial Histogram

_Chart ratios must be range 0-100._

```javascript
{
  type: 'RadialHistogram',
  textureColor: '#ccc',
  chart: [
    { color: '#fcb25c', ratio: 10 },
    { color: '#ef7762', ratio: 30 },
    { color: '#d2584a', ratio: 60 },
    { color: '#e28735', ratio: 80 },
    { color: '#49b483', ratio: 100 },
  ],
  size: 50,
}
```

![node-r](https://user-images.githubusercontent.com/14062599/60179007-55128600-9825-11e9-89cc-d3e2b782530d.png)

## Documentation

### Default Parameters

| Parameters            | Description                              | Type                                        | Default          |
| --------------------- | ---------------------------------------- | ------------------------------------------- | ---------------- |
| size                  | Node size.                               | Integer                                     | 20               |
| textureColor          | Node color.                              | String                                      | rgb(34,67,184)   |
| stroke.size           | Node stroke size.                        | Integer                                     | 0                |
| stroke.color          | Node stroke color.                       | String                                      | rgb(255,255,255) |
| stroke.round          | Rounded shape.                           | Boolean                                     | false            |
| animation.color       | Animation color.                         | String                                      | rgb(0,0,0)       |
| animation.type        | Animation type.                          | String                                      | size             |
| textureGradient       | Array of the gradient points and colors. | Array                                       |                  |
| textureGradient.x     | y                                        | Can able to use only one coordinate system. | Float            | (0-1) Range |
| textureGradient.color | Gradient color.                          | String                                      | textureColor     |

### Ellipse

| Parameters | Description                                            | Type    | Default |
| ---------- | ------------------------------------------------------ | ------- | ------- |
| radiusX    | The ellipse's major-axis radius. Must be non-negative. | Integer | 16      |
| radiusY    | The ellipse's minor-axis radius. Must be non-negative. | Integer | 16      |

### Polygons

| Parameters | Description          | Type    | Default |
| ---------- | -------------------- | ------- | ------- |
| edges      | Polygons edge count. | Integer | 3       |

### Stars

| Parameters | Description                        | Type    | Default |
| ---------- | ---------------------------------- | ------- | ------- |
| spikes     | Stars spike count.                 | Integer | 5       |
| inset      | Stars inset size (radius / inset). | Integer | 2       |

### Custom

| Parameters | Description                                      | Type    | Default |
| ---------- | ------------------------------------------------ | ------- | ------- |
| lines      | Array of lines.                                  | Array   |         |
| lines.x    | Line location at x-axis. It must be a 0-1 range. | Integer | 0       |
| lines.y    | Line location at y-axis. It must be a 0-1 range. | Integer | 0       |

### Statistical nodes

| Parameters  | Description                            | Type    |
| ----------- | -------------------------------------- | ------- |
| chart       | Array of lines.                        | Array   |
| chart.color | Chart color.                           | String  |
| chart.ratio | Chart ratio. It must be a 0-100 range. | Integer |
