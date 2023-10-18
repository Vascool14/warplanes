import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Plane({spin, position, rotation}:{spin: boolean, position: [number, number, number], rotation: 'up'|'down'|'left'|'right'|'none'}) {
  const { nodes, materials } = useGLTF('/src/scene/scene.gltf');
  const planeRef = useRef<any>();
  useFrame(() => {
    if(spin){
      planeRef.current.rotation.z += 0.2 % Math.PI * 2;
    } 
  })
  const planeRotation = rotation == 'up'?0:rotation == 'down'?Math.PI:rotation == 'left'?Math.PI/2:rotation == 'right'?-Math.PI/2:0;
  return (
    <group name="polySurface172" position={position} scale={0.14} rotation={[0, planeRotation, 0]}>
      {/* elice */}
      <group ref={planeRef} name="polySurface171" position={[0, -0.57, 14.211]}>                  
        <group name="polySurface304" position={[0, -3.301, -12.838]}>
          <mesh name="polySurface304_pasted__lambert2_0" geometry={nodes.polySurface304_pasted__lambert2_0.geometry} material={materials.pasted__lambert2} />
        </group>
        <group name="polySurface305" position={[0, -3.301, -12.838]}>
          <mesh name="polySurface305_pasted__lambert2_0" geometry={nodes.polySurface305_pasted__lambert2_0.geometry} material={materials.pasted__lambert2} />
        </group>
        <group name="polySurface306" position={[0, -3.301, -12.838]}>
          <mesh name="polySurface306_pasted__lambert2_0" geometry={nodes.polySurface306_pasted__lambert2_0.geometry} material={materials.pasted__lambert2} />
        </group>
        <group name="transform140" position={[0, -3.301, -12.838]} />
        <group name="polySurface406" position={[0, 0.007, -0.608]}>
          <mesh name="polySurface406_Tooner_0" geometry={nodes.polySurface406_Tooner_0.geometry} material={materials.Tooner} />
        </group>
      </group>
      {/* elice */}
      <group name="polySurface182" position={[-0.02, 3.621, 4.332]} rotation={[-0.107, 0, 0]}>
        <group name="polySurface165" position={[-12.341, 1.3, -3.479]} rotation={[3.134, 0, 0]} scale={-1}>
          <group name="transform138" position={[-12.364, -8.487, 0.827]} rotation={[3.081, 0, 0]} scale={-1} />
          <group name="polySurface410" position={[-12.364, -8.487, 0.827]} rotation={[3.081, 0, 0]} scale={-1}>
            <mesh name="polySurface410_Tooner_0" geometry={nodes.polySurface410_Tooner_0.geometry} material={materials.Tooner} />
          </group>
          <mesh name="polySurface165_pasted__lambert2_0" geometry={nodes.polySurface165_pasted__lambert2_0.geometry} material={materials.pasted__lambert2} />
        </group>
        <group name="polySurface161" position={[12.388, 1.3, -3.44]} rotation={[0.175, 0, 0]}>
          <group name="pCube5" position={[1.802, 0.082, -1.876]} scale={[1, 1, 0.872]}>
            <mesh name="pCube5_lambert1_0" geometry={nodes.pCube5_lambert1_0.geometry} material={materials.lambert1} />
          </group>
          <group name="polySurface411" position={[-12.364, -8.489, 0.788]} rotation={[-0.061, 0, 0]}>
            <mesh name="polySurface411_Tooner_0" geometry={nodes.polySurface411_Tooner_0.geometry} material={materials.Tooner} />
          </group>
          <mesh name="polySurface161_pasted__lambert2_0" geometry={nodes.polySurface161_pasted__lambert2_0.geometry} material={materials.pasted__lambert2} />
        </group>
        <group name="polySurface409" position={[0.023, -7.222, -3.17]}>
          <mesh name="polySurface409_Tooner_0" geometry={nodes.polySurface409_Tooner_0.geometry} material={materials.Tooner} />
        </group>
        <mesh name="polySurface182_pasted__lambert2_0" geometry={nodes.polySurface182_pasted__lambert2_0.geometry} material={materials.pasted__lambert2} />
      </group>
      <group name="polySurface200" position={[0, -3.871, 1.373]}>
        <mesh name="polySurface200_pasted__lambert2_0" geometry={nodes.polySurface200_pasted__lambert2_0.geometry} material={spin && materials.pasted__lambert2} />
      </group>
      <group name="polySurface201" position={[0, -3.871, 1.373]}>
        <mesh name="polySurface201_pasted__lambert2_0" geometry={nodes.polySurface201_pasted__lambert2_0.geometry}  material={materials.pasted__lambert2} />
      </group>
      <group name="polySurface204" position={[0, -3.871, 1.373]}>
        <mesh name="polySurface204_pasted__lambert2_0" geometry={nodes.polySurface204_pasted__lambert2_0.geometry} material={spin && materials.pasted__lambert2} />
      </group>
      <group name="polySurface208" position={[0, -3.871, 1.373]}>
        <mesh name="polySurface208_pasted__lambert2_0" geometry={nodes.polySurface208_pasted__lambert2_0.geometry} material={spin && materials.pasted__lambert2} />
      </group>
      <group name="polySurface212" position={[0, -3.871, 1.373]}>
        <mesh name="polySurface212_pasted__lambert2_0" geometry={nodes.polySurface212_pasted__lambert2_0.geometry} material={spin && materials.pasted__lambert2} />
      </group>
      <group name="polySurface243" position={[0, -3.871, 1.373]}>
        <mesh name="polySurface243_pasted__lambert2_0" geometry={nodes.polySurface243_pasted__lambert2_0.geometry} material={materials.pasted__lambert2} />
      </group>
      <group name="polySurface292" position={[0, -3.871, 1.373]}>
        <mesh name="polySurface292_pasted__lambert2_0" geometry={nodes.polySurface292_pasted__lambert2_0.geometry} material={spin && materials.pasted__lambert2} />
      </group>
      <group name="polySurface308" position={[0, 0.093, 0.04]}>
        <mesh name="polySurface308_Tooner_0" geometry={nodes.polySurface308_Tooner_0.geometry} material={materials.Tooner} />
      </group>
    </group>
  )
}

useGLTF.preload('/src/scene/scene.gltf')
