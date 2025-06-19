
import React from 'react';

const Notepad = ({ content }: { content: string }) => (
  <div className="bg-white w-full h-full p-2 whitespace-pre-wrap font-mono text-black text-lg overflow-y-auto">
    {content}
  </div>
);

export default Notepad;
