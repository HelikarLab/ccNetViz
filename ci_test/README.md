## Required packages

The latest version of Slimer.js works with Firefox 50 - 59.

### Installing a different version of Firefox

You can find old versions of Firefox via this site;
https://ftp.mozilla.org/pub/firefox/releases/

#### Installing

```bash
wget https://ftp.mozilla.org/pub/firefox/releases/58.0/linux-x86_64/en-US/firefox-58.0.tar.bz2
```

Creating a dedicated Firefox directory

```bash
mkdir ~/slimerfox
```

Extracting files the created new directory

```bash
tar -C ~/slimerfox xvjf firefox-58.0.tar.bz2
```

Configuring .bashrc, append the end of the bash profile.

```bash
export SLIMERJSLAUNCHER=~/slimmerfox/firefox/firefox
```

Installing Xvfb (Virtual framebuffer X server for X Version 11)

```bash
sudo apt-get install xvfb
```

## Commands

You must run tests with dedicated test servers. (Test services uses predefined **8125** port.)

```bash
npm run test:server
```

```bash
npm run test
```

## Creating new tests

You need to add only stable and test files into the `ci_test/examples` folder.

The stable file must use to the `/ci_test/lib/ccNetViz.js`

The test file must use to the `/lib/ccNetViz.js`

Also naming are important. The page types(test, stable) need to append before the `.html`.

### Example Usage

`example.stable.html`

```html
<!DOCTYPE html>

<html>
  <head>
    <script src="../lib/ccNetViz.js"></script>
    <style>
      canvas,
      html,
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <script>
      var nodes = [{}, {}, {}, {}];
      var settings = {
        styles: {
          node: {
            texture: '../../examples/images/node.png',
            label: { hideSize: 16 },
          },
          edge: {
            arrow: { texture: '../../examples/images/arrow.png' },
            size: 20,
          },
        },
      };

      var edges = [
        { source: nodes[0], target: nodes[1] },
        { source: nodes[1], target: nodes[2] },
        { source: nodes[2], target: nodes[3] },
      ];

      var canvas = document.createElement('canvas');
      canvas.width = 250;
      canvas.height = 250;
      document.body.appendChild(canvas);
      var graph = new ccNetViz(canvas, settings);
      graph.set(nodes, edges, 'circular').then(() => {
        graph.draw();
      });
    </script>
  </body>
</html>
```

`example.test.html`

```html
<!DOCTYPE html>

<html>
  <head>
    <script src="../../lib/ccNetViz.js"></script>
    <style>
      canvas,
      html,
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <script>
      var nodes = [{}, {}, {}, {}];
      var settings = {
        styles: {
          node: {
            texture: '../../examples/images/node.png',
            label: { hideSize: 16 },
          },
          edge: {
            arrow: { texture: '../../examples/images/arrow.png' },
            size: 20,
          },
        },
      };

      var edges = [
        { source: nodes[0], target: nodes[1] },
        { source: nodes[1], target: nodes[2] },
        { source: nodes[2], target: nodes[3] },
      ];

      var canvas = document.createElement('canvas');
      canvas.width = 250;
      canvas.height = 250;
      document.body.appendChild(canvas);
      var graph = new ccNetViz(canvas, settings);
      graph.set(nodes, edges, 'circular').then(() => {
        graph.draw();
      });
    </script>
  </body>
</html>
```

## Manuals

Xvfb https://www.x.org/releases/X11R7.6/doc/man/man1/Xvfb.1.xhtml

Slimerjs https://docs.slimerjs.org/current/
