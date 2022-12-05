import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Lights
 */
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
 scene.add(ambientLight)
 
 const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
 directionalLight.castShadow = true
 directionalLight.shadow.mapSize.set(1024, 1024)
 directionalLight.shadow.camera.far = 15
 directionalLight.shadow.camera.left = - 7
 directionalLight.shadow.camera.top = 7
 directionalLight.shadow.camera.right = 7
 directionalLight.shadow.camera.bottom = - 7
 directionalLight.position.set(5, 5, 5)
 scene.add(directionalLight)

/**
 * Models
 */
const gltfLoader = new GLTFLoader()
gltfLoader.load("/models/output.glb",
  (gltf) => {
    console.log(gltf.scene.children[0])
    gltf.scene.children[0].children[1].material.size = 2
    scene.add(gltf.scene)
  },
  () => {
    console.log("progress")
  },
  () => {
    console.log("error")
  }
)

// /**
//  * Particles
//  */
// const particleGeometry = new THREE.SphereBufferGeometry(1, 32, 32)
// const particlesMaterial = new THREE.PointsMaterial({
//   size: 0.02,
//   sizeAttenuation: true
// })

// /**
//  * Points
//  */
// const particles = new THREE.Points(particleGeometry, particlesMaterial)
// scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()