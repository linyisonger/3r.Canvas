interface ImageDataParams {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    v?: number;
    effect?: (r: number, g: number, b: number, a: number) => {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
/**
 * Get a fingerprint sign
 * @returns
 */
export declare function fingerprint(): {
    sign: string;
} | undefined;
/**
 * Draw a capsule
 */
export declare function drawCapsule(this: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, radius: number): void;
/**
 * Invert image color
 */
export declare function inverseColor(this: CanvasRenderingContext2D, { x, y, w, h }: ImageDataParams): void;
/**
 * Image grayscale processing
 */
export declare function grayProcessing(this: CanvasRenderingContext2D, { x, y, w, h }: ImageDataParams): void;
/**
 * Draw a rounded Rect
 */
export declare function roundedRect(this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radii: number | number[]): void;
/**
 * Image exposure
 */
export declare function exposure(this: CanvasRenderingContext2D, { x, y, w, h, v }: ImageDataParams): void;
/**
 * Image contrastRatio
 */
export declare function contrastRatio(this: CanvasRenderingContext2D, { x, y, w, h, v }: ImageDataParams): void;
/**
 * Image luminance
 */
export declare function luminance(this: CanvasRenderingContext2D, { x, y, w, h, v }: ImageDataParams): void;
declare global {
    interface CanvasRenderingContext2D {
        /**
         * Draw a capsule
         */
        drawCapsule(this: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, radius: number): void;
        /**
         * Invert image color
         */
        inverseColor(this: CanvasRenderingContext2D, params?: ImageDataParams): void;
        /**
         * Image grayscale processing
         */
        grayProcessing(this: CanvasRenderingContext2D, params?: ImageDataParams): void;
        /**
         * Draw a rounded Rect
         */
        roundedRect(this: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radii: number | number[]): void;
        /**
         * Image exposure
         */
        exposure(this: CanvasRenderingContext2D, params?: ImageDataParams): void;
        /**
         * Image contrastRatio
         */
        contrastRatio(this: CanvasRenderingContext2D, params?: ImageDataParams): void;
        /**
         * Image luminance
         */
        luminance(this: CanvasRenderingContext2D, params?: ImageDataParams): void;
    }
}
export {};
