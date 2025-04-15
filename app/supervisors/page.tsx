import NavBar from "../components/NavBar";
import SupervisorTable from "./SupervisorTable";

const SupervisorsPage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <div className="lg:max-w-3xl md:border-l-1 pl-3 text-center md:text-left">
          <h1>Supervisors List</h1>
          <p>
            The table below show a list of all supervisor for this current final
            year project. This list is meant to be used by student to help them
            get in contact with their supervisors
          </p>
        </div>
        <div className="divider my-2"></div>
        <SupervisorTable />
      </div>
    </>
  );
};

export default SupervisorsPage;
