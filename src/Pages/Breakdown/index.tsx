import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ScenesContext } from "../../Context";

import {
  addCharacter,
  fetchSceneById,
  updateScene,
} from "../../services/apiService";
import { createShot } from "../../services/apiShotsService";

import SceneForm from "../../Components/SceneForm";
import ShotForm from "../../Components/ShotForm";
import CharacterSummary from "../../Components/CharacterSummary";
import { createCharacter } from "../../services/apiCharactersService";

function Breakdown() {
  const context = useContext(ScenesContext);

  const params = useParams();
  const sceneId: number = Number(params.sceneId);

  const [error, setError] = useState<string | null>(null);

  const characterRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetchSceneById(sceneId)
      .then((data) => context.setScene(data))
      .catch((error) => setError(error.message));
  }, [sceneId, context.reloadScene]);

  const addShot = () => {
    const name = prompt("Enter the name or the type of the new shot:");
    if (name == null || name == "") {
      alert("Canceled operation");
    } else {
      createShot({ name, sceneId: context.scene?.id })
        .then((data) => {
          context.setReloadShots((item) => !item);
          if (characterRef.current)
            characterRef.current.value = String(data.id);
          alert("Shot created successfully.");
        })
        .catch((error) => alert("Error:" + error));
    }
  };

  const changeCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    if (value == -1) {
      const name = prompt("Enter the name of the new character:");
      if (name != null && name != "") {
        createCharacter({ name })
          .then(() => {
            context.setReloadCharacters((item) => !item);
            alert(`Character ${name} created successfully.`);
          })
          .catch((error) => alert("Error: " + error));
      }
    }
  };

  const appendCharacter = () => {
    const characterId = Number(characterRef.current?.value);
    if (context.scene && characterId > 0) {
      addCharacter(context.scene?.id, characterId)
        .then(() => {
          context.setReloadScene((item) => !item);
          alert("Character added successfully.");
        })
        .catch((error) => alert("Error: " + error));
    }
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    updateScene(context.scene, context.locationId)
      .then(() => alert("Scene updated successfuly."))
      .catch((error) => alert("Error: " + error));
  };

  return (
    <>
      <form method="PUT" onSubmit={submitForm}>
        {error && <p>Error: {error}</p>}
        <SceneForm />
      </form>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>Characters</h2>
          <div className="flex gap-2">
            <select
              name="character"
              onChange={changeCharacter}
              id="character"
              className="select grow"
              ref={characterRef}
              defaultValue="0"
            >
              <option value="-1">Create new character</option>
              <option value="0">-</option>
              {context.characters?.map((character) => {
                return (
                  <option key={character.id} value={character.id}>
                    {character.name} ({character.age})
                  </option>
                );
              })}
            </select>
            <button
              type="button"
              onClick={appendCharacter}
              className="btn btn-green w-10 h-10"
            >
              +
            </button>
          </div>
          {context.scene?.characters?.map((character) => {
            return (
              <CharacterSummary key={character.id} character={character} />
            );
          })}
        </div>
        <div>
          <div className="flex justify-between">
            <h2>Shots</h2>
            <button
              type="button"
              onClick={addShot}
              className="btn btn-green w-10 h-10"
            >
              +
            </button>
          </div>
          {context.scene?.shots?.map((shot) => {
            return <ShotForm key={shot.id} shot={shot} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Breakdown;
