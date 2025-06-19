
import React from 'react';
import { Monitor } from 'lucide-react';

const SystemProperties = () => (
    <div className="bg-win-gray w-full h-full p-4 text-black relative">
        <div className="flex gap-4">
            <Monitor size={80} className="text-win-blue flex-shrink-0 mt-4" />
            <div className="text-sm space-y-1">
                <p>NatashaOS</p>
                <p className="text-xs">inspired by Microsoft Windows 95</p>
                <p>Version 1.0.0</p>
                <div className="border-t-2 border-inset my-3" />
                <p>This portfolio is a property of:</p>
                <p className="font-bold">[Your Name Here]</p>
                <div className="border-t-2 border-inset my-3" />
                <p>Computer:</p>
                <p className="font-mono text-xs">Natasha Atom @ 1.0 GHz</p>
                <p className="font-mono text-xs">256.0MB RAM</p>
            </div>
        </div>
        <div className="absolute bottom-4 right-4">
            <button className="border-outset bg-win-gray px-6 py-1 active:border-inset">OK</button>
        </div>
    </div>
);

export default SystemProperties;
