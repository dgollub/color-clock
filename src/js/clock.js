/*
 * Color Clock using a 7 segment display
 * 
 * Copyright (c) 2018 by Daniel Kurashige-Gollub <daniel@kurashige-gollub.de>
 * 
 * License
 * MIT 2.0
 */

import Segment from './segment';
import Colon from './colon';


export default class Clock {
  constructor(x, y, w, h, padding = 4, color = 'lime') {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pad = padding;
    this.color = color;
  }

  update() {
    const now = new Date();
    const hours = `${now.getHours()}`.padStart(2, '0');
    const minutes = `${now.getMinutes()}`.padStart(2, '0');
    const seconds = `${now.getSeconds()}`.padStart(2, '0');
    
    const { x, y, w, h, pad, color } = this;
    const segW = w / 8 - pad;
    const segH = h;

    const toSegment = (value, index) => {
      const segX = x + (segW + pad) * index;
      const segY = y;
      if (value === ':') {
        return new Colon(segX, segY, segW, segH, color);
      }
      return new Segment(value, segX, segY, segW, segH, color);
    };

    const chars = [
      hours.substring(0, 1), hours.substring(1, 2),
      ':',
      minutes.substring(0, 1), minutes.substring(1, 2),
      ':',
      seconds.substring(0, 1), seconds.substring(1, 2),
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
