import React, { useState, useEffect } from 'react';

function PianoKeyboard() {
    const [activeKey, setActiveKey] = useState(null);
    const [audioContext, setAudioContext] = useState(null);

    // AudioContext 초기화
    useEffect(() => {
        setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
    }, []);

    const pianoKeys = [
        { note: 'C', freq: 261.63, isSharp: false },
        { note: 'C#', freq: 277.18, isSharp: true },
        { note: 'D', freq: 293.66, isSharp: false },
        { note: 'D#', freq: 311.13, isSharp: true },
        { note: 'E', freq: 329.63, isSharp: false },
        { note: 'F', freq: 349.23, isSharp: false },
        { note: 'F#', freq: 369.99, isSharp: true },
        { note: 'G', freq: 392.00, isSharp: false },
        { note: 'G#', freq: 415.30, isSharp: true },
        { note: 'A', freq: 440.00, isSharp: false },
        { note: 'A#', freq: 466.16, isSharp: true },
        { note: 'B', freq: 493.88, isSharp: false }
    ];

    // 음을 재생하는 함수
    const playNote = (frequency) => {
        if (!audioContext) return;

        // 오실레이터 생성 (소리를 만드는 진동자)
        const oscillator = audioContext.createOscillator();
        // 게인 노드 생성 (소리의 크기를 조절)
        const gainNode = audioContext.createGain();

        // 오실레이터 설정
        oscillator.type = 'sine'; // sine, square, sawtooth, triangle 중 선택
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        // 게인(볼륨) 설정
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // 볼륨 0.5로 시작
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5); // 0.5초 동안 페이드아웃

        // 연결: 오실레이터 -> 게인 -> 스피커
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // 소리 재생 시작
        oscillator.start();
        // 0.5초 후 중지
        oscillator.stop(audioContext.currentTime + 0.5);
    };

    const handleKeyClick = (note, freq) => {
        setActiveKey(note);
        playNote(freq);
        console.log(`건반 클릭됨: ${note} (${freq}Hz)`);
    };

    // 검은 건반의 위치를 계산하는 함수
    const getBlackKeyOffset = (index) => {
        const whiteKeyWidth = 64;
        
        if (index === 0) return whiteKeyWidth * 0.75;  // C#
        if (index === 1) return whiteKeyWidth * 1.75;  // D#
        if (index === 2) return whiteKeyWidth * 3.75;  // F#
        if (index === 3) return whiteKeyWidth * 4.75;  // G#
        if (index === 4) return whiteKeyWidth * 5.75;  // A#
        
        return 0;
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Virtual Piano</h2>
            <div className="relative flex">
                {/* 흰 건반 렌더링 */}
                {pianoKeys.map((key) => !key.isSharp && (
                    <div
                        key={key.note}
                        className={`relative w-16 h-48 border border-gray-300 bg-white hover:bg-gray-100 
                            ${activeKey === key.note ? 'bg-gray-200' : ''}`}
                        onClick={() => handleKeyClick(key.note, key.freq)}
                    >
                        <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-600">
                            {key.note}
                        </span>
                    </div>
                ))}
                
                {/* 검은 건반 렌더링 */}
                <div className="absolute top-0 left-0 flex">
                    {pianoKeys.filter(key => key.isSharp).map((key, index) => (
                        <div
                            key={key.note}
                            className={`absolute w-8 h-32 bg-black hover:bg-gray-800 border border-gray-600
                                ${activeKey === key.note ? 'bg-gray-700' : ''}`}
                            style={{
                                left: `${getBlackKeyOffset(index)}px`
                            }}
                            onClick={() => handleKeyClick(key.note, key.freq)}
                        >
                            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm">
                                {key.note}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PianoKeyboard;