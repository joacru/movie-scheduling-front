import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-4 mx-auto w-3/4">
      <nav className="flex gap-2 mb-4">
        <NavLink to="/">
          <button type="button" className="btn btn-blue w-24 h-10">
            Scenes
          </button>
        </NavLink>
        <NavLink to="/locations">
          <button type="button" className="btn btn-blue w-24 h-10">
            Locations
          </button>
        </NavLink>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
