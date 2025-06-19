
import React, { useState, useEffect } from 'react';

const BootScreen = ({ onBooted }: { onBooted: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootSequence = [
    '        .------------------------.',
    '        |  .------------------.  |',
    '        |  |  Starting up...  |  |',
    '        |  |                  |  |',
    '        |  |   NatashaOS      |  |',
    '        |  |      v1.0        |  |',
    "        |  '------------------'  |",
    "        '------------------------'",
    '            !________________!',
    '           /__________________\\\\',
    '',
    'Natasha BIOS v2.0.25',
    'Copyright (C) 2025, Natasha Inc.',
    '',
    'CPU: Natasha Atom @ 1.0 GHz',
    'Memory Test: 256MB OK',
    'Detecting Primary Master... Natasha_HDD_128GB',
    'Detecting Primary Slave... None',
    'Detecting Secondary Master... CD-ROM',
    'Detecting Secondary Slave... None',
    '',
    'Booting from Hard Disk...',
    'Loading NatashaOS kernel...',
    'Welcome!',
  ];

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(typing);
        setTimeout(onBooted, 1500);
      }
    }, 100);
    return () => clearInterval(typing);
  }, [onBooted]);

  return (
    <div className="bg-black text-white font-mono w-full h-screen p-4 text-2xl whitespace-pre-wrap overflow-hidden">
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default BootScreen;
