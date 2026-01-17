export interface InputState {
    isPressed: boolean;
    isDown: boolean;
    isDownPrev: boolean;
    isReleased: boolean;
    isReleasedPrev: boolean;
}

export function createInputState(): InputState {
    return {
        isPressed: false,
        isDown: false,
        isDownPrev: false,
        isReleased: false,
        isReleasedPrev: false
    };
}