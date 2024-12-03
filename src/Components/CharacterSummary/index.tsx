import { Character } from "../../types/character";

interface Props{
    character: Character;
}

const CharacterSummary = (props: Props) => {
    const { character } = props;

    return (
        <div className="flex justify-between items-center w-full border rounded px-2 my-2 shadow-sm">
           <p>{character.name}</p>
           <p>({character.age})</p> 
        </div>
    );
}

export default CharacterSummary;