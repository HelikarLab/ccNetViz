/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

/**
 * @class
 * @classdesc Describes color properties that could be given to the shader.
 * @member {number} r
 * @member {number} g
 * @member {number} b
 * @member {number} a
 */


export default class Color {
    constructor(color) {

        // Default value for red, blue and green.
        // Black color is rendered.
        this.r = this.g = this.b = 0;
        this.a = 1;

        if (color instanceof Color) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            this.a = color.a;
        } else if (arguments.length >= 3) {

            // color of the form [0.75, 0.75, 0.65, 0.6] is matched  here.
            // Aplha value is optional.
            this.r = arguments[0];
            this.g = arguments[1];
            this.b = arguments[2];
            arguments.length > 3 && (this.a = arguments[3]);
        } else if (/^rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)$/i.test(color)) {

            // color of the form "rgba(205, 201, 021, 0.5)" is matched here.
            // Aplha value is optional.
            color = /^rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)$/i.exec(color);
            let get = v => parseInt(v, 10) / 255;

            this.r = get(color[1]);
            this.g = get(color[2]);
            this.b = get(color[3]);
            this.a = get(color[4]);
        } else if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(color)) {

            // color of the form "rgb(205, 201, 021)" is matched here.
            color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(color);
            let get = v => parseInt(v, 10) / 255;

            this.r = get(color[1]);
            this.g = get(color[2]);
            this.b = get(color[3]);
        } else if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(color)) {

            // color of the form "rgb(90%, 10%, 20%)" is matched here.
            color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(color);
            let get = v => parseInt(v, 10) / 100;

            this.r = get(color[1]);
            this.g = get(color[2]);
            this.b = get(color[3]);
        } else if (/^\#([0-9a-f]{6})$/i.test(color)) {

            // color is of the form '#23ff74'.
            color = parseInt(color.substring(1), 16);

            // Converts to range [0,1] by using bitwise operator.
            this.r = (color >> 16 & 255) / 255;
            this.g = (color >> 8 & 255) / 255;
            this.b = (color & 255) / 255;
        }
    }
};