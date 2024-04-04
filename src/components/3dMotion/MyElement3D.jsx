import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import starImage from '/assets/star.png';
import unionImage from '/assets/union.png';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';

const CentralImage = ({ texture }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[6, 6]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  );
};

const Star = ({ texture, offsetTime }) => {
  const ref = useRef();

  useFrame((state) => {
    const speedFactor = 0.3;
    const time = state.clock.getElapsedTime() * speedFactor + offsetTime / 1.5;
    const radiusX = 4; // 별이 도는 x축의 반지름을 절반으로 줄임
    const radiusZ = 1.5; // z축의 반지름은 그대로 유지

    // 별의 x, y, z 위치를 계산
    ref.current.position.x = radiusX * Math.sin(time); // x축 이동 범위를 줄임
    ref.current.position.y = (radiusX * Math.sin(time)) / 2;
    ref.current.position.z = radiusZ * Math.cos(time); // z축 이동 범위는 그대로 유지
  });
  return (
    <mesh ref={ref}>
      <planeGeometry args={[0.6, 0.6]} />
      <meshStandardMaterial color="#ffffff" map={texture} transparent={true} />
    </mesh>
  );
};

function MyElement3D() {
  const textureStar = useLoader(TextureLoader, starImage);
  const textureUnion = useLoader(TextureLoader, unionImage);
  const [stars, setStars] = useState([]);
  useEffect(() => {
    setStars(
      [0, 1, 2, 3, 4].map((offset) => ({
        offsetTime: (offset * (2 * Math.PI)) / 5,
      })),
    );
  }, []);

  return (
    <AnimationGroup>
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 5, 5]} />
        <CentralImage texture={textureUnion} />
        {stars.map((star, index) => (
          <Star
            key={index}
            texture={textureStar}
            offsetTime={star.offsetTime}
          />
        ))}
      </Canvas>
    </AnimationGroup>
  );
}

export default MyElement3D;

const AnimationGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  max-height: 300px;
`;
