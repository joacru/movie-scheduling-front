import { useContext } from "react";

import { ScenesContext } from "../../Context";
import { createLocation } from "../../services/apiService";

const SceneForm = () => {
  const context = useContext(ScenesContext);

  const changeLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    if (value != -1) context.setLocationId(value);
    else {
      const name = prompt("Enter the name of the new location:");
      if (name == null || name == "") {
        alert("Canceled operation.");
      } else {
        createLocation({ name })
          .then((data) => {
            context.setLocations(items => [...items, data]);
            context.setLocationId(data.id || 0);
            alert(`Location ${name} created successfully.`);
          })
          .catch((error) => alert("Error: " + error));
      }
    }
  };

  return (
    <div className="flex items-center mb-2 w-full">
      <div className="p-2 w-20 text-center font-bold">
        <label>Scene</label>
        <input
          type="text"
          value={context.scene?.name || ""}
          className="input text-center"
          onChange={(event) =>
            context.setScene((item) => {
              if (item) return { ...item, name: event.target.value };
              return item;
            })
          }
        />
      </div>
      <div className="grow-0 flex flex-col p-2 w-26 text-center">
        <select
          name="intext"
          id="intext"
          value={context.scene?.intext || "int"}
          className="select"
          onChange={(event) =>
            context.setScene((item) => {
              if (item) return { ...item, intext: event.target.value };
              return item;
            })
          }
        >
          <option value="int">INT</option>
          <option value="ext">EXT</option>
          <option value="intext">INT/EXT</option>
        </select>
        <select
          name="daynight"
          id="daynight"
          value={context.scene?.daynight || "day"}
          className="select"
          onChange={(event) =>
            context.setScene((item) => {
              if (item) return { ...item, daynight: event.target.value };
              return item;
            })
          }
        >
          <option value="day">DAY</option>
          <option value="night">NIGHT</option>
          <option value="morning">MORNING</option>
          <option value="evening">EVENING</option>
        </select>
      </div>
      <div className="grow flex flex-col p-2">
        <div className="flex items-center">
          <p className="grow-0 pr-2">Location:</p>
          <select
            name="location"
            id="location"
            value={context.locationId}
            className="select grow"
            onChange={changeLocation}
          >
            <option value="0">-</option>
            <option value="-1">Create new location</option>
            {context.locations?.map((location) => {
              return (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              );
            })}
          </select>
        </div>
        <input
          type="text"
          placeholder="Scene description"
          value={context.scene?.description || ""}
          className="input"
          onChange={(event) =>
            context.setScene((item) => {
              if (item) return { ...item, description: event.target.value };
              return item;
            })
          }
        />
      </div>
      <div className="grow-0 flex items-center">
        <button type="submit" className="btn btn-blue w-14 h-14">
          Save
        </button>
      </div>
    </div>
  );
};

export default SceneForm;
