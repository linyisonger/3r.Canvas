"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCapsule = void 0;
const vertor2_js_1 = require("@3r/tool/lib/vertor2.js");
const maths_js_1 = require("@3r/tool/lib/maths.js");
/**
 * Draw a capsule
 */
function drawCapsule(x1, y1, x2, y2, radius) {
    const p1 = (0, vertor2_js_1.v2)(x1, y1);
    const p2 = (0, vertor2_js_1.v2)(x2, y2);
    const p3 = (0, vertor2_js_1.v2)((p2.x + p1.x) / 2, (p2.y + p1.y) / 2);
    const p4 = (0, vertor2_js_1.v2)(p2.x - p1.x, p2.y - p1.y);
    const xAxis = (0, vertor2_js_1.v2)(1, 0);
    const c1 = vertor2_js_1.Vector2.getPointAtDist(p3, p2, radius);
    const c2 = vertor2_js_1.Vector2.getPointAtDist(p3, p2, -radius);
    const ang = vertor2_js_1.Vector2.includedAngle(p4, xAxis) * -1 - 90;
    const rad = maths_js_1.Maths.degreeToRad(ang);
    this.beginPath();
    this.moveTo(p1.x, p1.y);
    this.lineTo(p2.x, p2.y);
    this.stroke();
    this.beginPath();
    this.arc(c1.x, c1.y, 20, 0 + rad, Math.PI + rad);
    this.arc(c2.x, c2.y, 20, Math.PI + rad, rad);
    this.closePath();
    this.stroke();
    this.fill();
}
exports.drawCapsule = drawCapsule;
Object.defineProperty(CanvasRenderingContext2D.prototype, drawCapsule.name, drawCapsule);
