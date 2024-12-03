import React, { createContext, useState } from "react";

import { Scene } from "../types/scene";

export const ScenesContext = createContext<{
    scene: Scene | null;
    setScene: React.Dispatch<React.SetStateAction<Scene | null>>;
}>({
    scene: null,
    setScene: () => {},
});

export const ScenesProvider = ({ children }) => {
  const [scene, setScene] = useState<Scene | null>(null);
  // console.log(scene);

  return (
    <ScenesContext.Provider
      value={{
        scene,
        setScene,
      }}
    >
      {children}
    </ScenesContext.Provider>
  );
};
