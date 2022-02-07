import React, { Suspense } from 'react';
import {
  styled,
  darkTheme,
  Box,
  Section,
  Flex,
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger
} from '@modulz/design-system';
import { useRecoilValue } from 'recoil';

import { Canvas } from './components/Canvas';
import { colorTopState, colorBottomState } from './recoil/canvas/atom';
import { Toolbar } from './components/Toolbar';

const Canvas3D = React.lazy(() => import('./components/Canvas3D'));

const CanvasPlaceholder = styled('div', {
  maxWidth: '90vw',
  maxHeight: '60vh',
  width: 'min(60vh, 90vw)',
  height: 'min(60vh, 90vw)'
});

function App() {
  const colorTop = useRecoilValue(colorTopState);
  const colorBottom = useRecoilValue(colorBottomState);

  return (
    <>
      <Box className={darkTheme.className}>
        <Section>
          <Flex direction='column' align='center' gap='6'>
            <Tabs defaultValue='2D'>
              <TabsList>
                <TabsTrigger value='2D'>2D</TabsTrigger>
                <TabsTrigger value='3D'>3D</TabsTrigger>
                <TabsTrigger value='2UP'>2UP</TabsTrigger>
              </TabsList>
              <TabsContent value='2D'>
                <Canvas />
              </TabsContent>
              <TabsContent value='3D'>
                <Suspense
                  fallback={
                    <CanvasPlaceholder
                      css={{
                        background: `linear-gradient(180deg, ${colorTop} 0%, ${colorBottom} 100%)`
                      }}
                    />
                  }
                >
                  <Canvas3D />
                </Suspense>
              </TabsContent>
              <TabsContent value='2UP'>
                <Flex direction='row'>
                  <Canvas />
                  <Suspense
                    fallback={
                      <CanvasPlaceholder
                        css={{
                          background: `linear-gradient(180deg, ${colorTop} 0%, ${colorBottom} 100%)`
                        }}
                      />
                    }
                  >
                    <Canvas3D />
                  </Suspense>
                </Flex>
              </TabsContent>
            </Tabs>
            <Toolbar />
          </Flex>
        </Section>
      </Box>
    </>
  );
}

export default App;
