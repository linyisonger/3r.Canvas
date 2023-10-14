import { v2, Vector2 } from 'https://cdn.jsdelivr.net/npm/@3r/tool@1.3.2/index.js';
import { Maths } from 'https://cdn.jsdelivr.net/npm/@3r/tool@1.3.2/index.js';
/**
 * Draw a capsule
 */
export function drawCapsule(x1, y1, x2, y2, radius) {
    // 永远保持正方向
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
CanvasRenderingContext2D.prototype['drawCapsule'] = drawCapsule;
