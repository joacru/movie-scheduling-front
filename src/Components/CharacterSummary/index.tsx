import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ScenesContext } from "../../Context";

import { Character } from "../../types/character";

import { delCharacter } from "../../services/apiService";

interface Props {
  character: Character;
}

const CharacterSummary = (props: Props) => {
  const context = useContext(ScenesContext);

  const { character } = props;

  const popCharacter = () => {
    if(context.scene){
        if(confirm(`Delete character ${character.name} from this scene?`)){
            delCharacter(context.scene.id, character.id || 0).then(() => {
                context.setReloadScene(item => !item);
            });
        }
    }
  };

  return (
    <div className="flex justify-between items-center w-full border rounded px-2 my-2 shadow-sm">
      <p><span className="text-bold">{character.name}</span> ({character.age})</p>
      <p>{character.actor}</p>
      <div className="flex justify-between gap-2">
        <NavLink to={`/characters/${ character.id }`}>
          <button type="button" className="btn btn-blue w-14 h-14">
            Edit
          </button>
        </NavLink>
        <button
          type="button"
          onClick={popCharacter}
          className="btn btn-red w-14 h-14"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CharacterSummary;
