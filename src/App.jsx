import React, { useState, useRef } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import { CounterProvider } from './providers/CounterProvider';

function App() {
  return (
    <CounterProvider>
      <VoiceRecorder />
    </CounterProvider>
  );
}

export default App;
