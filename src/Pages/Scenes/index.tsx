import { useState, useEffect } from "react";

import { fetchScenes } from "../../services/apiService";

import SceneSummary from "../../Components/SceneSummary";
import { Scene } from "../../types/scene";

function Scenes() {
  const [error, setError] = useState<string | null>(null);
  const [scenes, setScenes] = useState<Scene[] | null>(null);

  useEffect(() => {
    fetchScenes()
      .then((data) => setScenes(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <>
      <h1>Scenes</h1>
      {error && <p>Error: {error}</p>}
      {scenes?.map((scene) => {
        return (
          <SceneSummary
            key={scene.id}
            name={scene.name}
            intext={scene.intext}
            daynight={scene.daynight}
            description={scene.description}
            location={scene.location?.name}
          />
        );
      })}
    </>
  );
}

export default Scenes;
