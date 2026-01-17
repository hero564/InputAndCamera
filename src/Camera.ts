export class Camera {
    public x: number = 0;
    public y: number = 0;
    public width: number;
    public height: number;
    public anchorRelX: number = 0;
    public anchorRelY: number = 0;
    public angleDegrees: number = 0;
    protected canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, width?: number, height?: number) {
        this.canvas = canvas;
        const canvasSize = this.getCanvasSize();
        this.width = width ?? canvasSize.width;
        this.height = height ?? canvasSize.height;
    }
    
    public begin(): void {
        this.ctx.save();
        this.ctx.translate(-this.x, -this.y);
        this.ctx.scale(this.scaleX, this.scaleY);
        this.ctx.translate(
            -this.anchorRelX * this.width,
            -this.anchorRelY * this.height
        );
        this.ctx.rotate((this.angleDegrees * Math.PI) / 180);
    }

    public end(): void {
        this.ctx.restore();
    }

    get ctx(): CanvasRenderingContext2D {
        const ctx = this.canvas.getContext('2d');
        if(!ctx) throw new Error('2D context not available');
        return ctx;
    }

    set scale(value: number) {
        this.scaleX = value;
        this.scaleY = value;
    }

    set scaleX(value: number) {
        this.width = this.getCanvasSize().width / value;
    }

    get scaleX(): number {
        return this.width / this.getCanvasSize().width;
    }

    set scaleY(value: number) {
        this.height = this.getCanvasSize().height / value;
    }

    get scaleY(): number {
        return  this.height / this.getCanvasSize().height;
    }

    public getCanvasSize(): { width: number; height: number } {
        const canvasRect = this.canvas.getBoundingClientRect();
        return {
            width: canvasRect.width,
            height: canvasRect.height
        };
    }
}