const { Convertor, v2, Vector2, Maths } = await Promise.race([import('https://cdn.jsdelivr.net/npm/@3r/tool@1.4.5/index.js'), import("https://gcore.jsdelivr.net/npm/@3r/tool@1.4.5/index.js")]);
function bin2hex(s) {
    var i, l, o = '', n;
    s += '';
    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i)
            .toString(16);
        o += n.length < 2 ? '0' + n : n;
    }
    return o;
}
/**
 * Get a fingerprint sign
 * @returns
 */
export function fingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    const txt = location.origin;
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    const b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
    const bin = atob(b64);
    return {
        sign: bin2hex(bin.slice(-16, -12))
    };
}
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
        }
    }
    this.putImageData(imageData, x, y);
}
/**
 * Draw a rounded Rect
 */
export function roundedRect(x, y, w, h, radii) {
    this.beginPath();
    const minRadius = 0;
    const maxRadius = Math.min(w, h) / 2;
    let [topLeft, topRight, bottomRight, bottomLeft] = Convertor.fourValueSplit(radii);
    topLeft = topLeft.inRange(minRadius, maxRadius);
    topRight = topRight.inRange(minRadius, maxRadius);
    bottomRight = bottomRight.inRange(minRadius, maxRadius);
    bottomLeft = bottomLeft.inRange(minRadius, maxRadius);
    this.moveTo(x, y + topLeft);
    this.arcTo(x, y, x + topLeft, y, topLeft);
    this.arcTo(x + w, y, x + w, y + topRight, topRight);
    this.arcTo(x + w, y + h, x + w - bottomRight, y + h, bottomRight);
    this.arcTo(x, y + h, x, y + h - bottomLeft, bottomLeft);
    this.closePath();
    this.stroke();
    this.fill();
}
CanvasRenderingContext2D.prototype['drawCapsule'] = drawCapsule;
CanvasRenderingContext2D.prototype['inverseColor'] = inverseColor;
CanvasRenderingContext2D.prototype['grayProcessing'] = grayProcessing;
CanvasRenderingContext2D.prototype['roundedRect'] = roundedRect;
