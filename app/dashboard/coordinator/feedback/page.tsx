import StudentsSubmissionsTableCor from "../components/StudentSubmissionTableCor";

const FeedbackPage = () => {
  return (
    <div className="container mx-auto">
      <h1>My Students Submissions</h1>
      <div className="divider mt-2 mb-6"></div>
      <StudentsSubmissionsTableCor />
    </div>
  );
};

export default FeedbackPage;
