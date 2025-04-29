import { ReactNode } from "react";
import Sidemenu from "./components/Sidemenu";
import Topmenu from "./components/Topmenu";

interface Props {
  children: ReactNode;
}

const coordinatorLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-[1.1fr_4fr]">
        <Sidemenu />
        <div>
          <Topmenu />
          <div className="pl-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default coordinatorLayout;
