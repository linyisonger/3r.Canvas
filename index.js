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
 * rgb -> hsv
 */
function rgb2hsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let h = 0;
    let s = 0;
    let v = Math.max(r, g, b);
    let diff = v - Math.min(r, g, b);
    let diffChange = (c) => (v - c) / 6 / diff + 1 / 2;
    if (diff === 0)
        h = s = 0;
    else {
        s = diff / v;
        let tr = diffChange(r);
        let tg = diffChange(g);
        let tb = diffChange(b);
        if (r === v)
            h = tb - tg;
        else if (g === v)
            h = (1 / 3) + tr - tb;
        else if (b === v)
            h = (2 / 3) + tg - tr;
        if (h < 0)
            h += 1;
        else if (h > 1)
            h -= 1;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}
/**
 * hsv -> rgb
 */
function hsv2rgb(l, m, n) {
    let r = 0;
    let g = 0;
    let b = 0;
    if (m === 0) {
        l = m = n = Math.round(255 * n / 100);
        r = l;
        g = m;
        b = n;
    }
    else {
        m /= 100;
        n /= 100;
        let p = Math.floor(l / 60) % 6;
        let f = l / 60 - p;
        let a = n * (1 - m);
        let b = n * (1 - m * f);
        let c = n * (1 - m * (1 - f));
        switch (p) {
            case 0:
                r = n;
                g = c;
                b = a;
                break;
            case 1:
                r = b;
                g = n;
                b = a;
                break;
            case 2:
                r = a;
                g = n;
                b = c;
                break;
            case 3:
                r = a;
                g = b;
                b = n;
                break;
            case 4:
                r = c;
                g = a;
                b = n;
                break;
            case 5:
                r = n;
                g = a;
                b = b;
                break;
        }
        r = Math.round(255 * r);
        g = Math.round(255 * g);
        b = Math.round(255 * b);
    }
    return [r, g, b];
}
function imageData(ctx, { x, y, w, h, effect }) {
    x !== null && x !== void 0 ? x : (x = 0);
    y !== null && y !== void 0 ? y : (y = 0);
    w !== null && w !== void 0 ? w : (w = ctx.canvas.width);
    h !== null && h !== void 0 ? h : (h = ctx.canvas.height);
    const imageData = ctx.getImageData(x, y, w, h);
    for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            const idx = (x + y * imageData.width) * 4;
            const r = imageData.data[idx + 0];
            const g = imageData.data[idx + 1];
            const b = imageData.data[idx + 2];
            const a = imageData.data[idx + 3];
            const e = effect === null || effect === void 0 ? void 0 : effect(r, g, b, a);
            if (e) {
                imageData.data[idx + 0] = e.r;
                imageData.data[idx + 1] = e.g;
                imageData.data[idx + 2] = e.b;
                imageData.data[idx + 3] = e.a;
            }
        }
    }
    ctx.putImageData(imageData, x, y);
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
export function inverseColor({ x, y, w, h }) {
    imageData(this, { x, y, w, h, effect: (r, g, b, a) => Object({ r: 255 - r, g: 255 - g, b: 255 - b, a }) });
}
/**
 * Image grayscale processing
 */
export function grayProcessing({ x, y, w, h }) {
    imageData(this, {
        x, y, w, h, effect: (r, g, b, a) => {
            const gray = .299 * r + .587 * g + .114 * b;
            return { r: gray, g: gray, b: gray, a };
        }
    });
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
/**
 * Image exposure
 */
export function exposure({ x, y, w, h, v }) {
    imageData(this, {
        x, y, w, h, effect: (r, g, b, a) => {
            v !== null && v !== void 0 ? v : (v = 1);
            r = Maths.inRange(r * v, 0, 255);
            g = Maths.inRange(g * v, 0, 255);
            b = Maths.inRange(b * v, 0, 255);
            return { r, g, b, a };
        }
    });
}
/**
 * Image contrastRatio
 */
export function contrastRatio({ x, y, w, h, v }) {
    imageData(this, {
        x, y, w, h, effect: (r, g, b, a) => {
            v !== null && v !== void 0 ? v : (v = 1);
            r = Maths.inRange((r - 128) * v + 128, 0, 255);
            g = Maths.inRange((g - 128) * v + 128, 0, 255);
            b = Maths.inRange((b - 128) * v + 128, 0, 255);
            return { r, g, b, a };
        }
    });
}
/**
 * Image luminance
 */
export function luminance({ x, y, w, h, v }) {
    imageData(this, {
        x, y, w, h, effect: (r, g, b, a) => {
            v !== null && v !== void 0 ? v : (v = 1);
            const hsv = rgb2hsv(r, g, b);
            hsv[2] *= (1 + v);
            const rgb = hsv2rgb(hsv[0], hsv[1], hsv[2]);
            return { r: rgb[0], g: rgb[1], b: rgb[2], a };
        }
    });
}
CanvasRenderingContext2D.prototype['drawCapsule'] = drawCapsule;
CanvasRenderingContext2D.prototype['inverseColor'] = inverseColor;
CanvasRenderingContext2D.prototype['grayProcessing'] = grayProcessing;
CanvasRenderingContext2D.prototype['roundedRect'] = roundedRect;
CanvasRenderingContext2D.prototype['exposure'] = exposure;
CanvasRenderingContext2D.prototype['contrastRatio'] = contrastRatio;
CanvasRenderingContext2D.prototype['luminance'] = luminance;
