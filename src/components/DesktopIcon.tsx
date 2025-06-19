
import React from 'react';

const DesktopIcon = ({ icon, label, onDoubleClick, isSelected, onClick }: { 
    icon: React.ReactNode; 
    label: string; 
    onDoubleClick: () => void; 
    isSelected: boolean; 
    onClick: (event: React.MouseEvent) => void; 
}) => (
  <div className="flex flex-col items-center gap-1 text-white w-24 text-center cursor-pointer" onDoubleClick={onDoubleClick} onClick={onClick}>
    {icon}
    <span className={`p-0.5 select-none ${isSelected ? 'bg-win-blue text-white' : ''}`}>{label}</span>
  </div>
);

export default DesktopIcon;
