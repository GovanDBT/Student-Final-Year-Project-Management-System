import NavBar from "../components/NavBar";
import ProposalTable from "./ProposalTable";

const ProposalList = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <div className="lg:max-w-3xl md:border-l-1 pl-3 text-center md:text-left">
          <h1>Students Proposals List</h1>
          <p>
            The table below show a list of all proposals made by students taking
            their final year project this semester. Ths list is meant show
            student if their proposals were approved or not and to prevent
            conflict of interest among students projects
          </p>
        </div>
        <div className="divider my-2"></div>
        <ProposalTable />
      </div>
    </>
  );
};

export default ProposalList;
