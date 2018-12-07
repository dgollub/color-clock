/*
 * Color Clock using a 7 segment display
 * 
 * Copyright (c) 2018 by Daniel Kurashige-Gollub <daniel@kurashige-gollub.de>
 * 
 * License
 * MIT 2.0
 */

// based on https://en.wikipedia.org/wiki/Seven-segment_display#Displaying_letters
const DISPLAY_ALPHABET = { 
  "0": 0x7E,
  "1": 0x30,
  "2": 0x6D,
  "3": 0x79,
  "4": 0x33,
  "5": 0x5B,
  "6": 0x5F,
  "7": 0x70,
  "8": 0x7F,
  "9": 0x7B,
  "A": 0x77,
  "b": 0x1F,
  "C": 0x4E,
  "d": 0x3D,
  "E": 0x4F,
  "F": 0x47,
};

//// Class Defintions
export default class DisplayChar {
  constructor(value, x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.value = DISPLAY_ALPHABET[value] || DISPLAY_ALPHABET[`${value}`.toUpperCase()] || false;
    this.color = color || 'lime';

    if (this.value === false) {
      throw new Error(`${value || '<undefined>'} is not supported by DisplayChar/Segment`);
    }
  }

/*
   AAA
  F   B
  F   B
   GGG
  E   C
  E   C
   DDD
*/
  draw(ctx) {
    const {
      w: containerWidth,
      h: containerHeight,
      x: containerX, 
      y: containerY,
      value,
      color, 
    } = this;

    const wsw = (0.75 * containerWidth) / 1;
    const wsh = (0.25 * containerHeight) / 3;
    const tsw = (0.25 * containerWidth) / 2;
    const tsh = (0.75 * containerHeight) / 2;

    const startX = containerX;
    const startY = containerY;

    ctx.fillStyle = color;

    // A
    if ((value >> 6) & 1) {
      ctx.fillRect(startX + tsw, startY, wsw, wsh);
    }
    // B
    if ((value >> 5) & 1) {
      ctx.fillRect(startX + tsw + wsw, startY + wsh, tsw, tsh);
    }
    // C
    if ((value >> 4) & 1) {
      ctx.fillRect(startX + tsw + wsw, startY + wsh * 2 + tsh, tsw, tsh);
    }
    // D
    if ((value >> 3) & 1) {
      ctx.fillRect(startX + tsw, startY + wsh * 2 + tsh * 2, wsw, wsh);
    }
    // E
    if ((value >> 2) & 1) {
      ctx.fillRect(startX, startY + wsh * 2 + tsh, tsw, tsh);
    }
    // F
    if ((value >> 1) & 1) {
      ctx.fillRect(startX, startY + wsh, tsw, tsh);
    }
    // G
    if ((value >> 0) & 1) {
      ctx.fillRect(startX + tsw, startY + wsh + tsh, wsw, wsh);
    }
  }
}
