/*
 * Color Clock using a 7 segment display
 * 
 * Copyright (c) 2018 by Daniel Kurashige-Gollub <daniel@kurashige-gollub.de>
 * 
 * License
 * MIT 2.0
 */

import '../css/style.css';

import Segment from './segment';
import Colon from './colon';
import Clock from './clock';
import Hex from './hexdisplay';

import {
  hexToComplimentary,
} from './utils';


//// Globals
const WIDTH = 600;
const HEIGHT = WIDTH / (4 / 3);

//// Utility Functions

function getStartColorFromDate(date) {
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  const seconds = `${date.getSeconds()}`.padStart(2, '0');
 
  return `#${hours}${minutes}${seconds}`; 
}

function createCanvas(parent) {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  parent.appendChild(canvas);

  return canvas;
}

function drawStart(canvas) {
  const ctx = canvas.getContext('2d');

  const padding = 4;

  const clockX = padding;
  const clockY = HEIGHT / 7;
  const clockW = WIDTH - padding * 2;
  const clockH = (HEIGHT / 4) - padding * 2;
  const clock = new Clock(clockX, clockY, clockW, clockH, padding);

  const hexX = padding;
  const hexY = clockY + clockH + padding * 20;
  const hexW = clockW;
  const hexH = clockH;

  const startColor = getStartColorFromDate(new Date());
  const hex = new Hex(hexX, hexY, hexW, hexH, padding, startColor);
  const updatePerSeconds = 10;

  let lastTime = null;
  let bgColor = hexToComplimentary(hex.color);

  function draw() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    const now = new Date();
    if (!lastTime || now - lastTime >= 1000 / updatePerSeconds) {
      hex.update();
      bgColor = hexToComplimentary(hex.color);
      lastTime = new Date();
    }

    hex.draw(ctx);

    clock.color = hex.color;
    clock.update();
    clock.draw(ctx);

    // ctx.strokeStyle = 'red';
    // ctx.strokeRect(0, 0, WIDTH, HEIGHT);

    requestAnimationFrame(draw);
  }

  draw();
}


//// Entry Point

const appDiv = document.getElementById('app');
const canvas = createCanvas(appDiv);

drawStart(canvas);
