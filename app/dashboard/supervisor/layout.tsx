import { ReactNode } from "react";
import NavBar from "./NavBar";

interface Props {
  children: ReactNode;
}

const supervisorLayout = ({ children }: Props) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default supervisorLayout;
