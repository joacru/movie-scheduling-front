import { useContext, useRef } from "react";
import { Location } from "../../types/location";
import { deleteLocation, updateLocation } from "../../services/apiService";
import { ScenesContext } from "../../Context";

interface Props {
  location: Location;
}

const LocationForm = (props: Props) => {
  const context = useContext(ScenesContext);

  const { location } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    location.name = nameRef.current?.value;
    location.address = addressRef.current?.value;

    updateLocation(location)
      .then(() => {
        alert("Location updated successfully.");
      })
      .catch((error) => alert(error));
  };

  const deleteForm = () => {
    if (location.id) {
      if (confirm(`Delete the ${location.name} location?`)) {
        deleteLocation(location.id)
          .then(() => {
            context.setReloadLocations(item => !item);
            alert("Location deleted successfully.");
          })
          .catch((error) => alert(error));
      }
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div className="flex items-center mb-2 w-full border rounded px-2 mt-2 shadow-sm">
        <div className="grow flex flex-col p-2">
          <div className="flex items-center">
            <p className="grow-0 pr-2 w-20">Location:</p>
            <input
              type="text"
              name="name"
              ref={nameRef}
              defaultValue={location.name}
              className="input"
            />
          </div>
          <div className="flex items-center">
            <p className="grow-0 pr-2 w-20">Address:</p>
            <input
              type="text"
              name="address"
              ref={addressRef}
              defaultValue={location.address}
              className="input"
            />
          </div>
        </div>
        <div className="grow-0 flex items-center gap-2">
          <button type="submit" className="btn btn-blue w-14 h-14">
            Save
          </button>
          <button
            type="button"
            onClick={deleteForm}
            className="btn btn-red w-14 h-14"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};

export default LocationForm;
