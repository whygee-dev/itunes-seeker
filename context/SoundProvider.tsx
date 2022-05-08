import { Sound } from "expo-av/build/Audio";
import React, { useState } from "react";

/**
 * Using a context instead of a redux slice because "Sound" is a heavy object that contains circular data and redux handles this very badly and is prone to bugs.
 */
export const SoundContext = React.createContext({ sound: undefined, setSound: (s: Sound | null) => {} } as {
  sound?: Sound | null;
  setSound: (s: Sound | null) => any;
});

const SoundContextProvider = ({ children }: { children: any }) => {
  const [sound, setSound] = useState<Sound | null>();
  const _setSound = (u: Sound | null) => {
    setSound(u);
  };

  return <SoundContext.Provider value={{ sound, setSound: _setSound }}>{children}</SoundContext.Provider>;
};

export default SoundContextProvider;
