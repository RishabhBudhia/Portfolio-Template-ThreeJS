import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//container
const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(field of view (360degree),aspect ratio, view frustum)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(40);

//draw
renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5);
// scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(400).fill().forEach(addStar)

// const spaceTexture = new THREE.TextureLoader().load('space2.jpg');
const spaceTexture = new THREE.TextureLoader().load('https://i.ibb.co/fv5vPXp/space2.jpg');
scene.background = spaceTexture;

// const rishTexture = new THREE.TextureLoader().load('rishabh.jpg')
const rishTexture = new THREE.TextureLoader().load('https://i.ibb.co/fktJ4yQ/rishabh.jpg')
const rish = new THREE.Mesh(
  new THREE.BoxGeometry(3.5, 3.5, 3.5),
  new THREE.MeshBasicMaterial({ map: rishTexture })
)
scene.add(rish);

// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moonTexture = new THREE.TextureLoader().load('https://i.ibb.co/SRvWDZD/moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const normalTexture = new THREE.TextureLoader().load('https://i.ibb.co/mtqKxkP/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

rish.position.z = -6;
rish.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.05;
  moon.rotation.z += 0.05;

  rish.rotation.y += 0.01;
  // rish.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();
function animate() {
  requestAnimationFrame(animate);

  //rotation position scale

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();


