# Animation Line Plugin

## Documentation

All animation related options are set in options of ccNetViz:

```js
options = {
  styles: {
    node: {
      // node options...
    },
    edge: {
      // edge options...
      // animation options here
    },
  },
};
const graph = new ccNetViz(canvas, options);
```

### options

<table>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Description</th>
      <th>Values/Example</th>
    </tr>
    <tr>
      <td>animateType</td>
      <td>string</td>
      <td>set animation type on edge</td>
      <td>
        <ul>
          <li>none</li>
          <li>basic</li>
          <li>gradient</li>
          <li>double-gradient</li>
          <li>shape-bubble</li>
          <li>shape-wave</li>
          <li>shape-dot</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>animateColor</td>
      <td>string</td>
      <td>set color of animation part</td>
      <td>
        <ul>
          <li>'rgb(120, 100, 80)'</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>animateSpeed</td>
      <td>float</td>
      <td>set speed of animation markers</td>
      <td>
        <ul>
          <li>1.2</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>animateMaxWidth</td>
      <td>float</td>
      <td>set max width of animation shape when animteType is bubble or wave</td>
      <td>
        <ul>
          <li>25</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>animateDotNum</td>
      <td>int</td>
      <td>set dot numbers when animateType is dot</td>
      <td>
        <ul>
          <li>5</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>animateDotInterval</td>
      <td>float</td>
      <td>set dot intervals when animateType is dot</td>
      <td>
        <ul>
          <li>0.5</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>animateEase</td>
      <td>string</td>
      <td>set easing effects of animations</td>
      <td>
        <ul>
          <li>linear</li>
          <li>sin-in</li>
          <li>sin-out</li>
          <li>sin-inout</li>
          <li>bounce-in</li>
          <li>bounce-out</li>
          <li>bounce-inout</li>
          <li>exp-in</li>
          <li>exp-out</li>
          <li>exp-inout</li>
          <li>circular-in</li>
          <li>circular-out</li>
          <li>circular-inout</li>
          <li>quad-in</li>
          <li>quad-out</li>
          <li>quad-inout</li>
          <li>cubic-in</li>
          <li>cubic-out</li>
          <li>cubic-inout</li>
          <li>quart-in</li>
          <li>quart-out</li>
          <li>quart-inout</li>
          <li>quint-in</li>
          <li>quint-out</li>
          <li>quint-inout</li>
        </ul>
      </td>
    </tr>
</table>

### effects

To get what exact effects of all these options, please refer to examples about edge animation:

- basic animation: http://helikarlab.github.io/ccNetViz/examples/line_animate.html
- advanced animation: http://helikarlab.github.io/ccNetViz/examples/line_animate_complex.html
- dotted animation: http://helikarlab.github.io/ccNetViz/examples/line_animate_dot.html

- animation benchmark: http://helikarlab.github.io/ccNetViz/examples/line_animation_benchmark.html

## Build

```bash
yarn run build
```

This command will generate dist file at `lib/plugins/ccNetViz-animation-edge-plugin.js`

## Usage

When using this plugin to augment ccNetViz's features. You need first import `ccNetViz` liabrary:

```html
<script src="../lib/ccNetViz.js"></script>
```

then simply import this plugin:

```html
<script src="../lib/plugins/ccNetViz-animation-edge-plugin.js"></script>
```

finally, in ccNetViz's options, set animation related configurations.

## Mechanism

Inside code of this plugin, it modifies original ccNetViz's attribute and inject new Element and new Shaders into ccNetViz.

When create ccNetViz object, it already changed with new features added.
