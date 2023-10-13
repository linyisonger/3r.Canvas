import { v2, Vector2 } from '@3r/tool/lib/vertor2.js';
import { Maths } from '@3r/tool/lib/maths.js';
/**
 * Draw a capsule
 */
export function drawCapsule(x1, y1, x2, y2, radius) {
    const p1 = v2(x1, y1);
    const p2 = v2(x2, y2);
    const p3 = v2((p2.x + p1.x) / 2, (p2.y + p1.y) / 2);
    const p4 = v2(p2.x - p1.x, p2.y - p1.y);
    const xAxis = v2(1, 0);
    const c1 = Vector2.getPointAtDist(p3, p2, radius);
    const c2 = Vector2.getPointAtDist(p3, p2, -radius);
    const ang = Vector2.includedAngle(p4, xAxis) * -1 - 90;
    const rad = Maths.degreeToRad(ang);
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
Object.defineProperty(CanvasRenderingContext2D.prototype, drawCapsule.name, drawCapsule);
