import Trimmer from './glyphTrimmer';

var INF = 1e20;

export default class SpriteGenerator {

    constructor(fontStyle) {
        // Member variables for configurations for font-style and box of the font
        const textSize = fontStyle.size || 23;
        this.fontSize = Math.round(textSize / 4) * 4;
        // Whitespace buffer around a glyph in pixels 
        //TODO : Add more information about this.buffer
        this.buffer = this.fontSize / 8;
        // How many pixels around the glyph shape to use for encoding distance. Bigger radius can have more halo effect.
        // Refer http://www.supergeotek.com/SP_ENG_HTML/label.htm for halo effect
        this.radius = this.fontSize / 3;
        this.cutoff = 0.25;
        this.strokeText = fontStyle.strokeText || false;
        this.fontFamily = fontStyle.family || 'sans-serif';
        // this.fontFamily = 'sans-serif';
        // this.fontFamily = 'vedana';
        // this.fontFamily = 'arial';
        this.fontWeight = fontStyle.weight || 'normal';
        // this.fontWeight = 'normal';
        // this.fontWeight = 'bold';
        // Size of one box of character
        let size = this.size = this.fontSize + this.buffer * 2;

        // Member varaibles for single canvas element on which single character is to be drawn
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = size;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'black';
        
        // Work-around: https://bugzilla.mozilla.org/show_bug.cgi?id=737852
        this.middle = Math.round((size / 2) * (navigator.userAgent.indexOf('Gecko/') >= 0 ? 1.2 : 1));


        // Member variables for temp arrays required for the distance transform
        this.gridOuter = new Float64Array(size * size);
        this.gridInner = new Float64Array(size * size);
        this.f = new Float64Array(size);
        this.z = new Float64Array(size + 1);
        this.v = new Uint16Array(size);

        // Glyph Trimmer
        this.trimmer = new Trimmer(0);
        this.count = 1;
    }

    // Convert alpha-only to RGBA so we can use convenient
    // `putImageData` for building the composite bitmap

    _makeRGBAImageData(alphaChannel, width, height) {
        let imageData = this.ctx.createImageData(width, height);
        let data = imageData.data;
        for (let i = 0; i < alphaChannel.length; i++) {
            data[4 * i + 0] = alphaChannel[i];
            data[4 * i + 1] = alphaChannel[i];
            data[4 * i + 2] = alphaChannel[i];
            data[4 * i + 3] = 255;
        }
        return imageData;
    }

    // Returns the alpha channel for a single character
    draw(char) {
        // Clear the area and draw the glyph
        this.ctx.clearRect(0, 0, this.size, this.size);
        this.strokeText ? this.ctx.strokeText(char, this.buffer, this.middle) : this.ctx.fillText(char, this.buffer, this.middle)
        let imgData = this.ctx.getImageData(0, 0, this.size, this.size);
        let alphaChannel = new Uint8ClampedArray(this.size * this.size);

        for (let i = 0; i < this.size * this.size; i++) {
            let a = imgData.data[i * 4 + 3] / 255; // alpha value
            this.gridOuter[i] = a === 1 ? 0 : a === 0 ? INF : Math.pow(Math.max(0, 0.5 - a), 2);
            this.gridInner[i] = a === 1 ? INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
        }

        this._edt(this.gridOuter, this.size, this.size, this.f, this.v, this.z);
        this._edt(this.gridInner, this.size, this.size, this.f, this.v, this.z);

        for (let i = 0; i < this.size * this.size; i++) {
            var d = Math.sqrt(this.gridOuter[i]) - Math.sqrt(this.gridInner[i]);
            alphaChannel[i] = Math.max(0, Math.min(255, Math.round(255 - 255 * (d / this.radius + this.cutoff))));
        }

        const glyph = {
            id: char.charCodeAt(0),
            bitmap: alphaChannel,
            left: 0,
            top: 0,
            width: this.size,
            height: this.size,
            advance: 4, // width
        };
        
        if(glyph.id !== 32) {
            this.trimmer.process(glyph);
        }

        // TODO: Delete this debugging code
        if (glyph.id == 65 && this.count) {
            const glyphData = glyph.bitmap;
            const numCols = glyph.width;
            let t = [];
            // iterate through every row
            for (let i = 0; i < glyphData.length; i += numCols) {
                // slice out the array
                t.push(Array.from(glyphData.slice(i, i + numCols)));
            }
            this.count--;
        }
        return glyph;
    }

    // 2D Euclidean squared distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/papers/dt-final.pdf
    
    _edt(data, width, height, f, v, z) {
    for (var x = 0; x < width; x++) this._edt1d(data, x, width, height, f, v, z);
    for (var y = 0; y < height; y++) this._edt1d(data, y * width, 1, width, f, v, z);
    }

    // 1D squared distance transform
    
    _edt1d(grid, offset, stride, length, f, v, z) {
    var q, k, s, r;
    v[0] = 0;
    z[0] = -INF;
    z[1] = INF;

    for (q = 0; q < length; q++) f[q] = grid[offset + q * stride];

    for (q = 1, k = 0, s = 0; q < length; q++) {
        do {
            r = v[k];
            s = (f[q] - f[r] + q * q - r * r) / (q - r) / 2;
        } while (s <= z[k--]);

        k += 2;
        v[k] = q;
        z[k] = s;
        z[k + 1] = INF;
    }

    for (q = 0, k = 0; q < length; q++) {
        while (z[k + 1] < q) k++;
        r = v[k];
        grid[offset + q * stride] = f[r] + (q - r) * (q - r);
        }
    }
} 
