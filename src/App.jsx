import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const topics = [
  { id: 1, title: '情緒臉譜', subtitle: '認識情緒，練習表達', color: '#F2B85B', pos: [-3.25, 0.9, 1.05], kind: 'rainbow' },
  { id: 2, title: '家庭風險', subtitle: '看見家庭中的需要', color: '#E99AAE', pos: [-1.25, 1.0, -1.65], kind: 'home' },
  { id: 3, title: '校園風險', subtitle: '打造安心學習環境', color: '#78A8D8', pos: [0, 1.35, 0.15], kind: 'castle' },
  { id: 4, title: 'CRC', subtitle: '認識兒童權利公約', color: '#A58BD1', pos: [2.0, 1.0, -0.8], kind: 'greenhouse' },
  { id: 5, title: '社區風險', subtitle: '成為彼此的守護力量', color: '#E7B96E', pos: [3.35, 1.15, -1.75], kind: 'light' },
  { id: 6, title: '網路風險', subtitle: '安全探索數位世界', color: '#82B89A', pos: [3.1, 1.0, 1.65], kind: 'dome' },
]

function Tree({ position, scale = 1 }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, .38, 0]} castShadow><cylinderGeometry args={[.09,.13,.75,6]} /><meshStandardMaterial color="#9B7658" /></mesh>
    <mesh position={[0,.95,0]} castShadow><coneGeometry args={[.55,.95,7]} /><meshStandardMaterial color="#4F8D69" roughness={1} /></mesh>
    <mesh position={[0,1.35,0]} castShadow><coneGeometry args={[.4,.75,7]} /><meshStandardMaterial color="#69A47A" roughness={1} /></mesh>
  </group>
}

