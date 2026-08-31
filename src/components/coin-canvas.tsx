import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

type Props = {
  variant?: "hero" | "studio";
  reducedMotion?: boolean;
  className?: string;
};

const TOSS = 4.4;
const REST = 0.35;
const PERIOD = TOSS + REST;
const G = 2.72;
const Y0 = -4.35;
const V0 = 5.98;

function makeReverseTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const ctx = c.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(c);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 1024, 1024);
  ctx.strokeStyle = "#141414";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(512, 512, 430, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#c8ccd4";
  ctx.font = "800 240px 'Arial Narrow', Impact, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$BBC", 512, 524);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function LocalEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const env = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
      envScene.dispose();
    };
  }, [gl, scene]);

  return null;
}

function CoinMesh() {
  const reverseMap = useMemo(() => makeReverseTexture(), []);
  const frontMap = useTexture("/coin-front.png");

  useEffect(() => {
    frontMap.colorSpace = THREE.SRGBColorSpace;
    frontMap.anisotropy = 8;
    frontMap.needsUpdate = true;
  }, [frontMap]);

  const body = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#000000",
      }),
    [],
  );
  const rim = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#000000",
      }),
    [],
  );
  const reverseMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: reverseMap,
      }),
    [reverseMap],
  );
  const frontMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: frontMap,
      }),
    [frontMap],
  );

  useEffect(() => {
    return () => {
      reverseMap.dispose();
      body.dispose();
      rim.dispose();
      reverseMat.dispose();
      frontMat.dispose();
    };
  }, [reverseMap, body, rim, reverseMat, frontMat]);

  return (
    <group>
      <mesh material={body} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.12, 192]} />
      </mesh>
      <mesh material={rim} position={[0, 0.001, 0]}>
        <cylinderGeometry args={[1.008, 1.008, 0.118, 192]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0615, 0]} material={frontMat}>
        <circleGeometry args={[0.93, 96]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.0615, 0]} material={reverseMat}>
        <circleGeometry args={[0.93, 96]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.062, 0]} material={rim}>
        <ringGeometry args={[0.93, 0.988, 128]} />
      </mesh>
      <Reeds />
    </group>
  );
}

function Reeds() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 150;

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      dummy.position.set(Math.sin(a) * 1.01, 0, Math.cos(a) * 1.01);
      dummy.rotation.set(0, a, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.026, 0.116, 0.016]} />
      <meshBasicMaterial color="#000000" />
    </instancedMesh>
  );
}

type Toss = {
  xDrift: number;
  zDrift: number;
  flips: number;
  yaw: number;
  tilt: number;
  spinSign: number;
};

function tossFromCycle(cycle: number): Toss {
  const n = cycle * 9973;
  const rnd = (offset: number) => {
    const x = Math.sin(n + offset * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    xDrift: (rnd(1) - 0.5) * 1.35,
    zDrift: (rnd(2) - 0.5) * 0.45,
    flips: 3.15 + rnd(3) * 1.35,
    yaw: (rnd(4) - 0.5) * 1.4,
    tilt: 0.12 + rnd(5) * 0.16,
    spinSign: rnd(6) > 0.5 ? 1 : -1,
  };
}

function FlipToss({
  children,
  reducedMotion,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const elapsed = useRef(1.05);
  const cycle = useRef(0);
  const toss = useRef<Toss>(tossFromCycle(0));

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);

    if (reducedMotion) {
      g.position.set(0, 0.05, 0);
      g.rotation.set(-Math.PI / 2 + 0.18, elapsed.current * 0.35, 0.08);
      elapsed.current += d;
      return;
    }

    elapsed.current += d;
    const wrapped = elapsed.current % PERIOD;
    const nextCycle = Math.floor(elapsed.current / PERIOD);
    if (nextCycle !== cycle.current) {
      cycle.current = nextCycle;
      toss.current = tossFromCycle(nextCycle);
    }

    if (wrapped > TOSS) {
      g.position.set(toss.current.xDrift * 0.15, Y0, 0);
      return;
    }

    const t = wrapped;
    const u = t / TOSS;
    const y = Y0 + V0 * t - 0.5 * G * t * t;
    const lift = Math.sin(u * Math.PI);
    const x = toss.current.xDrift * lift;
    const z = toss.current.zDrift * lift;

    g.position.set(x, y, z);
    g.rotation.order = "XYZ";
    g.rotation.x = -Math.PI / 2 + toss.current.spinSign * u * toss.current.flips * Math.PI * 2;
    g.rotation.y = toss.current.yaw * u * Math.PI * 2;
    g.rotation.z = toss.current.tilt * Math.sin(u * Math.PI * 3.2);
  });

  return <group ref={ref}>{children}</group>;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.34} />
      <directionalLight position={[-2.8, 5.6, 4.2]} intensity={2.8} color="#f5f6f8" />
      <directionalLight position={[4.4, 2.2, 2.2]} intensity={1.15} color="#c5c8d0" />
      <directionalLight position={[0.2, -1.6, -3.8]} intensity={0.45} color="#8b90a0" />
      <pointLight position={[-0.6, 1.1, 2.4]} intensity={0.9} color="#ffffff" distance={12} />
    </>
  );
}

export function CoinCanvas({ reducedMotion = false, className }: Props) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 720;

  return (
    <div className={className ?? "absolute inset-0"}>
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{
          position: isMobile ? [0, 0.2, 5.6] : [0, 0.22, 5.15],
          fov: isMobile ? 38 : 34,
        }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.setClearColor("#ffffff", 1);
          camera.lookAt(0, 0.15, 0);
        }}
        style={{ background: "#ffffff", touchAction: "none" }}
      >
        <LocalEnvironment />
        <Lights />
        <FlipToss reducedMotion={reducedMotion}>
          <group scale={isMobile ? 0.72 : 0.78}>
            <CoinMesh />
          </group>
        </FlipToss>
      </Canvas>
    </div>
  );
}
