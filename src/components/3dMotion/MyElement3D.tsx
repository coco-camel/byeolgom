import { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import styled from 'styled-components';
import { Texture } from 'three';
import { getStarCount } from '../../api/count';

// Assets
const starImagePath = '/assets/star.png';
const unionImagePath = '/assets/union.png';

interface StarProps {
  texture: Texture;
  offsetTime: number;
}

interface CentralImageProps {
  texture: Texture;
}

const CentralImage: React.FC<CentralImageProps> = ({ texture }) => (
  <mesh position={[0, 0, 0]}>
    <planeGeometry args={[6, 6]} />
    <meshStandardMaterial map={texture} transparent />
  </mesh>
);

const Star: React.FC<StarProps> = ({ texture, offsetTime }) => {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.3 + offsetTime;
    if (ref.current) {
      ref.current.position.x = 4 * Math.sin(time);
      ref.current.position.y = (4 * Math.sin(time)) / 2;
      ref.current.position.z = 1.5 * Math.cos(time);
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color="#ffffff" map={texture} transparent />
    </mesh>
  );
};

const MyElement3D: React.FC = () => {
  const [textureStar, setTextureStar] = useState<Texture | null>(null);
  const [textureUnion, setTextureUnion] = useState<Texture | null>(null);
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    new TextureLoader().load(starImagePath, (texture) => {
      setTextureStar(texture);
    });
    new TextureLoader().load(unionImagePath, (texture) => {
      setTextureUnion(texture);
    });
  }, []);

  useEffect(() => {
    getStarCount().then((res) => {
      setStarCount(res);
    });
    const interval = setInterval(() => {
      getStarCount().then((res) => {
        setStarCount(res);
      });
    }, 1000 * 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimationGroup>
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 5, 5]} />
        <Suspense fallback={<div>Loading...</div>}>
          {textureUnion && <CentralImage texture={textureUnion} />}
          {textureStar &&
            Array.from({ length: starCount }, (_, index) => (
              <Star
                key={index}
                texture={textureStar}
                offsetTime={(index * (2 * Math.PI)) / starCount}
              />
            ))}
        </Suspense>
      </Canvas>
    </AnimationGroup>
  );
};

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
