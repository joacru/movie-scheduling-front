import { API_BASE_URL, getUrl, postPutUrl, deleteUrl } from "./apiService";

import { Shot } from "../types/shot";

export const fetchShots = async () => {
  return getUrl(`${API_BASE_URL}/shots`, "Failed to fetch shots.");
};

export const createShot = async (
  shot: Shot
): Promise<Shot> => {
  const data = {
    name: shot.name,
    description: shot.description,
    action: shot.action,
    sceneId: shot.sceneId,
  };
  return postPutUrl<Shot>(
    `${API_BASE_URL}/shots`,
    "post",
    data,
    "Failed to create a shot."
  );
};

export const updateShot = async (
  shot: Shot
): Promise<Shot> => {
  const data = {
    name: shot.name,
    description: shot.description,
    action: shot.action,
    sceneId: shot.sceneId,
  };
  return postPutUrl<Shot>(
    `${API_BASE_URL}/shots/${shot.id}`,
    "put",
    data,
    "Failed to update a shot."
  );
};

export const deleteShot = async (id: number) => {
  return deleteUrl(
    `${API_BASE_URL}/shots/${id}`,
    "Failed to delete a shot."
  );
};
