import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../../types/character";
import {
  deleteCharacter,
  fetchCharacterById,
  updateCharacter,
} from "../../services/apiCharactersService";

function Characters() {
  const params = useParams();
  const characterId: number = Number(params.characterId);

  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchCharacterById(characterId)
      .then((data) => setCharacter(data))
      .catch((error) => setError(error.message));
  }, [characterId]);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (character) {
      updateCharacter(character)
        .then(() => alert("Character updated successfuly."))
        .catch((error) => alert("Error: " + error));
    }
  };

  const remove = () => {
    if (character?.id) {
      if (confirm(`Delete character ${character.name}?`)) {
        deleteCharacter(character.id)
          .then(() => alert("Character deleted successfully."))
          .catch((error) => alert("Error: " + error));
      }
    }
  };

  return (
    <>
      <h1>Character</h1>
      {error && <p>Error: {error}</p>}
      <form
        method="PUT"
        onSubmit={submitForm}
        className="flex justify-between gap-4"
      >
        <div className="flex items-center">
          <p className="grow-0 pr-2">Name:</p>
          <input
            type="text"
            value={character?.name || ""}
            className="input"
            onChange={(event) =>
              setCharacter((item) => {
                if (item) return { ...item, name: event.target.value };
                return item;
              })
            }
          />
        </div>
        <div className="flex items-center">
          <p className="grow-0 pr-2">Age:</p>
          <input
            type="number"
            value={character?.age || ""}
            className="input"
            onChange={(event) =>
              setCharacter((item) => {
                if (item) return { ...item, age: Number(event.target.value) };
                return item;
              })
            }
          />
        </div>
        <div className="flex items-center">
          <p className="grow-0 pr-2">Actor:</p>
          <input
            type="text"
            value={character?.actor || ""}
            className="input"
            onChange={(event) =>
              setCharacter((item) => {
                if (item) return { ...item, actor: event.target.value };
                return item;
              })
            }
          />
        </div>
        <div className="flex justify-between gap-2">
          <button type="submit" className="btn btn-blue w-14 h-14">
            Save
          </button>
          <button onClick={remove} type="button" className="btn btn-red w-14 h-14">
            Delete
          </button>
        </div>
      </form>
    </>
  );
}

export default Characters;
