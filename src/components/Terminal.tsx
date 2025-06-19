
import React, { useState, useEffect, useRef } from 'react';
import { projects, contactInfo } from '@/pages/Index';

const Terminal = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to my Terminal! Type "help" for commands.']);
  const [input, setInput] = useState('');
  const endOfHistoryRef = useRef<null | HTMLDivElement>(null);

  const executeCommand = (cmd: string) => {
    let output = '';
    const [command, ...args] = cmd.toLowerCase().split(' ');
    switch (command) {
      case 'help':
        output = 'Available commands: help, ls projects, cat contact.txt, clear, echo [text]';
        break;
      case 'ls':
        if(args[0] === 'projects') {
          output = projects.map(p => p.name).join('\n');
        } else {
          output = `ls: cannot access '${args[0] || ''}': No such file or directory`;
        }
        break;
      case 'cat':
        if(args[0] === 'contact.txt') {
          output = contactInfo;
        } else {
          output = `cat: ${args[0]}: No such file or directory`;
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'echo':
        output = args.join(' ');
        break;
      default:
        output = `command not found: ${cmd}`;
    }
    setHistory(h => [...h, `$ ${cmd}`, output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView();
  }, [history]);

  return (
    <div className="bg-black text-green-400 w-full h-full p-2 font-mono text-lg overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
      {history.map((line, i) => <div key={i} className="whitespace-pre-wrap">{line}</div>)}
      <div className="flex">
        <span>$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none text-green-400 flex-grow focus:outline-none ml-2"
          autoFocus
        />
      </div>
       <div ref={endOfHistoryRef} />
    </div>
  );
};

export default Terminal;
