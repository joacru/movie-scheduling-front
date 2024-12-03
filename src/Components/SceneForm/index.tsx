import { useContext, useState, useEffect } from "react";

import { ScenesContext } from "../../Context";

const SceneForm = () => {
  const context = useContext(ScenesContext);

  const [locationId, setLocationId] = useState<number>(0);
  useEffect(() => {
    if (context.scene?.location) {
      setLocationId(context.scene.location.id);
    } else {
      setLocationId(0);
    }
  }, [context.scene?.location]);

  return (
    <div className="flex items-center mb-2 w-full">
      <div className="p-2 w-20 text-center font-bold">
        <label>Scene</label>
        <input
          type="text"
          value={context.scene?.name || ''}
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
          value={context.scene?.intext || 'int'}
          className="select"
          onChange={(event) =>
            context.setScene((item) => {
              if (item) return { ...item, intext: event.target.value };
              return item;
            })
          }
        >
          <option value="int">INT</option>
          <option value="ext">NIGHT</option>
          <option value="intext">MORNING</option>
        </select>
        <select
          name="daynight"
          id="daynight"
          value={context.scene?.daynight || 'day'}
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
            value={locationId}
            className="select grow"
            onChange={(event) => {
              setLocationId(Number(event.target.value));
            }}
          >
            <option value="1">Finca Los Manzanos</option>
            <option value="2">Finca La Toma</option>
            <option value="3">Escuela de Minas</option>
            <option value="4">Colegio Nacional</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Scene description"
          value={context.scene?.description || ''}
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
        <button className="btn btn-blue w-12 h-12">Save</button>
      </div>
    </div>
  );
};

export default SceneForm;
