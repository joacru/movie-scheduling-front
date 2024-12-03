import { NavLink } from "react-router-dom";
import { deleteScene } from "../../services/apiService";

interface Props {
  id: number;
  name: string;
  intext: string;
  daynight: string;
  location: string;
  description: string;
}

const SceneSummary = (props: Props) => {
  const {
    id,
    name,
    intext,
    daynight,
    location = "<Location>",
    description,
  } = props;

  const remove = () => {
    if (confirm(`Delete scene ${name}?`)) {
      deleteScene(id)
        .then(() => {
          alert("Scene remove successfully.");
        })
        .catch((error) => alert("Error: " + error));
    }
  };

  return (
    <div className="flex items-center my-2 w-full border rounded px-2 shadow-sm">
      <div className="p-2 w-20 text-center font-bold">
        <p>
          Scene
          <br />
          {name}
        </p>
      </div>
      <div className="grow-0 flex flex-col p-2 w-32 text-center">
        <p>{intext.toUpperCase()}</p>
        <p>{daynight.toUpperCase()}</p>
      </div>
      <div className="grow flex flex-col p-2">
        <div>
          <p>{location}</p>
        </div>
        <div>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <div className="grow-0 flex items-center gap-2">
        <NavLink to={`/breakdown/${id}`}>
          <button className="btn btn-blue w-14 h-14">Edit</button>
        </NavLink>
        <button onClick={remove} className="btn btn-red w-14 h-14">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SceneSummary;
