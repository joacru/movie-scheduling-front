import { Character } from "./character";
import { Location } from "./location";
import { Shot } from "./shot";

export type Scene = {
  id: number;
  name: string;
  intext: string;
  daynight: string;
  description: string;
  location?: Location;
  characters?: Character[];
  shots?: Shot[];
};
