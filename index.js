import { v2, Vector2 } from 'https://cdn.jsdelivr.net/npm/@3r/tool@1.3.2/index.js';
import { Maths } from 'https://cdn.jsdelivr.net/npm/@3r/tool@1.3.2/index.js';
/**
 * Draw a capsule
 */
export function drawCapsule(x1, y1, x2, y2, radius) {
    // Always maintain a positive direction
    const dr = y1 == y2 && x1 > x2 ? -1 : 1;
    const p1 = v2(x1, y1);
    const p2 = v2(x2, y2);
    const p3 = v2(p2.x - p1.x, p2.y - p1.y);
    const xAxis = v2(1, 0);
    const ang = Vector2.includedAngle(p3, xAxis) * -1 + 90 * dr;
    const rad = Maths.degreeToRad(ang);
    this.beginPath();
    this.arc(x1, y1, radius, 0 + rad, Math.PI + rad);
    this.arc(x2, y2, radius, Math.PI + rad, rad);
    this.closePath();
    this.stroke();
    this.fill();
}
/**
 * Invert image color
 */
export function inverseColor(x, y, w, h) {
    x !== null && x !== void 0 ? x : (x = 0);
    y !== null && y !== void 0 ? y : (y = 0);
    w !== null && w !== void 0 ? w : (w = this.canvas.width);
    h !== null && h !== void 0 ? h : (h = this.canvas.height);
    const imageData = this.getImageData(x, y, w, h);
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            const idx = (x + y * imageData.width) * 4;
            imageData.data[idx + 0] = 255 - imageData.data[idx + 0];
            imageData.data[idx + 1] = 255 - imageData.data[idx + 1];
            imageData.data[idx + 2] = 255 - imageData.data[idx + 2];
            imageData.data[idx + 3] = 255;
        }
    }
    this.putImageData(imageData, x, y);
}
/**
 * Image grayscale processing
 */
export function grayProcessing(x, y, w, h) {
    x !== null && x !== void 0 ? x : (x = 0);
    y !== null && y !== void 0 ? y : (y = 0);
    w !== null && w !== void 0 ? w : (w = this.canvas.width);
    h !== null && h !== void 0 ? h : (h = this.canvas.height);
    const imageData = this.getImageData(x, y, w, h);
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            const idx = (x + y * imageData.width) * 4;
            const r = imageData.data[idx + 0];
            const g = imageData.data[idx + 1];
            const b = imageData.data[idx + 2];
            const gray = .299 * r + .587 * g + .114 * b;
            imageData.data[idx + 0] = gray;
            imageData.data[idx + 1] = gray;
            imageData.data[idx + 2] = gray;
            imageData.data[idx + 3] = 255;
        }
    }
    this.putImageData(imageData, x, y);
}
CanvasRenderingContext2D.prototype['drawCapsule'] = drawCapsule;
CanvasRenderingContext2D.prototype['inverseColor'] = inverseColor;
CanvasRenderingContext2D.prototype['grayProcessing'] = grayProcessing;
