const fs = require('fs');
const { exec } = require('child_process');

const http = require('http');
const path = require('path');

// Test structure for the SlimerJS, compare method must be implemented.
class Test {
  constructor(config) {
    this.config = config;
    this.files = this.flag(this.config.FLAG, process.argv);
    this.serve();

    this.temp().then(err => {
      if (err !== null && err !== undefined) {
        this.log(err, false);
      }
      this.log('File list generated', true);

      this.execShellCommand(this.config.COMMAND).then(err => {
        if (err !== null && err !== undefined) {
          this.log(err, false);
        } else {
          this.log('Screenshot capture ended', true);
          this.compare();
        }
      });
    });
  }

  // Executes a shell command and return it as a promise.
  execShellCommand(command) {
    return new Promise(resolve => {
      exec(command, err => {
        resolve(err);
      });
    });
  }

  // Create an HTTP server and serve static HTML files.
  serve() {
    http
      .createServer((request, response) => {
        const filePath = `.${request.url}`;
        const extname = String(path.extname(filePath)).toLowerCase();

        // Supported file extensions
        const mimeTypes = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpg',
          '.gif': 'image/gif',
          '.wav': 'audio/wav',
          '.mp4': 'video/mp4',
          '.woff': 'application/font-woff',
          '.ttf': 'application/font-ttf',
          '.eot': 'application/vnd.ms-fontobject',
          '.otf': 'application/font-otf',
          '.svg': 'application/image/svg+xml',
          '.wasm': 'application/wasm',
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function(error, content) {
          if (error) {
            if (error.code == 'EISDIR') {
              fs.readdir(filePath, (err, files) => {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(JSON.stringify(files), 'utf-8');
              });
            } else {
              response.writeHead(500);
              response.end(String(error.code));
            }
          } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
          }
        });
      })
      .listen(this.config.PORT);
  }

  // Create a temporary test file location Object and return it as a Promise.
  temp() {
    return new Promise(resolve => {
      this.config.TEMP.TEMPLATE = {
        files: this.files,
        port: String(this.config.PORT),
      };

      fs.writeFile(
        this.config.TEMP.PATH,
        `module.exports = ${JSON.stringify(this.config.TEMP.TEMPLATE)}`,
        err => {
          resolve(err);
        }
      );
    });
  }

  // Better logging information with time and color options.
  log(text, status) {
    const time = new Date().toLocaleString('en-US');

    const colors = {
      blue: '\x1b[34m',
      white: '\x1b[0m',
      red: '\x1b[31m',
    };

    if (status === true) {
      console.log(
        `${time} - ${colors.blue}[${this.config.FLAG.toUpperCase()}]${
          colors.white
        } ${text}`
      );
    } else {
      console.log(
        `${time} - ${colors.red}[${this.config.FLAG.toUpperCase()}]${
          colors.white
        } ${text}`
      );
      process.exit(1);
    }
  }

  // Parsing cli flags and return it as an array.
  flag(key, args) {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i].split('=');
      let val = [];
      if (arg[1] !== '') {
        if (arg[0] === key) {
          val = arg[1].split(',');
          if (arg[1][arg[1].length - 1] === ',') val.pop();

          return val;
        }
      }
    }
  }
}

module.exports = Test;
