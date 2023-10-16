# Three.js Development Environment Setup Guide

Three.js is a popular library for 3D graphics in the web browser. Whether you're new to web development or an experienced developer looking to delve into 3D, this guide will walk you through the process of setting up a development environment for Three.js.

## Prerequisites

Before setting up the Three.js environment, ensure you have the following installed:

1. **Node.js and npm**: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, and npm (Node Package Manager) is its accompanying package manager. Download and install them from the [Node.js official website](https://nodejs.org/).

2. **A Code Editor**: While you can use any text editor, editors like [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), or [Sublime Text](https://www.sublimetext.com/) come with extensions and features that make coding in JavaScript easier and more intuitive.

## Setup Steps

### 1. Create a New Project Directory

Choose a location on your computer where you want to place your Three.js project and create a new directory:

```bash
mkdir my-threejs-project
cd my-threejs-project
```

### 2. Initialize a New Node.js Project

In your project directory, run:

```bash
npm init -y
```

### 3. Install Three.js

Now, install the Three.js library:

```bash
npm install three
```

### 4. Setup a Web Server (Optional)

To run and view Three.js projects locally, it's beneficial to use a local web server.

  - The easiest way is to install LiveServer extension in your VScode or a similar extension in the IDE of your preference.

  - Or just set up serve. Install it globally:

    ```bash
    npm install -g serve
    ```
    
    Once installed, you can navigate to your project directory and run:

    ```bash
    serve .
    ```
    
    This will start a local web server, and you can view your project in a web browser by navigating to the provided URL (typically http://localhost:5000).

## Create Your First Three.js Scene

To get started, let's create a simple scene with a rotating cube. This will give you an idea of how to set up the scene, camera, renderer, and incorporate user controls.

### Step 1: Install Three.js and OrbitControls

Ensure you've already installed `three` as outlined earlier. 

### Step 2: HTML Structure

In your `index.html`, use the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Three.js Cube Scene</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script type="module" src="./app.js"></script>
</body>
</html>
```
Note that we're using type="module" for our script tag, which allows us to use ES6 module imports in our JavaScript file.

### Step 3: JavaScript for Cube and Controls

In your app.js, use the following code:


```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene, camera, and renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube setup
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Camera position
camera.position.z = 5;

// OrbitControls for interactive manipulation of the scene
const controls = new OrbitControls(camera, renderer.domElement);

// Handle window resize
window.addEventListener('resize', function() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();
```
### Step 4: Run the Scene
- If you used LiveServer just open it inside the html code, and you will see the scene.
- If you're using the serve package (or any other local server), start it and navigate to the provided URL to view your interactive cube scene.

#### I hope this was helpful.



