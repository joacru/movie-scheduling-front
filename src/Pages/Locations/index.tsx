import { useContext } from "react";

import { ScenesContext } from "../../Context";

import LocationForm from "../../Components/LocationForm";

function Locations() {
  const context = useContext(ScenesContext);

  return (
    <div>
      <h1>Locations</h1>
      {context.locations?.map((location) => {
        return <LocationForm key={location.id} location={location} />;
      })}
    </div>
  );
}

export default Locations;
