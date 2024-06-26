import React, { useEffect, useState } from 'react';
import TimeDisplay from './TimeDisplay';
import useVoiceRecorder from '../hoocks/useVoiceRecorder';
import useAudioPlayer from '../hoocks/useAudioPlayer';
import useCounter from '../hoocks/useCounter';
import StartRecordingButton from './Buttons/StartRecordingButton';
import StopButton from './Buttons/StopButton';
import PauseButton from './Buttons/PauseButton';
import CancelButton from './Buttons/CancelButton';
import SaveButton from './Buttons/SaveButton';

function VoiceRecorder() {

    // custom hoocks
    const counter = useCounter()
    const recorder = useVoiceRecorder();
    const player = useAudioPlayer(() => recorder.toURL());

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="text-4xl font-bold mb-4 text-blue-500">Voice Recorder</div>
            <TimeDisplay time={formatTime(counter.value)} />
            <div className="flex space-x-4 mb-4">
                {!recorder.isRecording && !recorder.isRecorded ? (
                    <StartRecordingButton onClick={recorder.start} />
                ) : (
                    <>
                        {!recorder.isRecorded ? (
                            <>
                                <PauseButton playText="Resume" isPaused={recorder.isPaused} onToggle={recorder.togglePause} />

                                <StopButton onClick={recorder.stop} />
                            </>
                        ) : (
                            <>
                            {/* listen to voice record */}
                                <PauseButton playText="Play" isPaused={ !player.isPlayed } onToggle={player.togglePause} />

                                <CancelButton
                                    onClick={() => {
                                        recorder.cancel();
                                        player.cancel();
                                    }}
                                />

                                <SaveButton onClick={recorder.saveAsFile} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default VoiceRecorder;
