import { API_BASE_URL, getUrl, postPutUrl, deleteUrl } from "./apiService";

import { Character } from "../types/character";

export const fetchCharacters = async () => {
  return getUrl<Character[]>(
    `${API_BASE_URL}/characters`,
    "Failed to fetch characters."
  );
};

export const fetchCharacterById = async (id: number) => {
  return getUrl<Character>(
    `${API_BASE_URL}/characters/${id}`,
    `Failed to fetch character with id ${id}.`
  );
};

export const createCharacter = async (
  character: Character
): Promise<Character> => {
  const data = {
    name: character.name,
    age: character.age,
    actor: character.actor,
  };
  return postPutUrl<Character>(
    `${API_BASE_URL}/characters`,
    "post",
    data,
    "Failed to create a character."
  );
};

export const updateCharacter = async (
  character: Character
): Promise<Character> => {
  const data = {
    name: character.name,
    age: character.age,
    actor: character.actor,
  };
  return postPutUrl<Character>(
    `${API_BASE_URL}/characters/${character.id}`,
    "put",
    data,
    "Failed to update a character."
  );
};

export const deleteCharacter = async (id: number) => {
  return deleteUrl(
    `${API_BASE_URL}/characters/${id}`,
    "Failed to delete a character."
  );
};
