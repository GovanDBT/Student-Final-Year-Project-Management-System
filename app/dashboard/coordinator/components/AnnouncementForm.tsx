import React from "react";

const AnnouncementForm = () => {
  return (
    <form action="" className="my-5 space-y-8">
      <input
        type="text"
        placeholder="Announcement Title"
        className="input input-lg w-full"
      />
      <textarea
        className="textarea textarea-lg h-50 w-full"
        placeholder="Announcement Description..."
      ></textarea>
      <button className="btn btn-primary">Submit Announcement</button>
    </form>
  );
};

export default AnnouncementForm;
