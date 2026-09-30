import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw, RotateCw } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { SceneType } from './types';
export default function ProductScene({type,color='#58644b',brand}:{type:SceneType;color?:string;brand:string}) {
 const host=useRef<HTMLDivElement>(null);const controlsRef=useRef<OrbitControls|null>(null);const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const element=host.current;if(!element)return;let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{setFailed(true);return;}
  setFailed(false);renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.8));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=brand==='VOLT'?1.65:1.3;renderer.outputColorSpace=THREE.SRGBColorSpace;
  element.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label',`Modelo 3D interativo: ${type}`);renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(36,1,.1,100);camera.position.set(3.6,2.8,4.7);
  const pmrem=new THREE.PMREMGenerator(renderer);const environment=new RoomEnvironment();const envMap=pmrem.fromScene(environment,.04);scene.environment=envMap.texture;environment.dispose();
  const light=new THREE.DirectionalLight(0xffffff,5);light.position.set(3,6,4);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-4;light.shadow.camera.right=4;light.shadow.camera.top=4;light.shadow.camera.bottom=-4;light.shadow.bias=-.001;scene.add(light,new THREE.HemisphereLight(0xffffff,brand==='VOLT'?0x333344:0x8c8376,2));
  const fill=new THREE.DirectionalLight(brand==='VOLT'?0xd7ff62:0xffcb9b,2);fill.position.set(-4,2,-2);scene.add(fill);
  const object=new THREE.Group();scene.add(object);const resources:THREE.Texture[]=[];
  const mat=(c:string,metalness=.0,roughness=.45)=>new THREE.MeshStandardMaterial({color:c,metalness,roughness});
  const silver=mat('#b5b8ba',.95,.22);const finish=mat(color,.05,.6);const dark=mat('#25252a',.1,.6);
  function mesh(geometry:THREE.BufferGeometry,material:THREE.Material,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;object.add(m);return m;}
  function box(w:number,h:number,d:number,r:number,material:THREE.Material,x:number,y:number,z:number){return mesh(new RoundedBoxGeometry(w,h,d,5,r),material,x,y,z);}
  function cyl(r:number,h:number,material:THREE.Material,x:number,y:number,z:number){return mesh(new THREE.CylinderGeometry(r,r,h,64),material,x,y,z);}
  const texture=document.createElement('canvas');texture.width=texture.height=128;const ctx=texture.getContext('2d');if(ctx){ctx.fillStyle='#9e9e9e';ctx.fillRect(0,0,128,128);for(let n=0;n<3000;n++){ctx.fillStyle=n%2?'#aaa':'#777';ctx.fillRect((n*17)%128,(n*43)%128,1,1);}const bump=new THREE.CanvasTexture(texture);bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(5,5);finish.bumpMap=bump;finish.bumpScale=.015;resources.push(bump);}
  if(type==='chair'){
   box(1.9,.48,1.75,.23,finish,0,.85,0);const back=box(1.92,1.3,.48,.24,finish,0,1.6,-.68);back.rotation.x=-.12;
   for(const x of [-.74,.74]){for(const z of [-.57,.57]){const leg=cyl(.062,.7,silver,x,.4,z);leg.rotation.z=x>0?-.08:.08;}}
   camera.position.set(3.5,2.6,4.5);
  }else if(type==='lamp'){
   const glossy=mat(color,.25,.14);cyl(.38,.16,glossy,0,.12,0);cyl(.20,1,glossy,0,.65,0);
   const dome=mesh(new THREE.SphereGeometry(.88,64,32,0,Math.PI*2,0,Math.PI/2),glossy,0,1.15,0);dome.scale.y=.64;
   mesh(new THREE.CircleGeometry(.84,64),mat('#f3e7c6',.1,.5),0,1.15,0).rotation.x=Math.PI/2;
  }else if(type==='table'){
   const wood=mat(color,.05,.43);cyl(.89,.15,wood,0,1.25,0);cyl(.44,1.22,wood,-.19,.62,0);
   if(ctx){ctx.fillStyle='#8b6040';ctx.fillRect(0,0,128,128);for(let i=0;i<64;i++){ctx.strokeStyle=i%2?'#4e3423':'#9b7051';ctx.globalAlpha=.3;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(i*2,0);ctx.bezierCurveTo(i*2-8,32,i*2+7,84,i*2,128);ctx.stroke();}const map=new THREE.CanvasTexture(texture);map.wrapS=map.wrapT=THREE.RepeatWrapping;wood.bumpMap=map;wood.bumpScale=.026;resources.push(map);}
  }else if(type==='headphones'){
   const metal=mat(color,.78,.25);const leather=mat('#a4a4a8',.0,.62);
   const points=[];for(let i=0;i<=40;i++){const t=i/40*Math.PI;points.push(new THREE.Vector3(Math.cos(t)*1.03,1.48+Math.sin(t)*1.17,0));}mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),64,.10,16,false),metal);
   const padded=[];for(let i=0;i<=32;i++){const t=.30+i/32*(Math.PI-.60);padded.push(new THREE.Vector3(Math.cos(t)*.92,1.46+Math.sin(t)*1.08,0));}mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(padded),64,.115,16,false),leather);
   for(const side of [-1,1]){box(.18,.55,.2,.07,metal,side*1.03,1.3,0);const cup=box(.38,.97,.70,.17,metal,side*1.0,.8,.05);cup.rotation.z=side*.10;box(.24,.87,.62,.12,leather,side*.78,.80,.05);const trim=box(.055,.59,.36,.027,dark,side*.64,.8,.05);trim.rotation.z=side*.08;}
   object.rotation.y=-.2;camera.position.set(3.7,2.2,5.6);
  }else if(type==='earbuds'){
   const plastic=mat(color,.15,.29);box(1.65,.68,1.1,.3,plastic,0,.5,0);const lid=box(1.65,.22,1.1,.1,plastic,0,1.1,-.5);lid.rotation.x=-1.2;
   box(1.3,.09,.8,.04,dark,0,.83,0);for(const side of [-1,1]){const bud=mesh(new THREE.SphereGeometry(.22,32,24),plastic,side*.4,1.03,0);bud.scale.set(1,1,.8);const stem=box(.16,.38,.17,.078,plastic,side*.43,.84,.16);stem.rotation.z=side*.2;}
   camera.position.set(3,2.4,4);
  }else{
   const textile=mat(color,.04,.8);cyl(.59,1.63,textile,0,.94,0);cyl(.61,.11,silver,0,.18,0);cyl(.61,.12,dark,0,1.79,0);cyl(.42,.022,dark,0,1.86,0);
   for(let y=.34;y<1.7;y+=.065){const ring=mesh(new THREE.TorusGeometry(.592,.007,6,64),dark,0,y,0);ring.rotation.x=Math.PI/2;}
  }
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:brand==='VOLT'?.26:.13}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);
  const controls=new OrbitControls(camera,renderer.domElement);controlsRef.current=controls;controls.target.set(0,type==='headphones'?1.4:.95,0);controls.enablePan=false;controls.enableDamping=true;controls.dampingFactor=.075;controls.minDistance=3;controls.maxDistance=9;controls.maxPolarAngle=Math.PI/2+.04;controls.autoRotate=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;controls.autoRotateSpeed=.85;controls.update();controls.saveState();
  const resize=()=>{const {width,height}=element.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();};const observer=new ResizeObserver(resize);observer.observe(element);resize();
  const clock=new THREE.Clock();renderer.setAnimationLoop(()=>{if(document.hidden)return;controls.update(clock.getDelta());renderer.render(scene,camera);});
  return()=>{observer.disconnect();renderer.setAnimationLoop(null);controls.dispose();controlsRef.current=null;scene.traverse(node=>{if(node instanceof THREE.Mesh){node.geometry.dispose();const materials=Array.isArray(node.material)?node.material:[node.material];materials.forEach(m=>m.dispose());}});resources.forEach(t=>t.dispose());finish.dispose();silver.dispose();dark.dispose();envMap.dispose();pmrem.dispose();renderer.dispose();renderer.domElement.remove();};
 },[type,color,brand]);
 const rotate=()=>{const c=controlsRef.current;if(c){c.autoRotate=false;const v=c.object.position.clone().sub(c.target);v.applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI/6);c.object.position.copy(c.target).add(v);c.update();}};
 const zoom=(factor:number)=>{const c=controlsRef.current;if(c){const v=c.object.position.clone().sub(c.target);v.multiplyScalar(factor);if(v.length()>=c.minDistance&&v.length()<=c.maxDistance)c.object.position.copy(c.target).add(v);c.update();}};
 return <div className="scene-shell">{failed?<div className="scene-loading">A visualização 3D não está disponível neste navegador. Volte à fotografia para explorar a peça.</div>:<><div className="scene-host" ref={host}/><div className="scene-controls"><button onClick={rotate} aria-label="Girar objeto em 3D"><RotateCw size={17}/></button><button onClick={()=>zoom(.85)} aria-label="Aproximar objeto"><Plus size={17}/></button><button onClick={()=>zoom(1.15)} aria-label="Afastar objeto"><Minus size={17}/></button><button onClick={()=>controlsRef.current?.reset()} aria-label="Redefinir visualização"><RotateCcw size={17}/></button></div></>}</div>;
}
