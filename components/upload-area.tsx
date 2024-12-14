'use client';

import { useState } from 'react';
import Meteors from './ui/meteors';

const UPLOAD_AREA_STYLE = 'w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors';

interface UploadAreaProps {
  onFilesSelected: (files: FileList) => void;
}

export default function UploadArea({ onFilesSelected }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    onFilesSelected(files);
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      onFilesSelected(files);
    }
  };

  return (
    <label
      className={`${UPLOAD_AREA_STYLE} ${isDragging ? 'border-blue-500' : ''} relative overflow-hidden`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Meteors number={30} />
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />
      <div className="text-center">
        <p className="text-gray-600">
          拖拽图片到这里或点击上传
        </p>
        <p className="text-sm text-gray-400 mt-2">
          支持多张图片上传
        </p>
      </div>
    </label>
  );
}
