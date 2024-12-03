import React, { createContext, useEffect, useState } from "react";

import { Scene } from "../types/scene";
import { Location } from "../types/location";

import { fetchLocations } from "../services/apiLocationsService";
import { fetchShots } from "../services/apiService";
import { Character } from "../types/character";
import { fetchCharacters } from "../services/apiCharactersService";

export const ScenesContext = createContext<{
  scene: Scene | null;
  setScene: React.Dispatch<React.SetStateAction<Scene | null>>;
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  reloadLocations: boolean;
  setReloadLocations: React.Dispatch<React.SetStateAction<boolean>>;
  locationId: number;
  setLocationId: React.Dispatch<React.SetStateAction<number>>;
  reloadShots: boolean;
  setReloadShots: React.Dispatch<React.SetStateAction<boolean>>;
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  reloadCharacters: boolean;
  setReloadCharacters: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  scene: null,
  setScene: () => {},
  locations: [],
  setLocations: () => {},
  reloadLocations: true,
  setReloadLocations: () => {},
  locationId: 0,
  setLocationId: () => {},
  reloadShots: true,
  setReloadShots: () => {},
  characters: [],
  setCharacters: () => {},
  reloadCharacters: true,
  setReloadCharacters: () => {},
});

export const ScenesProvider = ({ children }) => {
  const [scene, setScene] = useState<Scene | null>(null);

  const [locations, setLocations] = useState<Location[]>([]);
  const [reloadLocations, setReloadLocations] = useState<boolean>(true);
  useEffect(() => {
    fetchLocations().then((data) => setLocations(data));
  }, [reloadLocations]);

  const [locationId, setLocationId] = useState<number>(0);
  useEffect(() => {
    if (scene?.location.id) {
      setLocationId(scene.location.id);
    } else {
      setLocationId(0);
    }
  }, [scene?.location]);

  const [reloadShots, setReloadShots] = useState<boolean>(true);
  useEffect(() => {
    if (scene) {
      fetchShots(scene.id).then((data) =>
        setScene((item) => {
          console.log(item, data);
          if (item) return { ...item, shots: data };
          return item;
        })
      );
    }
  }, [reloadShots]);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [reloadCharacters, setReloadCharacters] = useState<boolean>(true);
  useEffect(() => {
    fetchCharacters().then((data) => setCharacters(data));
  }, [reloadCharacters]);

  return (
    <ScenesContext.Provider
      value={{
        scene,
        setScene,
        locations,
        setLocations,
        reloadLocations,
        setReloadLocations,
        locationId,
        setLocationId,
        reloadShots,
        setReloadShots,
        characters,
        setCharacters,
        reloadCharacters,
        setReloadCharacters,
      }}
    >
      {children}
    </ScenesContext.Provider>
  );
};
