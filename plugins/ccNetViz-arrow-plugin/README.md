## Description

This plugin allows you to add different arrow styles to your ccNetViz library.

### Supported arrow styles

- arrow
- arrow short
- delta
- delta short
- diamond
- diamond short
- T
- harpoon up
- harpoon down
- thin arrow

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
    <script src="/lib/plugins/ccNetViz-arrow-plugin.js"></script>
    <script src="/lib/ccNetViz.js"></script>
  </head>

  <body>
    <canvas id="container" />
    <script>
      var graph = new ccNetViz(document.getElementById('container'), {
        styles: {
          node: { texture: 'images/node.png', label: { hideSize: 16 } },
        },
      });
      var nodes = [{ label: 'Hello' }, { label: 'World' }, { label: '!' }];
      var edges = [
        { source: nodes[0], style: 'arrow', target: nodes[1] },
        { source: nodes[1], style: 'diamond', target: nodes[2] },
        { source: nodes[2], style: 'T', target: nodes[1] },
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
'new delta': {
  arrow: {
    type: 'delta',
    textureColor: '#cf0101'
  },
}
```

### Generating new styles

```javascript
'custom arrow': {
  arrow: {
    type: 'custom arrow',
    textureColor: '#cf0101',
    lines: [
      { x: 0.5, y: 0 },
      { x: 1, y: 1 },
      { x: 0.9, y: 1 },
      { x: 0.5, y: 0.7 },
      { x: 0.1, y: 1 },
      { x: 0, y: 1 },
    ],
  },
}
```

Custom shapes can create all of the coordinate-based shapes.

### Animations

ccNetViz Arrow Plugin supports the 3 types of animations.

#### Stroke animation

```javascript
'custom arrow': {
  arrow: {
    animation: {
      type: "stroke",
      color: "#ff0000"
    }
  }
}
```

Stroke color and size increase between two colors. Stroke start color is textureColor stroke end color is animation color.

#### Color animation

```javascript
'custom arrow': {
  arrow: {
    textureColor: '#333333',
    animation: {
      type: 'color',
      color: '#ff0000'
    }
  }
}
```

For this example, color transition start color is #333333 end color is #ff0000.

#### Size animation

```javascript
'custom arrow': {
  arrow: {
    animation:{
      type: 'size'
    }
  }
}
```

Arrow size increased/decreased every frame.

## Documentation

### Arrow Parameters

| Parameters            | Description                                      | Type              | Default          |
| --------------------- | ------------------------------------------------ | ----------------- | ---------------- |
| size                  | Arrow size.                                      | Integer           | 20               |
| textureColor          | Arrow color.                                     | String            | rgb(34,67,184)   |
| stroke.size           | Arrow stroke size.                               | Integer           | 0                |
| stroke.color          | Arrow stroke color.                              | String            | rgb(255,255,255) |
| stroke.round          | Rounded shape.                                   | Boolean           | false            |
| animation.color       | Animation color.                                 | String            | rgb(0,0,0)       |
| animation.type        | Animation type.                                  | String            | size             |
| lines                 | Array of lines.                                  | Array             |                  |
| lines.x               | Line location at x-axis. It must be a 0-1 range. | Integer           | 0                |
| lines.y               | Line location at y-axis. It must be a 0-1 range. | Integer           | 0                |
| textureGradient       | Array of the gradient points and colors.         | Array             |                  |
| textureGradient.x-y   | Can able to use only one coordinate system.      | Float (0-1) Range |                  |
| textureGradient.color | Gradient color.                                  | String            | textureColor     |
