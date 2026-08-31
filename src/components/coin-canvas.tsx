import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { BarrelCrt, BarrelCrtEffect } from "@/components/crt-barrel";

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
const THICK = 0.15;
const HALF = THICK / 2;
const METAL = {
  color: "#050507",
  metalness: 0.92,
  roughness: 0.28,
  envMapIntensity: 1.05,
} as const;

function makeReverseTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const ctx = c.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(c);

  const wash = ctx.createRadialGradient(512, 480, 60, 512, 512, 520);
  wash.addColorStop(0, "#1a1b1e");
  wash.addColorStop(0.55, "#070708");
  wash.addColorStop(1, "#000000");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.strokeStyle = "#2a2c32";
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(512, 512, 478, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#121214";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(512, 512, 430, 0, Math.PI * 2);
  ctx.stroke();

  ctx.shadowColor = "#000000";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#d5d8e0";
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
    scene.environmentIntensity = 0.55;
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
      new THREE.MeshStandardMaterial({
        ...METAL,
      }),
    [],
  );
  const rim = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#121318",
        metalness: 0.97,
        roughness: 0.18,
        envMapIntensity: 1.25,
      }),
    [],
  );
  const reverseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: reverseMap,
        metalness: 0.62,
        roughness: 0.36,
        envMapIntensity: 0.85,
      }),
    [reverseMap],
  );
  const frontMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: frontMap,
        metalness: 0.58,
        roughness: 0.38,
        envMapIntensity: 0.9,
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
      <mesh material={body} castShadow>
        <cylinderGeometry args={[1, 1, THICK, 192]} />
      </mesh>
      <mesh material={rim} position={[0, 0.001, 0]}>
        <cylinderGeometry args={[1.012, 1.012, THICK * 0.97, 192]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, HALF + 0.001, 0]} material={frontMat}>
        <circleGeometry args={[0.93, 96]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -HALF - 0.001, 0]} material={reverseMat}>
        <circleGeometry args={[0.93, 96]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, HALF + 0.0015, 0]} material={rim}>
        <ringGeometry args={[0.93, 0.99, 128]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -HALF - 0.0015, 0]} material={rim}>
        <ringGeometry args={[0.93, 0.99, 128]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, HALF, 0]} material={rim}>
        <torusGeometry args={[0.998, 0.015, 12, 192]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -HALF, 0]} material={rim}>
        <torusGeometry args={[0.998, 0.015, 12, 192]} />
      </mesh>
      <Reeds />
    </group>
  );
}

function Reeds() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 160;

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      dummy.position.set(Math.sin(a) * 1.014, 0, Math.cos(a) * 1.014);
      dummy.rotation.set(0, a, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.028, THICK * 0.94, 0.018]} />
      <meshStandardMaterial color="#0a0a0d" metalness={0.94} roughness={0.22} envMapIntensity={1.1} />
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

function tossFromCycle(cycle: number, drift = 1): Toss {
  const n = cycle * 9973;
  const rnd = (offset: number) => {
    const x = Math.sin(n + offset * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    xDrift: (rnd(1) - 0.5) * 1.35 * drift,
    zDrift: (rnd(2) - 0.5) * 0.45 * drift,
    flips: 3.15 + rnd(3) * 1.35,
    yaw: (rnd(4) - 0.5) * 1.4,
    tilt: 0.12 + rnd(5) * 0.16,
    spinSign: rnd(6) > 0.5 ? 1 : -1,
  };
}

function FlipToss({
  children,
  reducedMotion,
  posRef,
  drift = 1,
}: {
  children: ReactNode;
  reducedMotion: boolean;
  posRef: RefObject<THREE.Vector3>;
  drift?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const elapsed = useRef(1.05);
  const cycle = useRef(0);
  const toss = useRef<Toss>(tossFromCycle(0, drift));

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);

    if (reducedMotion) {
      g.position.set(0, 0.05, 0);
      g.rotation.set(-Math.PI / 2 + 0.18, elapsed.current * 0.35, 0.08);
      posRef.current.copy(g.position);
      elapsed.current += d;
      return;
    }

    elapsed.current += d;
    const wrapped = elapsed.current % PERIOD;
    const nextCycle = Math.floor(elapsed.current / PERIOD);
    if (nextCycle !== cycle.current) {
      cycle.current = nextCycle;
      toss.current = tossFromCycle(nextCycle, drift);
    }

    if (wrapped > TOSS) {
      g.position.set(toss.current.xDrift * 0.15, Y0, 0);
      posRef.current.copy(g.position);
      return;
    }

    const t = wrapped;
    const u = t / TOSS;
    const y = Y0 + V0 * t - 0.5 * G * t * t;
    const lift = Math.sin(u * Math.PI);
    const x = toss.current.xDrift * lift;
    const z = toss.current.zDrift * lift;

    g.position.set(x, y, z);
    posRef.current.copy(g.position);
    g.rotation.order = "XYZ";
    g.rotation.x = -Math.PI / 2 + toss.current.spinSign * u * toss.current.flips * Math.PI * 2;
    g.rotation.y = toss.current.yaw * u * Math.PI * 2;
    g.rotation.z = toss.current.tilt * Math.sin(u * Math.PI * 3.2);
  });

  return <group ref={ref}>{children}</group>;
}

