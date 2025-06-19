
import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { Minus, Square, X as XIcon } from 'lucide-react';
import { WindowState, Action } from '@/pages/Index';

const Window = ({ children, win, dispatch }: { children: React.ReactNode, win: WindowState, dispatch: React.Dispatch<Action> }) => {
  const nodeRef = React.useRef(null);

  const handleToggleMaximize = () => {
    const taskbarHeight = 40; // h-10 is 2.5rem, assuming 1rem = 16px, so 40px
    dispatch({
      type: 'TOGGLE_MAXIMIZE',
      payload: {
        id: win.id,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight - taskbarHeight,
        }
      }
    });
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".title-bar"
      position={win.position}
      onStop={(e, data) => dispatch({ type: 'UPDATE_POSITION', payload: { id: win.id, position: { x: data.x, y: data.y } } })}
      disabled={win.isMaximized}
    >
      <Resizable
        height={win.size.height}
        width={win.size.width}
        onResizeStop={(e, data) => dispatch({ type: 'UPDATE_SIZE', payload: { id: win.id, size: { width: data.size.width, height: data.size.height } } })}
        className="absolute"
        minConstraints={win.isMaximized ? [win.size.width, win.size.height] : [200, 150]}
        maxConstraints={win.isMaximized ? [win.size.width, win.size.height] : undefined}
      >
        <div
          ref={nodeRef}
          className="bg-win-gray p-1 border-outset flex flex-col"
          style={{ zIndex: win.zIndex, width: '100%', height: '100%' }}
          onMouseDown={() => dispatch({ type: 'FOCUS', payload: { id: win.id } })}
        >
          <div className="title-bar bg-gradient-to-r from-win-blue to-win-blue-light text-white flex justify-between items-center p-1 cursor-move" onDoubleClick={handleToggleMaximize}>
            <span>{win.title}</span>
            <div className="flex gap-1">
              <button onClick={() => dispatch({ type: 'MINIMIZE', payload: { id: win.id } })} className="bg-win-gray border-outset w-6 h-6 flex justify-center items-center active:border-inset"><Minus size={16} /></button>
              <button onClick={handleToggleMaximize} className="bg-win-gray border-outset w-6 h-6 flex justify-center items-center active:border-inset"><Square size={16} /></button>
              <button onClick={() => dispatch({ type: 'CLOSE', payload: { id: win.id } })} className="bg-win-gray border-outset w-6 h-6 flex justify-center items-center active:border-inset"><XIcon size={16} /></button>
            </div>
          </div>
          <div className="flex-grow mt-1 relative">
            {children}
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
};

export default Window;
