import { Scene } from "../types/scene";
import { Shot } from "../types/shot";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function getUrl<T>(url: string, err = ""): Promise<T> {
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
    let body: string | null | undefined = JSON.stringify(data);
    if (body == '{}') body = undefined;
    console.log(body);
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
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
  return getUrl<Scene>(
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

export const fetchShots = async (sceneId: number) => {
  return getUrl<Shot[]>(
    `${API_BASE_URL}/scenes/${sceneId}/shots`,
    "Failed to fetch shots."
  );
};

export const addCharacter = async (sceneId: number, characterId: number) => {
  return postPutUrl<Scene>(
    `${API_BASE_URL}/scenes/${sceneId}/characters/${characterId}`,
    "put",
    {},
    "Failed to adding character."
  );
};
