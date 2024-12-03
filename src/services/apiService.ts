import { Location } from "../types/location";
import { Scene } from "../types/scene";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function getUrl(url: string, err = "") {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(err);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get error:", error);
    throw error;
  }
}

export async function postPutUrl<T>(
  url: string,
  method: string,
  data: object,
  err = ""
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw Error(err);
    data = await response.json();
    return data as Promise<T>;
  } catch (error) {
    console.error("Put error:", error);
    throw error;
  }
}

export async function deleteUrl(url: string, err = "") {
  try {
    const response = await fetch(url, { method: "delete" });
    if (!response.ok) throw new Error(err);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
}

export const fetchScenes = async () => {
  return getUrl(`${API_BASE_URL}/scenes`, "Failed to fetch scenes.");
};

export const fetchSceneById = async (id: number) => {
  return getUrl(
    `${API_BASE_URL}/scenes/${id}`,
    `Failed to fetch scene with id ${id}.`
  );
};

export const updateScene = async (
  scene: Scene | null,
  locationId: number | null
) => {
  if (!scene) throw Error(`Failed to update scene.`);
  interface Data {
    name: string;
    intext: string;
    daynight: string;
    description: string;
    locationId?: number | null;
  }
  const data: Data = {
    name: scene.name,
    intext: scene.intext,
    daynight: scene.daynight,
    description: scene.description,
  };
  if (locationId === 0) data.locationId = null;
  else if (locationId && locationId > 0) data.locationId = locationId;
  return postPutUrl(
    `${API_BASE_URL}/scenes/${scene.id}`,
    "put",
    data,
    `Failed to update scene ${scene.id}.`
  );
};

export const fetchLocations = async () => {
  return getUrl(`${API_BASE_URL}/locations`, "Failed to fetch locations.");
};

export const createLocation = async (location: Location): Promise<Location> => {
  const data = {
    name: location.name,
    address: location.address,
  };
  return postPutUrl<Location>(
    `${API_BASE_URL}/locations`,
    "post",
    data,
    "Failed to create a location."
  );
};

export const updateLocation = async (location: Location): Promise<Location> => {
  const data = {
    name: location.name,
    address: location.address,
  };
  return postPutUrl<Location>(
    `${API_BASE_URL}/locations/${location.id}`,
    "put",
    data,
    "Failed to update a location."
  );
};

export const deleteLocation = async (id: number) => {
  return deleteUrl(
    `${API_BASE_URL}/locations/${id}`,
    "Failed to delete a location."
  );
};
