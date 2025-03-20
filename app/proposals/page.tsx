import NavBar from "../components/NavBar";
import ProposalTable from "./ProposalTable";

const ProposalList = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <div className="mb-5 max-w-3xl">
          <h1>Students Proposals List</h1>
          <p>
            The table below show a list of all proposals made by students taking
            their final year project this semester. Ths list is meant show
            student if their proposals were approved or not and to prevent
            conflict of interest among students projects
          </p>
        </div>
        <ProposalTable />
      </div>
    </>
  );
};

export default ProposalList;
