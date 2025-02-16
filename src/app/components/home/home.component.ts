import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input  } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { LoggerService } from 'src/app/core/service/logger.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mobileContent', { static: true }) private mobileContentRef!: ElementRef<HTMLDivElement>;

 
  //* Stage Properties
  @Input() currentSection: string = 'hello';
  @Input() public fieldOfView: number = 8;
  @Input('nearClipping') public nearClippingPane: number = 2;
  @Input('farClipping') public farClippingPane: number = 1000;

  //? Scene properties
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private ambientLight!: THREE.AmbientLight;
  private light1!: THREE.PointLight;
  private light2!: THREE.PointLight;
  private light3!: THREE.PointLight;
  private light4!: THREE.PointLight;
  private model: any;
  private directionalLight!: THREE.DirectionalLight;

  private loaderGLTF = new GLTFLoader();
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  constructor(private logger: LoggerService) {}

  ngAfterViewInit(): void {
    if (this.isMobile()) {
      this.canvasRef.nativeElement.style.display = 'none';
      this.mobileContentRef.nativeElement.style.display = 'block';
    } else {
      this.createScene();
      this.startRenderingLoop();
      this.createControls();
      window.addEventListener('resize', () => this.onWindowResize());
    }
  }

  private animateModel() {
    if (this.model) {
      this.model.rotation.z += 0.0012;
    }
  }


  private isMobile(): boolean {
    return window.innerWidth <= 768;
  }


  private onWindowResize() {
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }

  
  private createControls = () => {
    const canvas = document.querySelector('canvas');
    if (canvas instanceof HTMLCanvasElement) {
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      });

      renderer.setSize(window.innerWidth * 0.985, window.innerHeight);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0px';
      renderer.domElement.style.zIndex = '1';
      document.body.appendChild(renderer.domElement);
      this.controls = new OrbitControls(this.camera, renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.enableZoom = false; // Deshabilitar el zoom
      this.controls.enablePan = true;
      this.controls.update();
    }
  };

  private createScene() {
    this.logger.log('createScene');
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0585858);
    this.loaderGLTF.load('assets/scene.gltf', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-0.1);
      this.scene.add(this.model);
    });
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.x = 600;
    this.camera.position.y = 600;
    this.camera.position.z = 400;
    this.ambientLight = new THREE.AmbientLight(0x00000, 50);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.1);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0x4b371c, 10);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x4b371c, 10);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0x4b371c, 10);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0x4b371c, 10);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);

    //this.renderer.setSize(this.canvas.clientWidth * 0.8, this.canvas.clientHeight * 0.8);
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9;
    this.renderer.setSize(width, height);

    this.canvas.style.display = "block";
    this.canvas.style.margin = "auto";
    
    let component: HomeComponent = this;

    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }
}