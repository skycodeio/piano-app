import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, {useState} from 'react';

function PianoKeyboard() {

    const [activeKey, setActiveKey] = useState(null);


      const pianoKeys = [
        { note: 'C', freq: 261.63, isSharp: false },   // 도
        { note: 'C#', freq: 277.18, isSharp: true },   // 도#
        { note: 'D', freq: 293.66, isSharp: false },   // 레
        { note: 'D#', freq: 311.13, isSharp: true },   // 레#
        { note: 'E', freq: 329.63, isSharp: false },   // 미
        { note: 'F', freq: 349.23, isSharp: false },   // 파
        { note: 'F#', freq: 369.99, isSharp: true },   // 파#
        { note: 'G', freq: 392.00, isSharp: false },   // 솔
        { note: 'G#', freq: 415.30, isSharp: true },   // 솔#
        { note: 'A', freq: 440.00, isSharp: false },   // 라
        { note: 'A#', freq: 466.16, isSharp: true },   // 라#
        { note: 'B', freq: 493.88, isSharp: false }    // 시
    ];

    const handleKeyClick = (note) => {
        setActiveKey(note);
        console.log(`건반 클릭됨: ${note}`);
    }

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Virtual Piano</h2>
            <div className="relative flex">
                {/* 흰 건반 먼저 렌더링 */}
                {pianoKeys.map((key) => !key.isSharp && (
                    <div
                        key={key.note}
                        className={`relative w-16 h-48 border border-gray-300 bg-white hover:bg-gray-100 
                            ${activeKey === key.note ? 'bg-gray-200' : ''}`}
                        onClick={() => handleKeyClick(key.note)}
                    >
                        <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-600">
                            {key.note}
                        </span>
                    </div>
                ))}
                
                {/* 검은 건반은 겹쳐서 렌더링 */}
                <div className="absolute top-0 left-0 flex">
                    {pianoKeys.map((key, index) => key.isSharp && (
                        <div
                            key={key.note}
                            className={`w-8 h-32 bg-black hover:bg-gray-800 border border-gray-600
                                ${activeKey === key.note ? 'bg-gray-700' : ''}
                                ${index === 2 ? 'ml-28' : ''} 
                                ${index === 6 ? 'ml-28' : ''}`}
                            style={{
                                marginLeft: `${(index * 16) + (index > 2 ? 16 : 0) + (index > 6 ? 16 : 0)}px`
                            }}
                            onClick={() => handleKeyClick(key.note)}
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

