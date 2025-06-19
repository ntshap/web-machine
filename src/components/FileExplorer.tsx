
import React from 'react';
import { Code } from 'lucide-react';
import { projects } from '@/pages/Index';

type Project = typeof projects[0];

const FileExplorer = ({ onOpenFile }: { onOpenFile: (file: Project) => void }) => (
  <div className="bg-win-gray w-full h-full p-1 flex flex-col text-black">
    <div className="flex gap-1 p-1 border-b-2 border-r-stone-900 border-b-stone-900 bg-win-gray">
       <button className="border-outset bg-win-gray px-2 active:border-inset hover:bg-gray-300"><u>F</u>ile</button>
       <button className="border-outset bg-win-gray px-2 active:border-inset hover:bg-gray-300"><u>E</u>dit</button>
       <button className="border-outset bg-win-gray px-2 active:border-inset hover:bg-gray-300"><u>V</u>iew</button>
    </div>
    <div className="flex-grow bg-white border-inset my-1 p-2 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-y-4 gap-x-2">
      {projects.map(proj => (
        <div key={proj.id} onDoubleClick={() => onOpenFile(proj)} className="flex flex-col items-center gap-1 cursor-pointer text-center">
          <Code size={40} className="text-sky-600"/>
          <span className="bg-win-blue text-white px-1 w-full truncate select-none">{proj.name}</span>
        </div>
      ))}
    </div>
    <div className="p-1 border-inset flex justify-between text-sm">
      <span>{projects.length} object(s)</span>
      <span>1.21 MB</span>
    </div>
  </div>
);

export default FileExplorer;
