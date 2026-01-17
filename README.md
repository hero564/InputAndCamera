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

**Methods:**
- `update(): void` - Updates button state transitions (pressed/released). Must be called once per frame in your loop
- `getWorldX(camera: Camera): number` - Get mouse X position in world coordinates
- `getWorldY(camera: Camera): number` - Get mouse Y position in world coordinates

**Properties:**
- `x`, `y`: Mouse position relative to canvas
- `wheelDeltaX`, `wheelDeltaY`: Mouse wheel delta values (accumulated per frame)

**Button State Methods:**
- `isDown(button: MouseButton): boolean` - Check if button is currently pressed
- `isPressed(button: MouseButton): boolean` - Check if button was just pressed (this frame)
- `isReleased(button: MouseButton): boolean` - Check if button was just released (this frame)

**Enums:**
- `MouseButton.Left` (0)
- `MouseButton.Middle` (1)
- `MouseButton.Right` (2)

**Example:**

```typescript
class MyLoop extends Loop {
    constructor(private camera: Camera, private mouse: Mouse) {
        super();
    }

    loop(deltaSeconds: number) {
        this.mouse.update(); // Must call update each frame
        
        // Screen coordinates
        console.log(`Mouse screen: (${this.mouse.x}, ${this.mouse.y})`);
        
        // World coordinates
        const worldX = this.mouse.getWorldX(this.camera);
        const worldY = this.mouse.getWorldY(this.camera);
        console.log(`Mouse world: (${worldX}, ${worldY})`);
        
        // Mouse wheel
        console.log(`Wheel delta: (${this.mouse.wheelDeltaX}, ${this.mouse.wheelDeltaY})`);
        
        // Button states
        if (this.mouse.isButtonPressed(MouseButton.Left)) {
            console.log('Left click!');
        }
    }
}
```

### Loop

```typescript
abstract loop(deltaSeconds: number): void
start(): void  // Start the animation loop
```

## License

ISC

## Author

Volodymyr Kushnir
