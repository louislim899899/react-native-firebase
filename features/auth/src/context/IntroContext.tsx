import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { hasSeenIntroSlider, markIntroSliderSeen } from '../utils';

interface IntroContextType {
  hasSeenIntro: boolean | null;
  completeIntro: () => Promise<void>;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);

  // Load intro flag from storage on mount
  useEffect(() => {
    const loadIntroState = async () => {
      try {
        const seen = await hasSeenIntroSlider();
        setHasSeenIntro(seen);
      } catch (error) {
        console.error('Failed to load intro state:', error);
        setHasSeenIntro(false); // Default to false if load fails
      }
    };
    loadIntroState();
  }, []);

  const completeIntro = useCallback(async () => {
    try {
      await markIntroSliderSeen();
      setHasSeenIntro(true);
    } catch (error) {
      console.error('Failed to mark intro as seen:', error);
    }
  }, []);

  return (
    <IntroContext.Provider value={{ hasSeenIntro, completeIntro }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error('useIntro must be used within IntroProvider');
  }
  return context;
}
