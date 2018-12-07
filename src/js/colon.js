/*
 * Color Clock using a 7 segment display
 * 
 * Copyright (c) 2018 by Daniel Kurashige-Gollub <daniel@kurashige-gollub.de>
 * 
 * License
 * MIT 2.0
 */

export default class Colon {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.color = color || 'lime';
    this.w = w;
    this.h = h;
  }

  draw(ctx) {
    const {
      w: containerWidth,
      h: containerHeight,
      x: containerX, 
      y: containerY,
      color,
    } = this;

    const w = 0.1 * containerWidth;
    const h = 0.1 * containerHeight;

    ctx.fillStyle = color;

    const x1 = containerX + (containerWidth / 2) - w / 2;
    const y1 = containerY + (containerHeight / 2) - h * 1.5;

    const x2 = x1;
    const y2 = y1 + (h * 2);

    ctx.fillRect(x1, y1, w, h);
    ctx.fillRect(x2, y2, w, h);
    // ctx.strokeRect(containerX, containerY, containerWidth, containerHeight);
  }
}
