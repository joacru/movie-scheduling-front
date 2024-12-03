import { API_BASE_URL, getUrl, postPutUrl, deleteUrl } from "./apiService";

import { Location } from "../types/location";

export const fetchLocations = async () => {
    return getUrl<Location[]>(`${API_BASE_URL}/locations`, "Failed to fetch locations.");
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
  