function Building({ item, onSelect }) {
  const group = useRef()
  const [hover, setHover] = useState(false)
  useFrame((state) => {
    if (group.current) group.current.position.y = item.pos[1] + Math.sin(state.clock.elapsedTime * 1.2 + item.id) * .025
  })
  const mat = (color) => <meshStandardMaterial color={color} roughness={0.82} />
  return <group ref={group} position={item.pos} onClick={(e) => { e.stopPropagation(); onSelect(item) }} onPointerOver={(e)=>{e.stopPropagation();setHover(true);document.body.style.cursor='pointer'}} onPointerOut={()=>{setHover(false);document.body.style.cursor='auto'}}>
    {item.kind === 'rainbow' && <>
      <mesh position={[0,.48,0]} castShadow><boxGeometry args={[1.05,.95,.85]} />{mat('#F5D8A8')}</mesh>
      <mesh position={[0,1.05,0]} castShadow><coneGeometry args={[.78,.55,4]} />{mat('#E8A2A1')}</mesh>
      {[0,1,2].map((n)=><mesh key={n} position={[-.28+n*.28,.54,.438]}><boxGeometry args={[.16,.34,.025]} />{mat(['#F3A85D','#84B9A0','#7EA9D5'][n])}</mesh>)}
      <mesh position={[0,.55,-.45]}><torusGeometry args={[.45,.055,8,32,Math.PI]} />{mat('#E6A44F')}</mesh>
    </>}
    {item.kind === 'home' && <>
      <mesh position={[0,.43,0]} castShadow><boxGeometry args={[1.15,.82,.95]} />{mat('#F1C6C7')}</mesh>
      <mesh position={[0,1.03,0]} castShadow rotation={[0,Math.PI/4,0]}><coneGeometry args={[.88,.7,4]} />{mat('#D9859B')}</mesh>
      <mesh position={[0,.42,.49]}><boxGeometry args={[.25,.48,.03]} />{mat('#A56C72')}</mesh>
    </>}
    {item.kind === 'castle' && <>
      <mesh position={[0,.55,0]} castShadow><boxGeometry args={[1.55,1.1,1.25]} />{mat('#F4E5C8')}</mesh>
      {[-.58,.58].map((x)=><group key={x} position={[x,.8,0]}><mesh position={[0,.45,0]} castShadow><cylinderGeometry args={[.24,.3,.9,8]} />{mat('#E6CBA5')}</mesh><mesh position={[0,1,0]}><coneGeometry args={[.34,.45,8]} />{mat('#7D9EBC')}</mesh></group>)}
      <mesh position={[0,.88,.64]}><torusGeometry args={[.34,.085,12,40]} />{mat('#6F9EBB')}</mesh>
      <mesh position={[0,.88,.64]}><sphereGeometry args={[.22,24,16]} />{mat('#F8F5E9')}</mesh>
      <mesh position={[0,.88,.84]}><sphereGeometry args={[.095,18,12]} />{mat('#4D6C82')}</mesh>
      <mesh position={[0,.25,.64]}><boxGeometry args={[.3,.5,.04]} />{mat('#B98B70')}</mesh>
    </>}
    {item.kind === 'greenhouse' && <>
      <mesh position={[0,.35,0]} castShadow><boxGeometry args={[1.25,.7,1.1]} />{mat('#E9E1F0')}</mesh>
      <mesh position={[0,.82,0]} castShadow><sphereGeometry args={[.68,24,14,0,Math.PI*2,0,Math.PI/2]} />{mat('#A68BC7')}</mesh>
      {[-.3,0,.3].map((x)=><mesh key={x} position={[x,.85,.59]} rotation={[0,0,x*-.5]}><boxGeometry args={[.025,.6,.025]} />{mat('#EADCF6')}</mesh>)}
    </>}
    {item.kind === 'light' && <>
      <mesh position={[0,.7,0]} castShadow><cylinderGeometry args={[.34,.52,1.4,8]} />{mat('#F0E7D4')}</mesh>
      <mesh position={[0,1.45,0]}><cylinderGeometry args={[.38,.38,.16,12]} />{mat('#D98D72')}</mesh>
      <mesh position={[0,1.68,0]}><coneGeometry args={[.42,.35,8]} />{mat('#D98D72')}</mesh>
      <mesh position={[0,1.22,.32]}><sphereGeometry args={[.16,16,12]} />{mat('#F8D98D')}</mesh>
    </>}
    {item.kind === 'dome' && <>
      <mesh position={[0,.4,0]} castShadow><boxGeometry args={[1.1,.8,1.05]} />{mat('#D8E7D8')}</mesh>
      <mesh position={[0,.94,0]} castShadow><sphereGeometry args={[.62,20,14,0,Math.PI*2,0,Math.PI/2]} />{mat('#78A98C')}</mesh>
      <mesh position={[0,.94,0]}><torusGeometry args={[.62,.025,6,32]} />{mat('#E9F0D8')}</mesh>
      <mesh position={[0,.94,0]} rotation={[0,0,Math.PI/2]}><torusGeometry args={[.62,.025,6,32]} />{mat('#E9F0D8')}</mesh>
    </>}
    {hover && <Html position={[0,2.15,0]} center distanceFactor={8} style={{pointerEvents:'none'}}><div className="hover-label">{item.title}</div></Html>}
    <mesh position={[0,.05,.0]}><cylinderGeometry args={[.78,.78,.08,24]} />{mat('#D5C7A8')}</mesh>
  </group>
}

function Hotspot({ item, onSelect }) {
  const ref = useRef()
  useFrame(({clock}) => { if(ref.current) { const s=1+Math.sin(clock.elapsedTime*2.6+item.id)*.18; ref.current.scale.setScalar(s) } })
  return <group position={[item.pos[0],.18,item.pos[2]+.62]} onClick={(e)=>{e.stopPropagation();onSelect(item)}} onPointerOver={()=>document.body.style.cursor='pointer'} onPointerOut={()=>document.body.style.cursor='auto'}>
    <mesh ref={ref}><sphereGeometry args={[.105,16,16]} /><meshStandardMaterial color="#18232B" emissive="#18232B" emissiveIntensity={.18} /></mesh>
    <mesh position={[0,-.08,0]}><cylinderGeometry args={[.035,.035,.13,8]} /><meshStandardMaterial color="#26343A" /></mesh>
  </group>
}

function Balloon({ position, color, delay=0 }) {
  return <Float speed={1.2} rotationIntensity={.12} floatIntensity={.45}>
    <group position={position}>
      <mesh><sphereGeometry args={[.28,8,6]} /><meshStandardMaterial color={color} flatShading /></mesh>
      <mesh position={[0,-.34,0]}><boxGeometry args={[.13,.12,.13]} /><meshStandardMaterial color="#C69A70" flatShading /></mesh>
      {[[-.07,-.23,0],[.07,-.23,0]].map((p,i)=><mesh key={i} position={p}><cylinderGeometry args={[.008,.008,.18,4]} /><meshStandardMaterial color="#A98B72" /></mesh>)}
    </group>
  </Float>
}

