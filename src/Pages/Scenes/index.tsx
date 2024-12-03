import { useState, useEffect } from "react";

import { createScene, fetchScenes } from "../../services/apiService";

import SceneSummary from "../../Components/SceneSummary";
import { Scene } from "../../types/scene";
import { useNavigate } from "react-router-dom";

function Scenes() {
  const [error, setError] = useState<string | null>(null);
  const [scenes, setScenes] = useState<Scene[] | null>(null);
  const [newSceneId, setNewSceneId] = useState<number>(0);

  useEffect(() => {
    fetchScenes()
      .then((data) => setScenes(data))
      .catch((error) => setError(error.message));
  }, []);

  const newScene = () => {
    createScene()
      .then((data) => {
        setNewSceneId(data.id);
        alert(`Scene ${data.id} created successfully.`);
      })
      .catch((error) => alert("Error: " + error));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if(newSceneId > 0) navigate(`/breakdown/${newSceneId}`);
  }, [newSceneId])

  return (
    <>
      <div className="flex justify-between">
        <h1>Scenes</h1>
        <button
          onClick={newScene}
          type="button"
          className="btn btn-green w-24 h-10"
        >
          New scene
        </button>
      </div>
      {error && <p>Error: {error}</p>}
      {scenes?.map((scene) => {
        return (
          <SceneSummary
            key={scene.id}
            id={scene.id}
            name={scene.name}
            intext={scene.intext}
            daynight={scene.daynight}
            description={scene.description}
            location={scene.location?.name || "<Location>"}
          />
        );
      })}
    </>
  );
}

export default Scenes;
