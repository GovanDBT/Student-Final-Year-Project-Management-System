import NavBar from "../components/NavBar";

const ProjectMilestonePage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <div className="flex justify-between">
          <h1>Project Milestone</h1>
          <a href="/project_milestone.pdf" download>
            <button className="btn btn-primary">Download Milestone</button>
          </a>
        </div>
        <div className="divider"></div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-5">
          <table className="table table-zebra">
            <thead>
              <tr>
                <td>Ref</td>
                <td>Description</td>
                <td>Deliverables</td>
                <td>Submit and/or demo before</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>
                  Project Topic, Supervisor Selection and Initial Proposal
                </td>
                <td>Topic, 3 Supervisors, Brief Problem Statement</td>
                <td></td>
              </tr>
              <tr>
                <td>2.</td>
                <td>
                  Detailed project Proposal + Evidence of development
                  environment setup. This should cover Chapter 1: Introduction,
                  Chapter 2: Literature Review, Chapter 3: Requirements Analysis
                </td>
                <td>
                  Detailed Proposal, Demo: Evidence of the development
                  environment setup
                </td>
                <td>Mon 24 Feb 2025</td>
              </tr>
              <tr>
                <td>3.</td>
                <td>
                  Demonstration of Alpha Version + Improve detailed proposal to
                  include chapter on Design
                </td>
                <td>
                  Improved proposal with a Design chapter; Demo of Alpha version
                </td>
                <td>Wed, 12 March 2025</td>
              </tr>
              <tr>
                <td>4.</td>
                <td>
                  Demonstration of Beta Version + Testing and Quality Assurance.
                  The documentation should include Implementation, Testing and
                  QA
                </td>
                <td>
                  Demo Beta version; The documentation should include
                  Implementation, Testing and QA
                </td>
                <td>Tue, 15 April 2025</td>
              </tr>
              <tr>
                <td>5.</td>
                <td>Final Year Project Submission</td>
                <td>Source Code and Documentation submitted</td>
                <td>Mon, 28 April 2025</td>
              </tr>
              <tr>
                <td>6.</td>
                <td>Final Year Project Presentation</td>
                <td>Final Year Project has been presented</td>
                <td>Fri, 2 May 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectMilestonePage;
