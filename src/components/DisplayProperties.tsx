
import React, { useState } from 'react';
import { Monitor } from 'lucide-react';

const wallpapers = [
    { name: 'None', class: 'bg-win-blue' },
    { name: 'Teal', class: 'bg-win-teal' },
    { name: 'Purple', class: 'bg-win-purple' },
    { name: 'Green', class: 'bg-win-green' },
    { name: 'Starry Night', class: "bg-[url('/photo-1470813740244-df37b8c1edcb')]" },
    { name: 'DevMon', class: "bg-[url('/photo-1461749280684-dccba630e2f6')]" },
    { name: 'The Matrix', class: "bg-[url('/photo-1526374965328-7f61d4dc18c5')]" },
];

export type WallpaperStyle = 'tile' | 'center' | 'stretch';

const DisplayProperties = ({ currentWallpaper, currentStyle, onApply, onClose }: {
    currentWallpaper: string;
    currentStyle: WallpaperStyle;
    onApply: (wallpaper: string, style: WallpaperStyle) => void;
    onClose: () => void;
}) => {
    const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
    const [selectedStyle, setSelectedStyle] = useState<WallpaperStyle>(currentStyle);

    const handleApply = () => {
        onApply(selectedWallpaper, selectedStyle);
    };
    
    const handleOk = () => {
        onApply(selectedWallpaper, selectedStyle);
        onClose();
    };

    const getPreviewStyleClasses = () => {
        if (!selectedWallpaper.includes('url')) {
            return selectedWallpaper;
        }
        switch(selectedStyle) {
            case 'tile': return `${selectedWallpaper} bg-repeat`;
            case 'center': return `bg-win-blue ${selectedWallpaper} bg-no-repeat bg-center bg-contain`;
            case 'stretch':
            default: return `${selectedWallpaper} bg-cover bg-center`;
        }
    }

    return (
        <div className="bg-win-gray w-full h-full p-2 flex flex-col text-black text-sm">
            <div className="border-inset bg-white p-2 flex-grow flex flex-col items-center justify-center mb-2">
                <div className="relative w-48 h-36 bg-win-blue border-inset">
                    <Monitor size={120} className="absolute inset-0 m-auto text-win-blue-light" strokeWidth={1}/>
                    <div className={`absolute inset-[15px] border-outset bg-win-blue ${getPreviewStyleClasses()}`}></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
                <div>
                    <label className="block mb-1">Wallpaper</label>
                    <div className="border-inset bg-white p-1 h-32 overflow-y-scroll">
                        {wallpapers.map(wp => (
                            <p key={wp.name}
                                onClick={() => setSelectedWallpaper(wp.class)}
                                className={`p-0.5 cursor-pointer select-none ${selectedWallpaper === wp.class ? 'bg-win-blue text-white' : ''}`}
                            >
                                {wp.name}
                            </p>
                        ))}
                    </div>
                </div>
                 <div>
                    <label className="block mb-1">Display:</label>
                    <select
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value as WallpaperStyle)}
                        className="w-full border-inset p-1 bg-white"
                        disabled={!selectedWallpaper.includes('url')}
                    >
                        <option value="stretch">Stretch</option>
                        <option value="center">Center</option>
                        <option value="tile">Tile</option>
                    </select>
                </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-2">
                <button onClick={handleOk} className="border-outset bg-win-gray px-6 py-1 active:border-inset">OK</button>
                <button onClick={onClose} className="border-outset bg-win-gray px-6 py-1 active:border-inset">Cancel</button>
                <button onClick={handleApply} className="border-outset bg-win-gray px-6 py-1 active:border-inset">Apply</button>
            </div>
        </div>
    );
};

export default DisplayProperties;
