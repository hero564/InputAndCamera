import type { Camera } from "./Camera";
import { createInputState, type InputState } from "./InputState";

export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2
}

const MouseButtonMap = [MouseButton.Left, MouseButton.Middle, MouseButton.Right];

export class Mouse {
    private _x: number = 0;
    private _y: number = 0;
    private _wheelDeltaAccX: number = 0;
    private _wheelDeltaAccY: number = 0;
    private _lastWheelDeltaX: number = 0;
    private _lastWheelDeltaY: number = 0;
    private _inputStates: Map<MouseButton, InputState> = new Map();

    constructor(private canvas: HTMLCanvasElement) {
        this._inputStates.set(MouseButton.Left, createInputState());
        this._inputStates.set(MouseButton.Middle, createInputState());
        this._inputStates.set(MouseButton.Right, createInputState());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this._x = e.clientX - rect.left;
            this._y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mousedown', (e) => {
            const button = MouseButtonMap[e.button];
            if (!button) {
                return;
            }
            const state = this._inputStates.get(button);
            if(!state) {
                return;
            }
            state.isDown = true;
        });

        this.canvas.addEventListener('wheel', (e) => {
            this._wheelDeltaAccX += e.deltaX;
            this._wheelDeltaAccY += e.deltaY;
        });

        this.canvas.addEventListener('mouseup', (e) => {
            const button = MouseButtonMap[e.button];
            if (!button) {
                return;
            }
            const state = this._inputStates.get(button);
            if(!state) {
                return;
            }
            state.isDown = false;
        });
    }

    public update(): void {
        this._inputStates.forEach((state) => {
            state.isPressed = !state.isDownPrev && state.isDown;
            state.isReleased = !state.isDown && !state.isReleasedPrev;
            state.isDownPrev = state.isDown;
            state.isReleasedPrev = state.isReleased;
        });
        this._lastWheelDeltaX = this._wheelDeltaAccX;
        this._lastWheelDeltaY = this._wheelDeltaAccY;
        this._wheelDeltaAccX = 0;
        this._wheelDeltaAccY = 0;
    }

    public isPressed(button: MouseButton): boolean {
        const state = this._inputStates.get(button);
        return state ? state.isPressed : false;
    }
    
    public isDown(button: MouseButton): boolean {
        const state = this._inputStates.get(button);
        return state ? state.isDown : false;
    }
    public isReleased(button: MouseButton): boolean {
        const state = this._inputStates.get(button);
        return state ? state.isReleased : false;
    }

    get wheelDeltaX(): number {
        return this._lastWheelDeltaX;
    }

    get wheelDeltaY(): number {
        return this._lastWheelDeltaY;
    }

    public getWorldX(camera: Camera): number {
        return camera.x + this._x / camera.scaleX;
    }

    public getWorldY(camera: Camera): number {
        return camera.y + this._y / camera.scaleY;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}