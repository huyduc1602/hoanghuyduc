import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

import sakura from "@/assets/sakura.mp3";
import { HomeInfo, Loader, Meta } from "@/components";
import { soundoff, soundon } from "@/assets/icons";
import { Bird, Island, Plane, Sky } from "@/models";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <>
      <Meta
        title="Home"
        description="Welcome to Hoang Huy Duc's portfolio - Full Stack Developer specializing in modern web technologies"
        keywords="home, portfolio, web developer, full stack, react developer"
      />
      <section className='w-full h-screen relative'>
        <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
          {currentStage && <HomeInfo currentStage={currentStage} />}
        </div>

        <Canvas
          className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"
            }`}
          camera={{ near: 0.1, far: 1000 }}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight
              position={[1, 1, 1]}
              intensity={isDarkMode ? 1 : 2}
            />
            <ambientLight intensity={isDarkMode ? 0.3 : 0.5} />
            <pointLight
              position={[10, 5, 10]}
              intensity={isDarkMode ? 1 : 2}
            />
            <spotLight
              position={[0, 50, 10]}
              angle={0.15}
              penumbra={1}
              intensity={isDarkMode ? 1 : 2}
            />
            <hemisphereLight
              skyColor={isDarkMode ? '#1a1a2e' : '#b1e1ff'}
              groundColor='#000000'
              intensity={isDarkMode ? 0.5 : 1}
            />

            <Bird />
            <Sky isRotating={isRotating} />
            <Island
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
              position={islandPosition}
              rotation={[0.1, 4.7077, 0]}
              scale={islandScale}
            />
            <Plane
              isRotating={isRotating}
              position={biplanePosition}
              rotation={[0, 20.1, 0]}
              scale={biplaneScale}
            />
          </Suspense>
        </Canvas>

        <div className='absolute bottom-2 left-2'>
          <img
            src={!isPlayingMusic ? soundoff : soundon}
            alt='jukebox'
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            className='w-auto h-10 cursor-pointer object-contain'
          />
        </div>
      </section>
    </>
  );
};

export default Home;
