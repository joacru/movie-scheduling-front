const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const fetchUrl = async (url: string, errorMessage = "") => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(errorMessage);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching: ", error);
    throw error;
  }
};

export const fetchScenes = async () => {
  return fetchUrl(`${API_BASE_URL}/scenes`, 'Failed to fetch scenes.');
};

export const fetchSceneById = async (id: number) => {
  return fetchUrl(`${API_BASE_URL}/scenes/${id}`, `Failed to fetch scene with id ${id}.`);
};
