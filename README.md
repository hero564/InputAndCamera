# ilcm

A lightweight input and camera library for browser canvas applications.

## Features

- **Camera**: 2D camera system with positioning, scaling, and rotation
- **Mouse Input**: Easy mouse tracking and button state management
- **Loop**: Base class for game/animation loops with delta time support

## Installation

```bash
npm install ilcm
```

## Usage

```typescript
import { Camera, Mouse, Loop } from 'ilcm';

// Create a canvas element
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

// Initialize camera
const camera = new Camera(canvas);

// Initialize mouse input
const mouse = new Mouse(canvas);

// Create your game/animation loop
class MyLoop extends Loop {
    constructor(private camera: Camera, private mouse: Mouse) {
        super();
    }

    loop(deltaSeconds: number) {
        // Your game logic here
        console.log(`Delta: ${deltaSeconds}s, Mouse: (${this.mouse.x}, ${this.mouse.y})`);
    }
}

const myLoop = new MyLoop(camera, mouse);
myLoop.start();
```

## API

### Camera

```typescript
new Camera(canvas, width?, height?)
begin(): void          // Start rendering with camera transforms
end(): void            // End rendering with camera transforms
```

Properties:
- `x`, `y`: Camera position
- `width`, `height`: Camera dimensions
- `angleDegrees`: Rotation angle
- `anchorRelX`, `anchorRelY`: Rotation anchor point (0-1)
- `scale`: Uniform scale factor
- `scaleX`, `scaleY`: Individual scale factors

### Mouse

```typescript
new Mouse(canvas)
```

Properties:
- `x`, `y`: Mouse position relative to canvas
- `isButtonDown(button: MouseButton)`: Check if button is pressed
- `isButtonPressed(button: MouseButton)`: Check if button just pressed
- `isButtonReleased(button: MouseButton)`: Check if button just released

Enums:
- `MouseButton.Left`, `MouseButton.Middle`, `MouseButton.Right`

### Loop

```typescript
abstract loop(deltaSeconds: number): void
start(): void  // Start the animation loop
```

## License

ISC

## Author

Volodymyr Kushnir
