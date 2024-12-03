import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ScenesContext } from "../../Context";

import { fetchSceneById } from "../../services/apiService";

import SceneForm from "../../Components/SceneForm";

function Breakdown() {
  const context = useContext(ScenesContext);

  const params = useParams();
  const sceneId: number = Number(params.sceneId);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSceneById(sceneId)
      .then((data) => context.setScene(data))
      .catch((error) => setError(error.message));
  }, [sceneId]);

  return (
    <form method="POST">
      <h1>Breakdown - Scene {context.scene?.name}</h1>
      {error && <p>Error: {error}</p>}
      <SceneForm />
    </form>
  );
}

export default Breakdown;