function CoinShadow({ posRef }: { posRef: RefObject<THREE.Vector3> }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    const p = posRef.current;
    const mat = m.material as THREE.MeshBasicMaterial;
    if (p.y < -1.45) {
      mat.opacity = 0;
      return;
    }
    const t = Math.min(Math.max((p.y + 1.2) / 3.4, 0), 1);
    m.position.set(p.x * 0.92, -1.18, p.z);
    const s = 1.28 - t * 0.72;
    m.scale.setScalar(s);
    mat.opacity = 0.34 * (1 - t * 0.78);
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
      <circleGeometry args={[0.98, 48]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.22} depthWrite={false} />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.14} />
      <directionalLight position={[-2.6, 5.8, 4.4]} intensity={3.5} color="#f7f8fb" />
      <directionalLight position={[4.8, 2.4, 2.4]} intensity={1.4} color="#c8ccd6" />
      <directionalLight position={[0.4, -1.4, -4.0]} intensity={0.72} color="#9aa0b0" />
      <pointLight position={[-0.8, 1.4, 2.6]} intensity={1.45} color="#ffffff" distance={14} />
      <spotLight
        position={[2.1, 4.6, 3.1]}
        angle={0.38}
        penumbra={0.82}
        intensity={1.7}
        color="#eef0f4"
      />
    </>
  );
}

function BarrelClock({
  effect,
  paused,
}: {
  effect: RefObject<BarrelCrtEffect | null>;
  paused: boolean;
}) {
  useFrame((_, dt) => {
    const u = effect.current?.uniforms.get("time");
    if (u && !paused) u.value += dt;
  });
  return null;
}

export function CoinCanvas({ reducedMotion = false, className }: Props) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 720;
  const posRef = useRef(new THREE.Vector3(0, 0.05, 0));
  const barrelRef = useRef<BarrelCrtEffect>(null);

  return (
    <div className={className ?? "absolute inset-0"}>
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{
          position: isMobile ? [0, 0.18, 6.35] : [0, 0.22, 5.15],
          fov: isMobile ? 36 : 34,
        }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.14;
          gl.setClearColor("#ffffff", 1);
          camera.lookAt(0, 0.15, 0);
        }}
        style={{ background: "#ffffff", touchAction: "none" }}
      >
        <LocalEnvironment />
        <Lights />
        <CoinShadow posRef={posRef} />
        <FlipToss reducedMotion={reducedMotion} posRef={posRef} drift={isMobile ? 0.42 : 1}>
          <group scale={isMobile ? 0.64 : 0.82}>
            <CoinMesh />
          </group>
        </FlipToss>
        <BarrelClock effect={barrelRef} paused={reducedMotion} />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <BarrelCrt
            ref={barrelRef}
            amount={isMobile ? 0.11 : 0.19}
            zoom={isMobile ? 0.72 : 0.94}
            aberration={isMobile ? [0.0016, 0.0007] : [0.0028, 0.00115]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
