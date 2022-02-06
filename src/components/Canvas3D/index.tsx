import React from 'react';

import { styled } from '@modulz/design-system';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, GradientTexture } from '@react-three/drei';

export const Canvas3D = ({
  bitmap,
  colorTop,
  colorBottom
}: {
  bitmap: (0 | 1 | 2)[][];
  colorTop: string;
  colorBottom: string;
}) => {
  const yOffset = bitmap.length / 2;
  const xOffset = bitmap[0].length / 2;

  return (
    <Wrapper>
      <Canvas
        dpr={window.devicePixelRatio}
        camera={{ position: [0, 0, yOffset * 1.33] }}
      >
        <OrbitControls />
        <GradientTexture
          attach='background'
          stops={[0, 1]}
          colors={[colorTop, colorBottom]}
        />

        {/* White light sources */}
        <pointLight position={[0, 0, 20]} />
        <pointLight position={[0, 0, -20]} />
        <pointLight position={[-xOffset, yOffset, 0]} />
        <pointLight position={[xOffset, yOffset, 0]} />

        {/* colorBottom light sources */}
        <pointLight position={[-xOffset, -yOffset, 10]} color={colorBottom} />
        <pointLight position={[xOffset, -yOffset, 10]} color={colorBottom} />

        <Center>
          {bitmap.map((rowData, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {rowData.map((value, columnIndex) =>
                value ? (
                  <mesh
                    key={columnIndex}
                    position={[
                      columnIndex - xOffset,
                      (rowIndex - yOffset) * -1,
                      0
                    ]}
                  >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                      color='white'
                      attachArray='material'
                    />
                    <meshStandardMaterial
                      color='white'
                      attachArray='material'
                    />
                    <meshStandardMaterial
                      color='white'
                      attachArray='material'
                    />
                    <meshStandardMaterial
                      color='white'
                      attachArray='material'
                    />
                    <meshStandardMaterial
                      color={
                        value === 1
                          ? 'black'
                          : value === 2
                          ? 'white'
                          : undefined
                      }
                      attachArray='material'
                    />
                    <meshStandardMaterial
                      color={
                        value === 1
                          ? 'black'
                          : value === 2
                          ? 'white'
                          : undefined
                      }
                      attachArray='material'
                    />
                  </mesh>
                ) : undefined
              )}
            </React.Fragment>
          ))}
        </Center>
      </Canvas>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  maxWidth: '90vw',
  maxHeight: '60vh',
  width: 'min(60vh, 90vw)',
  height: 'min(60vh, 90vw)'
});
