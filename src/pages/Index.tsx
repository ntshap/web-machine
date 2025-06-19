
import React, { useState, useEffect, useReducer, useRef } from 'react';
import { FileText, Folder, Trash2, Mail, Code, Terminal as TerminalIcon, Monitor, Tv } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from "@/components/ui/context-menu";

import DesktopAssistant from "@/components/DesktopAssistant";
import Welcome from '@/components/Welcome';
import DisplayProperties, { WallpaperStyle } from '@/components/DisplayProperties';
import Window from '@/components/Window';
import DesktopIcon from '@/components/DesktopIcon';
import Taskbar from '@/components/Taskbar';
import BootScreen from '@/components/BootScreen';
import Notepad from '@/components/Notepad';
import FileExplorer from '@/components/FileExplorer';
import Terminal from '@/components/Terminal';
import Guestbook from '@/components/Guestbook';
import SystemProperties from '@/components/SystemProperties';

// --- PLACEHOLDER CONTENT (Edit this with your information) ---
export const aboutMeContent = `
Hello! I'm [Your Name].
Welcome to my digital space.

I am a [Your Role] with a passion for building creative and user-friendly web applications. I specialize in React, TypeScript, and Tailwind CSS.

This portfolio is a showcase of my love for nostalgic UI and interactive web experiences. Feel free to explore!

You can find my resume details here or link to a PDF.
`;

export const projects = [
  { id: 'proj1', name: 'Project Alpha', content: 'Description of Project Alpha. A very cool project that does amazing things.' },
  { id: 'proj2', name: 'Project Beta', content: 'Description of Project Beta. Even cooler than the first one.' },
  { id: 'proj3', name: 'Another Project', content: 'Description of another project. Built with love and caffeine.' },
];

export const contactInfo = `
You can reach me via:

Email: your.email@example.com
LinkedIn: linkedin.com/in/yourprofile
GitHub: github.com/yourusername
`;

// --- TYPES and STATE MANAGEMENT ---

export type WindowState = {
  id: number;
  title: string;
  app: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  prevData?: { position: { x: number; y: number }; size: { width: number; height: number } };
  appData?: any;
};

export type Action =
  | { type: 'OPEN'; payload: Omit<WindowState, 'id' | 'zIndex' | 'isMinimized' | 'isMaximized' | 'prevData'> }
  | { type: 'CLOSE'; payload: { id: number } }
  | { type: 'FOCUS'; payload: { id: number } }
  | { type: 'MINIMIZE'; payload: { id: number } }
  | { type: 'RESTORE'; payload: { id: number } }
  | { type: 'TOGGLE_MAXIMIZE'; payload: { id: number; viewport: { width: number, height: number } } }
  | { type: 'UPDATE_POSITION'; payload: { id: number; position: { x: number; y: number } } }
  | { type: 'UPDATE_SIZE'; payload: { id: number; size: { width: number; height: number } } };

const windowReducer = (state: WindowState[], action: Action): WindowState[] => {
  switch (action.type) {
    case 'OPEN': {
      const newWindow: WindowState = {
        ...action.payload,
        id: Date.now(),
        zIndex: Math.max(...state.map(w => w.zIndex), 0) + 1,
        isMinimized: false,
        isMaximized: false,
      };
      return [...state, newWindow];
    }
    case 'CLOSE':
      return state.filter(w => w.id !== action.payload.id);
    case 'FOCUS':
      return state.map(w => w.id === action.payload.id ? { ...w, zIndex: Math.max(...state.map(w => w.zIndex), 0) + 1, isMinimized: w.isMaximized ? w.isMinimized : false } : w);
    case 'MINIMIZE':
      return state.map(w => w.id === action.payload.id ? { ...w, isMinimized: true } : w);
    case 'RESTORE':
      return state.map(w =>
        w.id === action.payload.id ? { ...w, isMinimized: false, zIndex: Math.max(...state.map(w => w.zIndex), 0) + 1 } : w
      );
    case 'TOGGLE_MAXIMIZE': {
      return state.map(w => {
        if (w.id !== action.payload.id) return w;
        
        const zIndex = Math.max(...state.map(win => win.zIndex), 0) + 1;

        if (w.isMaximized) {
          // Restore
          return {
            ...w,
            isMaximized: false,
            position: w.prevData?.position || { x: 50, y: 50 },
            size: w.prevData?.size || { width: 640, height: 480 },
            prevData: undefined,
            zIndex,
          };
        } else {
          // Maximize
          return {
            ...w,
            isMaximized: true,
            isMinimized: false,
            prevData: { position: w.position, size: w.size },
            position: { x: 0, y: 0 },
            size: action.payload.viewport,
            zIndex,
          };
        }
      });
    }
    case 'UPDATE_POSITION':
      return state.map(w => w.id === action.payload.id ? { ...w, position: action.payload.position } : w);
    case 'UPDATE_SIZE':
      return state.map(w => w.id === action.payload.id ? { ...w, size: action.payload.size } : w);
    default:
      return state;
  }
};

const initialWindows: WindowState[] = [{
    app: 'Welcome',
    title: 'Welcome to NatashaOS!',
    id: 1,
    position: { x: 100, y: 100 },
    size: { width: 450, height: 300 },
    zIndex: 1,
    isMinimized: false,
    isMaximized: false
}];

