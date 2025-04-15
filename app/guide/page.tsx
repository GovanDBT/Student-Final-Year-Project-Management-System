import NavBar from "../components/NavBar";

const ProjectGuide = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto grid grid-cols-[1fr_3fr] gap-x-5">
        {/* Side Menu */}
        <ul className="menu bg-base-200 rounded-box w-full h-full">
          <li>
            <h2>Quick Links</h2>
          </li>
          <li>
            <a href="#introduction">1. Introduction</a>
          </li>
          <li>
            <a href="#aims">2. Aims</a>
          </li>
          <li>
            <a href="#supervision">3. Super Supervision</a>
          </li>
          <li>
            <a href="#documentation">4. Project Documentation</a>
            <ul>
              <li>
                <a href="#progress-report">4.1 Progress Reports</a>
              </li>
              <li>
                <a href="#final-report">4.2 Final Reports</a>
              </li>
              <li>
                <a href="#submission">
                  4.3 Submission of Reports and Project Demonstration{" "}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#management">5. Project Management</a>
          </li>
          <li>
            <a href="#grading">6. Grading/Assessment Framework</a>
            <ul>
              <li>
                <a href="#implementation">6.1 Project Implementation Details</a>
              </li>
              <li>
                <a href="#reporting">6.2 Project Reporting Details</a>
              </li>
              <li>
                <a href="#presentation">6.3 Presentation Details</a>
              </li>
            </ul>
          </li>
        </ul>
        {/* Content */}
        <div>
          {/* Header */}
          <div className="flex justify-between mb-2">
            <h1>Project Guide</h1>
            <a href="/public/project_guide.pdf" download>
              <button className="btn btn-primary">Download Guide</button>
            </a>
          </div>
          <p>
            This guide is meant to guide students during their final year
            project. Students are expected to read through the guide to get a
            clear view of their project progress or download the project
          </p>
          {/* 1. Introduction */}
          <div>
            <h2 className="divider divider-start" id="introduction">
              1. Introduction
            </h2>
            <p>
              This document is a brief guide to the ISS402 and CSI408 final year
              projects. It has been produced to answer some of the questions
              which students ask and to provide information about certain
              aspects of the project process such as project diaries, reports
              and assessment. It is not intended to be definitive. Projects by
              their very nature are individual and it is not possible to set
              down rules which will apply to and govern all aspects of them in
              all cases. What is presented here is a mixture of things which are
              common to all projects for example project diaries and guidelines
              which attempt to ensure that the difference between projects is
              kept to a minimum. The material covered includes the
              responsibilities of the student and of the supervisor, the various
              milestones along the way and the assessment process. If there are
              any points about which you are unsure, please discuss them with
              your project supervisor in the first case and with the Project
              Coordinator if that doesn't resolve your problems.
            </p>
          </div>
          {/* 2. Aims */}
          <div>
            <h2 className="divider divider-start" id="aims">
              2. Aims
            </h2>
            <p className="mb-0">
              Conducting Project work enables students to gain experience in a
              number of areas, which are relevant to a professional career. From
              an educational point of view, it enables you to:
            </p>
            <ul className="list-disc pl-5 my-2 space-y-2">
              <li>
                apply your technical knowledge and skills to solve a real world
                problem of reasonable size
              </li>
              <li>develop your project management skills</li>
              <li>
                develop your professional skills including, communication skills
                (report writing, oral presentations, interviewing),
                organisational skills, and time management
              </li>
              <li>conduct some research</li>
            </ul>
            <p>
              You will spend a lot of time on your project so it is important
              that you choose a subject area that interests you. You are
              expected to manage your time and plan your work to keep to the
              milestones (or Deadlines) specified in section 3. Your supervisor
              will assist and monitor your progress but it is your
              responsibility to carry out the work and meet the deadlines.
            </p>
          </div>
          {/* 3. Project supervision */}
          <div>
            <h2 className="divider divider-start" id="supervision">
              3. Project Supervision
            </h2>
            <ul className="list-disc pl-5 my-2 space-y-2">
              <li>
                Students should meet with their supervisors weekly to discuss
                progress and problems they are encountering.
              </li>
              <li>
                NOTE: it is the student's responsibility to seek supervision -
                it is not a supervisor's responsibility to seek out absent
                students.
              </li>
              <li>
                Students must submit a copy of their weekly diary sheet (see
                Appendix A) to their supervisor at each meeting, and both
                student and supervisor sign the diary sheet. The diary should
                indicate:
                <ul className="list-decimal pl-10 space-y-2">
                  <li>work done so far</li>
                  <li>matters to be discussed with the supervisor</li>
                  <li>next phase of the project as agreed with supervisor</li>
                </ul>
              </li>
              <li>
                It is envisaged that the project diary will serve as a basis for
                the weekly meeting of the student with the supervisor. In
                addition it will be a valuable aid when the time comes for
                writing the project reports. One important use for the diary
                will be in the storing of references.
              </li>
              <li className="font-black">
                The project diaries must be submitted with the project reports
                and will be used in assessment of the Project Management marks.
              </li>
            </ul>
          </div>
          {/* 4. Project documentation */}
          <div>
            <h2 className="divider divider-start" id="documentation">
              4. Project Documentation
            </h2>
            <p>
              All Reports should be professionally presented (word processed)
              and proofread. See Appendices B and C for guidelines on the
              content and presentation of these reports.
            </p>
          </div>
          {/* 4.1 Progress Report */}
          <div>
            <h3 className="divider divider-start" id="progress-report">
              4.1 Progress Report
            </h3>
            <p className="mb-0">
              As well as assessing your final product, your progress through the
              project lifecycle will be assessed. This assessment is done by
              your supervisor based on the weekly meetings you have had and
              various reports you are required to produce.
            </p>
            <ul className="list-disc pl-5 my-2 space-y-2">
              <li>
                Progress Reports should be submitted to the relevant Project
                Coordinator by the appropriate deadline (see section 3).
              </li>
              <li>A description of the Progress Report is given below:</li>
            </ul>
            <p className="mb-0">
              <span className="font-black">PROGRESS REPORT:</span> Introduction,
              Literature Survey/Review, Requirements Analysis & Specification,
              System Design Specification, References
            </p>
            <table className="table table-zebra mb-8">
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PR.1 Introduction</td>
                  <td>
                    See the introduction in the detailed project proposal. It is
                    required that there should be substantial improvement from
                    the detailed project proposal.
                  </td>
                </tr>
                <tr>
                  <td>PR.2 Literature Survey / Review</td>
                  <td>
                    There should be proper and enough evidence of the literature
                    survey or review having been done. It is required that there
                    should be substantial improvement from the detailed project
                    proposal.
                  </td>
                </tr>
                <tr>
                  <td>PR.3 Requirement analysis and specification</td>
                  <td>
                    It is essential that the requirements analysis and
                    specification should have progressed and hence there should
                    be substantial improvement from the detailed project
                    proposal.
                  </td>
                </tr>
                <tr>
                  <td>PR.4 System Design Specification</td>
                  <td>
                    It is essential that the design specification is traceable
                    from the requirements analysis and specification exercise.
                  </td>
                </tr>
                <tr>
                  <td>PR.5 References</td>
                  <td>
                    Appropriate references and proper citation of reference must
                    be present as evidence of literature survey or review. It is
                    required that there should be substantial improvement from
                    the detailed project proposal.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 4.2 Final Report */}
          <div>
            <h3 className="divider divider-start" id="final-report">
              4.2 Final Report
            </h3>
            <p className="mb-0">
              The project documentation which is professional shall comprise of
              the:
            </p>
            <ul className="list-disc pl-5 my-2 space-y-2">
              <li>introduction</li>
              <li>Literature review</li>
              <li>Requirement analysis and specification</li>
              <li>System design specification</li>
              <li>
                Implementation summary. Critical reflection on:- What was
                achieved, What was not achieved, For each of those not achieved,
                why? What did the student learn, Future work
              </li>
            </ul>
            <h4>Implementation:</h4>
            <ul className="list-disc pl-5 my-2 space-y-2">
              <li>
                Project implementation of a working version that meets:- − the
                objectives
              </li>
              <li>
                The actual implementation of the design attributes in PR.4.2
                whose total score shall not exceed fifteen (15).
              </li>
              <li>
                Unit implementation and integration to meet the requirements
              </li>
              <li>
                evaluation not necessarily limited towards fulfillment of
                requirements
              </li>
              <li>
                Testing - Not necessarily restricted to: Testing approach used,
                Test cases and results of each
              </li>
              <li>
                User manual - Addressing issues such as: Installation,
                Operational or usage, Maintenance
              </li>
              <li>
                Source code summary - Confirming to good attributes such as:
                Summary of modular structure, Formatting style, Programming
                style, Self documenting code
              </li>
              <li>
                References - There should be a substantial improvement from
                those in the progress report.
              </li>
              <li>
                Electronic copy to be submitted. The complete software system or
                product from the CSI405 project must be submitted. This would be
                in both the source code and the executable version.
              </li>
              <li>
                Final project report should detail all work carried out for the
                project and appropriate system documentation.
              </li>
              <li>
                Copies of all diary sheets should be included in the Final
                Report as an appendix.
              </li>
              <li>
                You are to submit three bound copies of your final report and a
                disk copy of the software implementation to the Project
                Coordinator, latest 1600hrs on the due date.
              </li>
            </ul>
          </div>
          {/* 4.3 Submission of Reports and Project Demonstration */}
          <div>
            <h3 className="divider divider-start" id="submission">
              4.3 Submission of Reports and Project Demonstration
            </h3>
            <ul className="list-disc pl-5 my-2 space-y-2">
              <li>
                You must adhere strictly to scheduled milestones. Due-dates are
                the latest dates for submission and not the days for printing.
                Penalties will be applied where there are no acceptable official
                reasons for noncompliance.n
              </li>
              <li>
                In particular Final Reports must be submitted to the Project
                Coordinator, latest by 1600hrs on the due date.
              </li>
              <li>
                Project Implementation forms part of the project assessment and
                must be demonstrated to the examiners at the time specified -
                see section 3.
              </li>
              <li>
                Failure to submit the final report and present your project
                implementation for evaluation will attract the following
                penalties: The project shall normally be treated as
                non-submission. With acceptable official reasons, such a project
                may be regarded as incomplete, provided the regulation for
                incomplete applies.
              </li>
            </ul>
          </div>
          {/* 5. Project Management */}
          <div>
            <h2 className="divider divider-start" id="management">
              5. Project Management
            </h2>
            <ul className="list-disc pl-5 my-2 space-y-2">
              <li>
                As well as implementing a product, the Project is concerned with
                the process of designing and implementing the product. A certain
                number of marks are therefore dedicated to assessing how well
                you develop and demonstrate your project management skills
                throughout the duration of the project.
              </li>
              <li>
                A project management mark is assessed at various points in the
                project - at each progress report assessment and at final report
                assessment -see section 9 for details-. This mark focuses on
                your performance to date in areas such as initiative,
                commitment, planning and scheduling. Your supervisor will assess
                you based on your weekly meetings and your diary sheets.
              </li>
              <li>
                The project management deliverables -which includes diary
                sheets- should be submitted to the project supervisor on or
                before the submission of the progress report or the final
                project report.
              </li>
              <li>
                The student must interact regularly with the supervisor. During
                these interactions, there must have been some significant pieces
                of work assigned to the student, which the student has to
                carry-out and submit to the supervisor. In a semester the
                supervisor must record the best five of such progress meetings.
                Supervisors are to make use of a form similar to the one in
                table 1.
              </li>
            </ul>
          </div>
          {/* 6. Grading/Assessment Framework */}
          <div>
            <h2 className="divider divider-start" id="grading">
              6. Grading/Assessment Framework
            </h2>
            <p className="mb-0">
              The following framework of marking will be applied when assessing
              your project work.
            </p>
            <table className="table table-zebra mb-8">
              <thead>
                <tr>
                  <td>Category</td>
                  <td>Evidence</td>
                  <td>Examiner</td>
                  <td>Marks</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alpha, Beta version</td>
                  <td>
                    Basic functionality of the prototype in line with design
                    guidelines especially PR.4.2 (though with different weight
                    scores).
                  </td>
                  <td>Supervisor & Co-examiner</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>Project Management</td>
                  <td>
                    Project Management based on diary sheets and weekly meetings
                    to date (up to Final Report submission)
                  </td>
                  <td>Supervisor</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>Project Implementation</td>
                  <td>
                    The product Implementation (code, testing, evaluation, etc)
                  </td>
                  <td>Supervisor & Co-examiner</td>
                  <td>30%</td>
                </tr>
                <tr>
                  <td>Project Reporting</td>
                  <td>
                    Final Report, full report and documentation (including
                    layout and presentation), evidence of project management.
                  </td>
                  <td>Supervisor & Co-examiner</td>
                  <td>30%</td>
                </tr>
                <tr>
                  <td>Project Presentation</td>
                  <td>
                    articulate professional & visual Presentation, Response to
                    Questions, understanding as demonstrated
                  </td>
                  <td>Supervisor & Co-examiner</td>
                  <td>20%</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 6.1 Project Implementation Details */}
          <div>
            <h3 className="divider divider-start" id="implementation">
              6.1 Project Implementation Details
            </h3>
            <p>See PR 4.2</p>
          </div>
          {/* 6.2 Project Reporting Details */}
          <div>
            <h3 className="divider divider-start" id="reporting">
              6.2 Project Reporting Details
            </h3>
            <table className="table table-zebra mb-8">
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Details</td>
                  <td>Score</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FR.1 Introduction (10)</td>
                  <td></td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>FR.2 Literature Survey / Review (10)</td>
                  <td></td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>FR.3 Requirement analysis and specification (3)</td>
                  <td>Already assessed in PR.3 </td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>FR.4 System Design Specification (3)</td>
                  <td>Already assessed in PR.4</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>FR.5 Implementation Summary (20) </td>
                  <td>
                    What was achieved? What was not achieved? For each of those
                    not achieved, why not achieved? What did the student learn?
                    Future work
                  </td>
                  <td>2</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    testing approach used test cases and results for each system
                    evaluation
                  </td>
                  <td>3</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    User manual - installation - operational - maintenance
                  </td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 6.3 Presentation Details */}
          <div>
            <h3 className="divider divider-start" id="presentation">
              6.3 Presentation Details
            </h3>
            <ul className="list-disc pl-5 my-2 space-y-2">
              <li>
                The presentation should be articulate, visual, professional and
                organized. Presentation is about the overall project, focusing
                on what problem is addressed, models of the problem & solution,
                implementation. Important issues include what has been done,
                what has not been achieved and what has been learned.
              </li>
              <li>
                Project presentation will only be permitted after submission of
                the final report. Project presentation will be fifteen minutes
                followed by five minutes demonstration of your project
                implementation. This will be followed by comments, queries,
                questions from the audience and the examining panel.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectGuide;
