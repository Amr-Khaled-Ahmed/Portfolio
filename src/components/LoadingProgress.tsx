import React, { useState, useEffect } from 'react';

interface LoadingProgressProps {
  onLoadingComplete: () => void;
}

const LoadingProgress: React.FC<LoadingProgressProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const loadingTexts = [
    "Initializing security protocols...",
    "Loading cyber defenses...",
    "Compiling digital assets...",
    "Establishing secure connection...",
    "Finalizing encryption...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Rotate through loading texts
    const textInterval = setInterval(() => {
      setLoadingTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <>
      <div className="loading-progress">
        <div
          className="loading-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loading-overlay" style={{ opacity: progress >= 100 ? 0 : 1 }}>
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            <div className="loading-spinner mx-auto"></div>
          </div>

          <h2 className="text-3xl font-bold text-text-primary mb-2">
            <span className="text-gradient">Amr Khaled Ahmed</span>
          </h2>

          <p className="text-text-secondary mb-6 min-h-6">
            {loadingTexts[loadingTextIndex]}
          </p>

          <div className="w-full bg-accent/20 rounded-full h-2.5 mb-4">
            <div
              className="bg-gradient-to-r from-primary to-primary/70 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm text-text-secondary">
            <span>System Initializing</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="mt-8 grid grid-cols-5 gap-2 max-w-xs mx-auto">
            {Array(5).fill(0).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${progress > i * 20 ? 'bg-primary' : 'bg-accent/20'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingProgress;
