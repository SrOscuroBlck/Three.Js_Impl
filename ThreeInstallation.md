# Setting up a Basic Three.js Project with Vite

In this guide, we will walk through the process of setting up a new Three.js project using Vite. By the end, you'll have a rotating cube on your screen with interactive controls.

## Prerequisites

Before setting up the Three.js environment, ensure you have the following installed:

1. **Node.js and npm**: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, and npm (Node Package Manager) is its accompanying package manager. Download and install them from the [Node.js official website](https://nodejs.org/).

2. **A Code Editor**: While you can use any text editor, editors like [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), or [Sublime Text](https://www.sublimetext.com/) come with extensions and features that make coding in JavaScript easier and more intuitive.


3.  **Vite**: Vite is a new generation of front-end development server and bundler. It is incredibly fast, lightweight, and provides a rich set of features out of the box. you can learn more about it here: [Vite official website](https://vitejs.dev)

## Installation and Setup

### 1. Create a new Vite project:

```bash
npm create vite@latest
```

When prompted, select the following options:

- Project template: vanilla
- Variant: javascript

As said in console:
- This opens your project directory:
  ```bash
  cd your-project-name
  ```
- This installs all the dependencies
  ```bash
  npm install
  ```
- This runs your project in the url that is provided, normally runs it in: http://localhost:5173/
  ```bash
  npm run dev
  ```

#### Dont forget to install Three.js
Install three
```bash
npm install three
```

### 2. Lets create our first scene:

#### 1. Update the index.html:
Replace the content of your index.html with:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite + Three.js</title>
</head>
<body>
    <script type="module" src="./main.js"></script>
</body>
</html>
```

#### 2. Create or Update the main.js:
Replace or add the following code to your main.js:
```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, wireframeLinewidth: 2 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', function() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();
```

### 3. Run the project:
Now, start the Vite development server:
```bash
npm run dev
```
Navigate to the provided URL in your browser, and you should see a rotating wireframe cube that you can interact with using the mouse.

I hope this was helpful








