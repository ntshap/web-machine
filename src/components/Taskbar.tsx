
import React, { useState, useEffect } from 'react';
import { Star, Code, FileText, Terminal as TerminalIcon, Mail } from 'lucide-react';
import { WindowState, Action } from '@/pages/Index';

type TaskbarProps = {
    openWindows: WindowState[];
    dispatch: React.Dispatch<Action>;
    onOpenApp: (app: string, title: string, options?: Partial<Omit<WindowState, 'id' | 'app' | 'title' | 'zIndex' | 'isMinimized' | 'isMaximized' | 'prevData'>>) => void;
};

const Taskbar = ({ openWindows, dispatch, onOpenApp }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-win-gray border-outset flex items-center p-1 z-50">
      <div className="relative">
        <button onClick={() => setStartMenuOpen(!startMenuOpen)} className="border-outset bg-win-gray px-2 py-0.5 flex items-center gap-1 active:border-inset">
          <Star size={24} className="text-yellow-400" />
          <b>Start</b>
        </button>
        {startMenuOpen && (
           <div className="absolute bottom-full mb-1 bg-win-gray border-outset w-56 flex" onClick={() => setStartMenuOpen(false)}>
              <div className="w-8 bg-win-blue text-white flex items-end justify-center p-1">
                <span className="transform -rotate-90 whitespace-nowrap text-2xl tracking-widest font-black">Natasha</span>
              </div>
              <div className="flex-1 p-1">
                <div onClick={() => onOpenApp('FileExplorer', 'Portfolio')} className="flex items-center gap-2 p-1 hover:bg-win-blue hover:text-white cursor-pointer"><Code size={24} /> Portfolio</div>
                <div onClick={() => onOpenApp('Notepad', 'README.txt', { appData: { isAboutMe: true }})} className="flex items-center gap-2 p-1 hover:bg-win-blue hover:text-white cursor-pointer"><FileText size={24} /> About Me</div>
                <div onClick={() => onOpenApp('Terminal', 'MS-DOS Prompt')} className="flex items-center gap-2 p-1 hover:bg-win-blue hover:text-white cursor-pointer"><TerminalIcon size={24} /> Terminal</div>
                <div onClick={() => onOpenApp('Guestbook', 'Guestbook')} className="flex items-center gap-2 p-1 hover:bg-win-blue hover:text-white cursor-pointer"><Mail size={24} /> Guestbook</div>
              </div>
           </div>
        )}
      </div>

      <div className="h-full border-l-2 border-inset mx-2"></div>
      <div className="h-full border-l-2 border-outset mx-1"></div>
      
      <div className="flex-grow flex gap-1 items-center overflow-x-auto">
        {openWindows.map(win => (
          <button
            key={win.id}
            onClick={() => win.isMinimized ? dispatch({ type: 'RESTORE', payload: { id: win.id } }) : dispatch({ type: 'FOCUS', payload: { id: win.id } })}
            className={`border-outset bg-win-gray px-2 h-full flex-shrink-0 w-36 text-left truncate ${!win.isMinimized ? 'border-inset font-bold' : ''}`}
          >
            {win.title}
          </button>
        ))}
      </div>

      <div className="border-inset p-1 ml-auto">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default Taskbar;
