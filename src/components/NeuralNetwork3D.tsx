import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface NodeProps {
  position: [number, number, number];
  color: string;
  size: number;
}

const Node = ({ position, color, size }: NodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.1;
      glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <group position={position}>
      {/* Core node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Glow effect */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[size * 1.5, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

const Connection = ({ start, end, color }: ConnectionProps) => {
  const lineRef = useRef<THREE.Line>(null);
  const pulseRef = useRef(0);

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame(() => {
    if (lineRef.current) {
      pulseRef.current += 0.02;
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(pulseRef.current) * 0.2;
    }
  });

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 }))} ref={lineRef} />
  );
};

const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const nodeData: Array<{ position: [number, number, number]; color: string; size: number }> = [];
    const colors = ['#7B61FF', '#FF61D2', '#00D9FF'];
    
    // Create layers of nodes
    for (let layer = 0; layer < 4; layer++) {
      const layerZ = (layer - 1.5) * 3;
      const nodeCount = layer === 0 || layer === 3 ? 4 : 6;
      
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = layer === 0 || layer === 3 ? 2 : 3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        nodeData.push({
          position: [x, y, layerZ],
          color: colors[layer % colors.length],
          size: layer === 0 || layer === 3 ? 0.15 : 0.12,
        });
      }
    }
    
    return nodeData;
  }, []);

  const connections = useMemo(() => {
    const connData: Array<{ start: [number, number, number]; end: [number, number, number]; color: string }> = [];
    
    // Connect nodes between layers
    for (let layer = 0; layer < 3; layer++) {
      const currentLayerStart = layer === 0 ? 0 : layer === 1 ? 4 : 10;
      const nextLayerStart = layer === 0 ? 4 : layer === 1 ? 10 : 16;
      const currentLayerCount = layer === 0 ? 4 : 6;
      const nextLayerCount = layer === 2 ? 4 : 6;
      
      for (let i = 0; i < currentLayerCount; i++) {
        for (let j = 0; j < nextLayerCount; j++) {
          if (Math.random() > 0.6) {
            const startNode = nodes[currentLayerStart + i];
            const endNode = nodes[nextLayerStart + j];
            if (startNode && endNode) {
              connData.push({
                start: startNode.position,
                end: endNode.position,
                color: startNode.color,
              });
            }
          }
        }
      }
    }
    
    return connData;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => (
        <Connection key={`conn-${i}`} {...conn} />
      ))}
      {nodes.map((node, i) => (
        <Node key={`node-${i}`} {...node} />
      ))}
    </group>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#7B61FF'),
      new THREE.Color('#FF61D2'),
      new THREE.Color('#00D9FF'),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7B61FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF61D2" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#00D9FF" />
      <NeuralNetwork />
      <FloatingParticles />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

interface NeuralNetwork3DProps {
  className?: string;
}

const NeuralNetwork3D = ({ className = '' }: NeuralNetwork3DProps) => {
  return (
    <div className={`${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default NeuralNetwork3D;
