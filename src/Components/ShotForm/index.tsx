import { useContext, useRef } from "react";
import { Shot } from "../../types/shot";
import { deleteShot, updateShot } from "../../services/apiShotsService";
import { ScenesContext } from "../../Context";

interface Props {
  shot: Shot;
}

const ShotForm = (props: Props) => {
  const context = useContext(ScenesContext);

  const { shot } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const actionRef = useRef<HTMLInputElement>(null);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    shot.name = nameRef.current?.value;
    shot.description = descriptionRef.current?.value;
    shot.action = actionRef.current?.value;

    updateShot(shot)
      .then(() => {
        alert("Shot updated successfully.");
      })
      .catch((error) => alert(error));
  };

  const deleteForm = () => {
    if (shot.id) {
      if (confirm(`Delete this shot?`)) {
        deleteShot(shot.id)
          .then(() => {
            context.setReloadShots((item) => !item);
            alert("Shot deleted successfully.");
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
            <p className="grow-0 pr-2 w-20">Shot:</p>
            <input
              type="text"
              name="name"
              ref={nameRef}
              defaultValue={shot.name}
              className="input"
            />
          </div>
          <div className="flex items-center">
            <p className="grow-0 pr-2 w-20">Desc.:</p>
            <input
              type="text"
              name="description"
              ref={descriptionRef}
              defaultValue={shot.description}
              className="input"
            />
          </div>
          <div className="flex items-center">
            <p className="grow-0 pr-2 w-20">Action:</p>
            <input
              type="text"
              name="action"
              ref={actionRef}
              defaultValue={shot.action}
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

export default ShotForm;
