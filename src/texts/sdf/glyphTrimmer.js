/* Algorithm to trim the glyph and add padding to it */
// Finding absolute left bound (lb) and right bound (rb) of the glyph
// Slicing the extra columns
// Adding buffer space on the sides

export default class {
    constructor(buffer) {
        this.buffer = buffer || 3;
    }
    
    // find lb and rb of single row
    _findRowBounds(a) { // a == array
        let lb = 0, // left bound of individual row
            rb = 0; // right bound of individual row
        for (let i = 0; i < a.length; i++) {
            if (a[i]) {
                lb = i;
                break;
            }
        }
        if (!lb) lb = a.length;

        for (let i = a.length; i > -1; i--) {
            if (a[i]) {
                rb = i;
                break;
            }
        }
        if (!rb) rb = -1;

        return [lb, rb];
    }

    _findGlyphBounds(glyph) {
        const glyphData = glyph.bitmap;
        const numCols = glyph.width;
        let currentRow = [];
        let lbs = [], // row left bounds
            rbs = []; // row right bounds
        // iterate through every row
        for (i = 0; i < glyphData.length; i += numCols) {
            // slice out the array
            currentRow = glyphData.slice(i, i + numCols)
            var res = _findRowBounds(currentRow);
            lbs.push(res[0]);
            rbs.push(res[1]);
        }

        // choose the min(lbs) and max(rbs) as absolute lb and rb
        lb = Math.min(...lbs);
        rb = Math.max(...rbs);
        if (lb >= numCols || rb < 0) throw "Glyph is empty";
        return [lb, rb];
    }

    process(glyph) {
        const glyphData = glyph.bitmap;
        const numCols = glyph.width;

        const bounds = _findGlyphBounds(glyph);
        const lb = bounds[0];
        const rb = bounds[1];
        const buffer = this.buffer;
        
        var newData = [];
        var newWidth = (rb - lb + 1) + buffer * 2;

        // iterate through every row
        let currentRow = [];
        for (i = 0; i < glyphData.length; i += numCols) {
            currentRow = glyphData.slice(i, i + numCols)
            newData.push(
                ...Array.apply(null, Array(buffer)).map(Number.prototype.valueOf, 0), //returns array of zeros
                ...currentRow.slice(lb, rb + 1),
                ...Array.apply(null, Array(buffer)).map(Number.prototype.valueOf, 0), //returns array of zeros
            );
        }

        // JS passes objects by reference. Therefore,
        glyph.bitmap = new Uint8ClampedArray(newData);
        glyph.width = newWidth;
    }    
    
} // ends class