function Confetti() {
  const ref = useRef()
  const count = 190
  const positions = useMemo(() => {
    const a = new Float32Array(count*3)
    for(let i=0;i<count;i++){ a[i*3]=(Math.random()-.5)*13; a[i*3+1]=Math.random()*8+1; a[i*3+2]=(Math.random()-.5)*10 }
    return a
  },[])
  const colors = useMemo(()=>{const a=[];const palette=['#F1B65F','#80B7D5','#E79CAD','#91B99A','#B39AD6'];for(let i=0;i<count;i++){const c=new THREE.Color(palette[i%palette.length]);a.push(c.r,c.g,c.b)}return new Float32Array(a)},[])
  useFrame((_,delta)=>{
    if(!ref.current)return
    const p=ref.current.geometry.attributes.position.array
    for(let i=0;i<count;i++){p[i*3+1]-=delta*(.55+(i%5)*.12); if(p[i*3+1]<-.3){p[i*3+1]=8+Math.random()*2;p[i*3]=(Math.random()-.5)*13;p[i*3+2]=(Math.random()-.5)*10}}
    ref.current.geometry.attributes.position.needsUpdate=true
  })
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3}/><bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3}/></bufferGeometry><pointsMaterial size={.075} vertexColors transparent opacity={.9} sizeAttenuation /></points>
}

function Island({ onSelect }) {
  const island = useRef()
  useFrame((state,delta)=>{if(island.current)island.current.rotation.y += delta*.035})
  return <group ref={island}>
    <mesh position={[0,-.25,0]} receiveShadow castShadow><cylinderGeometry args={[5.35,4.65,.62,64]} /><meshStandardMaterial color="#8FB58A" roughness={1} /></mesh>
    <mesh position={[0,.08,0]}><cylinderGeometry args={[5.36,5.36,.12,64]} /><meshStandardMaterial color="#B8D4A3" roughness={1} /></mesh>
    <mesh position={[0,-.57,0]}><cylinderGeometry args={[4.7,4.4,.12,64]} /><meshStandardMaterial color="#C5A77E" /></mesh>
    {topics.map(t=><Building key={t.id} item={t} onSelect={onSelect}/>)}
    {topics.map(t=><Hotspot key={t.id} item={t} onSelect={onSelect}/>)}
    {[
      [-4.2,.15,-1.3,.8],[-3.8,.15,-2.5,.65],[-2.5,.15,3.1,.75],[-1.8,.15,3.6,.55],[1.1,.15,3.8,.72],[2.3,.15,3.45,.62],[4.1,.15,.2,.72],[4.2,.15,2.3,.58],[-.2,.15,-3.5,.7],[1.2,.15,-3.4,.55]
    ].map((p,i)=><Tree key={i} position={p.slice(0,3)} scale={p[3]}/>)}
    <group position={[-.8,.18,2.45]}>
      <mesh position={[0,.12,0]}><cylinderGeometry args={[1.05,1.05,.12,24]} /><meshStandardMaterial color="#D9C49E" /></mesh>
      {[-.6,-.2,.2,.6].map((x,i)=><mesh key={i} position={[x,.28,0]}><cylinderGeometry args={[.045,.045,.22,8]} /><meshStandardMaterial color="#E7D8B8" /></mesh>)}
    </group>
  </group>
}

function Scene({ onSelect, paused, zoomTarget }) {
  const controls = useRef()
  useEffect(()=>{
    if(zoomTarget && controls.current){
      const target = new THREE.Vector3(...zoomTarget.pos)
      controls.current.target.lerp(target,.5)
    }
  },[zoomTarget])
  useFrame((_,delta)=>{
    if(controls.current) controls.current.autoRotate = !paused && !zoomTarget
  })
  return <>
    <ambientLight intensity={1.15}/>
    <directionalLight position={[5,9,6]} intensity={2.1} castShadow shadow-mapSize={[2048,2048]}/>
    <directionalLight position={[-6,4,-4]} intensity={.65} color="#DCEBFF"/>
    <Island onSelect={onSelect}/>
    <Balloon position={[-4.3,3.5,1.2]} color="#EBA7A6"/>
    <Balloon position={[4.3,3.9,-1.5]} color="#F0C56F"/>
    <Balloon position={[1.8,4.8,3.2]} color="#8CB7D5"/>
    <Balloon position={[-1.8,4.2,-3.6]} color="#A6C9A6"/>
    <Confetti/>
    <ContactShadows position={[0,-.62,0]} opacity={.28} scale={13} blur={2.5} far={4}/>
    <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={7} maxDistance={16} minPolarAngle={.65} maxPolarAngle={1.35} autoRotate autoRotateSpeed={.55} />
  </>
}

