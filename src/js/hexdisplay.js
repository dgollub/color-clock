/*
 * Color Clock using a 7 segment display
 * 
 * Copyright (c) 2018 by Daniel Kurashige-Gollub <daniel@kurashige-gollub.de>
 * 
 * License
 * MIT 2.0
 */

import Segment from './segment';
import {
  hexToRgb, rgbToHex, increaseAndWrapAround,
} from './utils';


export default class HexDisplay {
  constructor(x, y, w, h, padding = 4, startColor = '#1230bc') {
    this.color = startColor;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pad = padding;
  }

  update() {
    const { r, g, b } = hexToRgb(this.color);
    
    const { x, y, w, h, pad } = this;
    const segW = w / 6 - pad;
    const segH = h;

    const toSegment = (value, index) => {
      const segX = x + (segW + pad) * index;
      const segY = y;
      return new Segment(value, segX, segY, segW, segH, this.color);
    };

    // update the color to the next one
    const nr = increaseAndWrapAround(0, 255, r);
    const ng = increaseAndWrapAround(0, 255, g);
    const nb = increaseAndWrapAround(0, 255, b);

    this.color = rgbToHex(nr, ng, nb);

    const rr = this.color.substring(1, 3);
    const gg = this.color.substring(3, 5);
    const bb = this.color.substring(5, 7);

    const chars = [
      rr.substring(0, 1), rr.substring(1, 2),
      gg.substring(0, 1), gg.substring(1, 2),
      bb.substring(0, 1), bb.substring(1, 2),
    ];

    this.segments = chars.map((value, index) => toSegment(value, index));
  }

  draw(ctx) {
    const { x, y, w, h, segments } = this;

    for (const segment of segments) {
      segment.draw(ctx);
    }

    // ctx.strokeStyle = 'blue';
    // ctx.strokeRect(x, y, w, h);
  }
}
