
import React from 'react';
import { Star } from 'lucide-react';

const tips = [
    "Right-click on the desktop to change its properties.",
    "You can drag and resize windows.",
    "Double-click on desktop icons to open them.",
    "Check out the Start Menu for more applications.",
    "The Terminal has a few fun commands like 'ls projects' and 'cat contact.txt'."
];

const Welcome = ({ onClose }: { onClose: () => void }) => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
        <div className="bg-win-gray w-full h-full p-4 flex flex-col text-black">
            <div className="flex-grow">
                <h2 className="text-xl font-bold mb-4">Welcome to NatashaOS!</h2>
                <p className="mb-4">This is an interactive portfolio inspired by classic desktop operating systems. Explore the apps and feel free to look around.</p>
                <div className="border-inset p-2 bg-white flex items-start gap-2">
                    <Star size={32} className="text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold">Did you know?</h3>
                        <p>{randomTip}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={onClose} className="border-outset bg-win-gray px-6 py-1 active:border-inset">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Welcome;
