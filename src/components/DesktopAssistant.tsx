
import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Bot, X } from 'lucide-react';

const tips = [
    "Did you know you can drag the windows around?",
    "Right-click on the desktop for options!",
    "Try typing 'help' in the Terminal.",
    "Double-click icons to open applications.",
    "The Start menu has more apps.",
    "Feeling nostalgic yet?",
    "You can resize windows from the bottom-right corner.",
    "This portfolio was built with Natas, an AI-powered editor!",
];

const DesktopAssistant = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [tip, setTip] = useState(tips[0]);
    const nodeRef = React.useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTip(tips[Math.floor(Math.random() * tips.length)]);
        }, 15000); // Change tip every 15 seconds

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <Draggable nodeRef={nodeRef} handle=".handle">
            <div ref={nodeRef} className="fixed bottom-20 right-10 z-[9999] flex items-end gap-2" style={{ pointerEvents: 'none' }}>
                <div className="relative bg-win-gray border-outset p-2 max-w-[220px] text-black" style={{ pointerEvents: 'auto' }}>
                    <button 
                        onClick={() => setIsVisible(false)} 
                        className="absolute top-1 right-1 bg-win-gray border-outset w-5 h-5 flex items-center justify-center text-black hover:bg-gray-300 active:border-inset"
                        style={{ cursor: 'pointer' }}
                    >
                        <X size={12} />
                    </button>
                    <p className="font-sans text-base pr-4">{tip}</p>
                </div>
                <div className="handle" style={{ pointerEvents: 'auto', cursor: 'move' }}>
                    <Bot size={64} className="text-gray-800" />
                </div>
            </div>
        </Draggable>
    );
};

export default DesktopAssistant;
