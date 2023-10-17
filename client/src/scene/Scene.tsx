import { Canvas } from '@react-three/fiber'
import { Plane } from './Plane'
import { PerspectiveCamera, Sky } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
function Scene({theme}: any) {
    const cameraRef = useRef<any>()
    useEffect(() => {
        // setTimeout(() => {   
        //     cameraRef.current.position.x = 5;
        //     console.log('sex');
        // }, 3000)
        // setTimeout(() => {   
        //     cameraRef.current.position.x = 15;
        //     console.log('sex');
        // }, 6000)
    }, [])
    return (
    <div className=''>
        <Canvas style={{width: '100vw', height: '100vh'}}>
            <PerspectiveCamera ref={cameraRef} makeDefault position={[10, 100, 4]} rotation={[-Math.PI/2, 0, 0]} fov={10} />
            <ambientLight />
            {theme === 'light' && <Sky sunPosition={[10, 10, 110]} />}
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <Plane spin={true} position={[5,0,3]} rotation="up"/>
                <Plane spin={false} position={[4,0,1]} rotation="right"/>
                <Plane spin={true} position={[18,0,1.4]} rotation="left"/>
                <gridHelper args={[21, 21, '#444', '#444']} position={[10, 0, -1]} />
                
                <group>
                    {/* make 10 by 10 grid */}
                    {Array.from(Array(10).keys()).map((x) => {
                        return Array.from(Array(10).keys()).map((z) => {
                            return (
                            <mesh position={[x, 0, z]}>
                                <boxGeometry args={[0.8, 0.1, 0.8]} />
                                <meshStandardMaterial color='#3c3' transparent opacity={0.1} />
                            </mesh>
                            )
                        })
                    })}
                </group>
                <group>
                    {/* make 10 by 10 grid */}
                    {Array.from(Array(10).keys()).map((x) => {
                        return Array.from(Array(10).keys()).map((z) => {
                            return (
                            <mesh position={[x+11, 0, z]} onClick={() => console.log('x:'+x+'; z:'+z)}>
                                <boxGeometry args={[0.8, 0.1, 0.8]} />
                                <meshStandardMaterial color='#c33' transparent opacity={0.1} />
                            </mesh>
                            )
                        })
                    })}
                </group>
            </Suspense>
        </Canvas>
    </div>
    )
}

export default Scene