const Index = () => {
  const [windows, dispatch] = useReducer(windowReducer, initialWindows);
  const [booted, setBooted] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState('bg-win-blue');
  const [wallpaperStyle, setWallpaperStyle] = useState<WallpaperStyle>('stretch');

  const openApp = (app: string, title: string, options: Partial<Omit<WindowState, 'id' | 'app' | 'title' | 'zIndex' | 'isMinimized' | 'isMaximized' | 'prevData'>> = {}) => {
      const existing = windows.find(w => w.app === app && !w.appData); // Don't focus existing FileViewer windows
      if(existing) {
          dispatch({ type: 'FOCUS', payload: { id: existing.id } });
          return;
      }
      const defaultOptions = {
        position: { x: Math.random() * 200 + 50, y: Math.random() * 200 + 50 },
        size: { width: 640, height: 480 },
      };
      dispatch({type: 'OPEN', payload: {app, title, ...defaultOptions, ...options}});
  }

  const handleOpenFile = (file: typeof projects[0]) => {
    openApp('FileViewer', file.name, {
      size: { width: 400, height: 300 },
      appData: file // Custom data for the window
    });
  }

  const renderApp = (win: WindowState) => {
    switch(win.app) {
      case 'Notepad': return <Notepad content={aboutMeContent} />;
      case 'FileExplorer': return <FileExplorer onOpenFile={handleOpenFile} />;
      case 'Terminal': return <Terminal />;
      case 'Guestbook': return <Guestbook />;
      case 'FileViewer': return <Notepad content={win.appData.content} />;
      case 'SystemProperties': return <SystemProperties />;
      case 'Welcome': return <Welcome onClose={() => dispatch({type: 'CLOSE', payload: {id: win.id}})} />;
      case 'DisplayProperties': return <DisplayProperties 
        currentWallpaper={wallpaper}
        currentStyle={wallpaperStyle}
        onApply={(newWallpaper, newStyle) => {
            setWallpaper(newWallpaper);
            setWallpaperStyle(newStyle);
        }}
        onClose={() => dispatch({type: 'CLOSE', payload: {id: win.id}})}
      />;
      default: return null;
    }
  };
  
  const getWallpaperClasses = () => {
    if (!wallpaper.includes('url')) {
        return wallpaper;
    }
    switch(wallpaperStyle) {
        case 'tile': return `${wallpaper} bg-repeat`;
        case 'center': return `bg-win-blue ${wallpaper} bg-no-repeat bg-center bg-contain`;
        case 'stretch':
        default: return `${wallpaper} bg-cover bg-center`;
    }
  }

  if (!booted) {
    return <BootScreen onBooted={() => setBooted(true)} />;
  }
  
  const desktopIcons = [
    { label: "My Computer", icon: <Monitor size={48} />, onDoubleClick: () => openApp('SystemProperties', 'System Properties', { size: { width: 450, height: 320 } }) },
    { label: "Portfolio", icon: <Code size={48} />, onDoubleClick: () => openApp('FileExplorer', 'Portfolio') },
    { label: "README.txt", icon: <FileText size={48} />, onDoubleClick: () => openApp('Notepad', 'README.txt', {appData: {isAboutMe: true}}) },
    { label: "Terminal", icon: <TerminalIcon size={48} />, onDoubleClick: () => openApp('Terminal', 'MS-DOS Prompt') },
    { label: "Guestbook", icon: <Mail size={48} />, onDoubleClick: () => openApp('Guestbook', 'Guestbook') },
    { label: "Recycle Bin", icon: <Trash2 size={48} />, onDoubleClick: () => alert("It's empty!") },
  ];

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div 
          className={`${getWallpaperClasses()} w-screen h-screen overflow-hidden relative crt`}
          onClick={() => setSelectedIcon(null)}
        >
          <div className="p-4 grid grid-cols-[repeat(auto-fill,96px)] gap-4">
            {desktopIcons.map(icon => (
              <DesktopIcon 
                key={icon.label}
                label={icon.label} 
                icon={icon.icon} 
                onDoubleClick={icon.onDoubleClick}
                isSelected={selectedIcon === icon.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIcon(icon.label);
                }}
              />
            ))}
          </div>

          {windows.filter(w => !w.isMinimized).map(win => (
            <Window key={win.id} win={win} dispatch={dispatch}>
              {renderApp(win)}
            </Window>
          ))}

          <DesktopAssistant />

          <Taskbar openWindows={windows} dispatch={dispatch} onOpenApp={openApp} />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="bg-win-gray border-outset text-black p-1 w-48">
          <ContextMenuItem className="p-1 select-none hover:bg-win-blue hover:text-white flex items-center gap-2" onSelect={() => alert('This is for show... for now!')}><Folder size={20} /> New Folder</ContextMenuItem>
          <ContextMenuSeparator className="bg-stone-400/50 my-1 h-px" />
          <ContextMenuItem className="p-1 select-none hover:bg-win-blue hover:text-white" onSelect={() => openApp('DisplayProperties', 'Display Properties', { size: { width: 440, height: 430 } })}>Properties</ContextMenuItem>
          <ContextMenuSeparator className="bg-stone-400/50 my-1 h-px" />
          <ContextMenuItem className="p-1 select-none hover:bg-win-blue hover:text-white" onSelect={() => alert('Refreshed!')}>Refresh</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Index;
