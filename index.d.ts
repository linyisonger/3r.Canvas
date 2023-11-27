/**
 * Draw a capsule
 */
export declare function drawCapsule(this: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, radius: number): void;
/**
 * Invert image color
 */
export declare function inverseColor(this: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number): void;
/**
 * Image grayscale processing
 */
export declare function grayProcessing(this: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number): void;
/**
 * Draw a rounded Rect
 */
export declare function roundedRect(this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radii: number | number[]): void;
declare global {
    interface CanvasRenderingContext2D {
        /**
         * Draw a capsule
         */
        drawCapsule(this: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, radius: number): void;
        /**
         * Invert image color
         */
        inverseColor(this: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number): void;
        /**
         * Image grayscale processing
         */
        grayProcessing(this: CanvasRenderingContext2D, x?: number, y?: number, w?: number, h?: number): void;
        /**
         * Draw a rounded Rect
         */
        roundedRect(this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radii: number | number[]): void;
    }
}
