/**
 * Draw a capsule
 */
export declare function drawCapsule(this: any, x1: number, y1: number, x2: number, y2: number, radius: number): void;
declare global {
    interface CanvasRenderingContext2D {
        /**
         * Draw a capsule
         */
        drawCapsule(this: any, x1: number, y1: number, x2: number, y2: number, radius: number): void;
    }
}
