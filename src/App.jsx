import React from 'react';
import Layout from './components/Layout';
import BootSequence from './components/sections/BootSequence';
import KernelInit from './components/sections/KernelInit';
import SystemIdentity from './components/sections/SystemIdentity';
import ProcessTimeline from './components/sections/ProcessTimeline';
import WindowManager from './components/sections/WindowManager';
import SystemArchitecture from './components/sections/SystemArchitecture';
import LeetCodeStats from './components/sections/LeetCodeStats';
import Shutdown from './components/sections/Shutdown';

function App() {
  return (
    <Layout>
      <BootSequence />
      <KernelInit />
      <SystemIdentity />
      <ProcessTimeline />
      <WindowManager />
      <SystemArchitecture />
      <LeetCodeStats />
      <Shutdown />
    </Layout>
  );
}

export default App;
