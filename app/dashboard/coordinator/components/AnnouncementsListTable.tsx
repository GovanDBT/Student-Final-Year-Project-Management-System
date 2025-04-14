import React from "react";

const AnnouncementsListTable = () => {
  return (
    <div className="rounded-box border border-base-content/5 bg-base-200">
      <table className="table table-zebra">
        {/* Head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th className="hidden md:table-cell">Author</th>
            <th className="hidden md:table-cell">Date Created</th>
            <th className="hidden md:table-cell">Date Updated</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          <tr>
            <td>Announcement title</td>
            <td>Announcement description</td>
            <td>Name</td>
            <td>Date create</td>
            <td>Date update</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementsListTable;
