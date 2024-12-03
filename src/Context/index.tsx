import React, { createContext, useEffect, useState } from "react";

import { Scene } from "../types/scene";
import { Location } from "../types/location";

import { fetchLocations } from "../services/apiService";

export const ScenesContext = createContext<{
  scene: Scene | null;
  setScene: React.Dispatch<React.SetStateAction<Scene | null>>;
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  locationId: number;
  setLocationId: React.Dispatch<React.SetStateAction<number>>;
}>({
  scene: null,
  setScene: () => {},
  locations: [],
  setLocations: () => {},
  locationId: 0,
  setLocationId: () => {},
});

export const ScenesProvider = ({ children }) => {
  const [scene, setScene] = useState<Scene | null>(null);

  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
    fetchLocations().then((data) => setLocations(data));
  }, []);

  const [locationId, setLocationId] = useState<number>(0);
  useEffect(() => {
    if (scene?.location.id) {
      setLocationId(scene.location.id);
    } else {
      setLocationId(0);
    }
  }, [scene?.location]);

  return (
    <ScenesContext.Provider
      value={{
        scene,
        setScene,
        locations,
        setLocations,
        locationId,
        setLocationId,
      }}
    >
      {children}
    </ScenesContext.Provider>
  );
};
