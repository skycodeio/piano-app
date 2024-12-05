import React, {useState, useEffect} from 'react';

function PianoKeyboard() {

    const pianoKeys = [
        { note: 'C', freq: 261.63, color: 'white' },  // 도
        { note: 'C#', freq: 277.18, color: 'black' }, // 도#
        { note: 'D', freq: 293.66, color: 'white' },  // 레
        { note: 'D#', freq: 311.13, color: 'black' }, // 레#
        { note: 'E', freq: 329.63, color: 'white' },  // 미
        { note: 'F', freq: 349.23, color: 'white' },  // 파
        { note: 'F#', freq: 369.99, color: 'black' }, // 파#
        { note: 'G', freq: 392.00, color: 'white' },  // 솔
        { note: 'G#', freq: 415.30, color: 'black' }, // 솔#
        { note: 'A', freq: 440.00, color: 'white' },  // 라
        { note: 'A#', freq: 466.16, color: 'black' }, // 라#
        { note: 'B', freq: 493.88, color: 'white' }   // 시
      ];

    return (
        <div>
            <h1>피아노 키보드</h1>
        </div>
    );
}

export default PianoKeyboard;