export default function App() {
  const [selected,setSelected] = useState(null)
  const [paused,setPaused] = useState(false)
  const [showVideo,setShowVideo] = useState(false)
  const [focus,setFocus] = useState(null)
  const choose = (item)=>{setSelected(item);setFocus(item);setPaused(true)}
  const close = ()=>{setSelected(null);setFocus(null);setPaused(false)}
  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" onClick={e=>e.preventDefault()}><span className="brand-mark">家</span><span>家扶基金會</span></a>
      <nav className="desktop-nav">
        {['關於兒童保護','教育館','守護行動','好鄰居','繪畫競賽','數位教材','兒保小測驗','森林探險'].map(x=><a key={x} href="#" onClick={e=>e.preventDefault()}>{x}</a>)}
      </nav>
      <button className="login">註冊 / 登入</button>
      <button className="menu" aria-label="開啟選單" onClick={()=>setShowVideo(v=>!v)}>☰</button>
    </header>
    <main className="main">
      <div className="intro">
        <div className="eyebrow">CHILD PROTECTION WONDERLAND</div>
        <h1>兒保樂園</h1>
        <p>轉動樂園，探索每一個值得被守護的角落。</p>
      </div>
      <div className="scene-wrap">
        <Canvas shadows dpr={[1,1.7]} camera={{position:[9,8,11],fov:38}} gl={{antialias:true, alpha:true}}>
          <color attach="background" args={['#F5F6EF']}/>
          <Suspense fallback={null}><Scene onSelect={choose} paused={paused} zoomTarget={focus}/></Suspense>
        </Canvas>
        <div className="scene-hint"><span className="hint-dot"></span> 拖曳旋轉・滾輪縮放・點選建築探索</div>
        <div className="topic-legend">{topics.map(t=><button key={t.id} onClick={()=>choose(t)}><i style={{background:t.color}}/>{t.title}</button>)}</div>
        <button className="motion-toggle" onClick={()=>setPaused(p=>!p)}>{paused?'▶ 自動旋轉':'Ⅱ 暫停旋轉'}</button>
      </div>
      <button className="video-entry" onClick={()=>setShowVideo(true)}><span>▶</span><div><b>影片區</b><small>用影像認識兒童保護</small></div><strong>↗</strong></button>
      <footer>每一份理解，都是守護孩子的力量。<span>© 家扶基金會｜概念互動原型</span></footer>
    </main>
    {selected && <div className="modal-backdrop" onMouseDown={close}>
      <section className="topic-modal" onMouseDown={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={close}>×</button>
        <div className="modal-orb" style={{background:selected.color}}><span>{String(selected.id).padStart(2,'0')}</span></div>
        <div className="modal-kicker">CHILD PROTECTION TOPIC</div>
        <h2>【主題 {selected.id}】{selected.title}</h2>
        <p>{selected.subtitle}</p>
        <div className="modal-rule"/>
        <h3>遊戲測驗開始</h3>
        <p className="modal-desc">透過互動情境，學習辨識風險、理解感受，成為孩子身邊的守護力量。</p>
        <button className="start-btn" onClick={close}>開始測驗 <span>→</span></button>
      </section>
    </div>}
    {showVideo && <div className="modal-backdrop" onMouseDown={()=>setShowVideo(false)}><section className="topic-modal video-modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowVideo(false)}>×</button><div className="modal-kicker">WATCH & LEARN</div><h2>影片區</h2><p>用影像認識兒童保護</p><div className="video-placeholder">▶</div><button className="start-btn" onClick={()=>setShowVideo(false)}>返回樂園</button></section></div>}
  </div>
}