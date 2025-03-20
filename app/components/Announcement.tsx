const Announcement = () => {
  return (
    <div className="bg-base-300 rounded-lg p-5 mb-8">
      <p className="btn mb-5">14 March, 2025</p>
      <h2>
        Presentation moved to March 20th{" "}
        <div className="badge badge-soft badge-primary">Presentation</div>{" "}
      </h2>
      <p className="font-bold text-primary mb-4">by Motlogelwa (Coordinator)</p>
      <p className="mb-3">
        Please be advised that the submission for your final year project
        submission which was originally set to March 14th has been moved to
        March 20th. Please consult with your lectures for additional information
        about your submission. Good Luck
      </p>
    </div>
  );
};

export default Announcement;
