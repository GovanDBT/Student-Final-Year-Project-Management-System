import React from "react";
import AnnouncementForm from "../components/AnnouncementForm";
import AnnouncementsListTable from "../components/AnnouncementsListTable";

const Announcements = () => {
  return (
    <div className="container mx-auto">
      <h1>Announcement Form</h1>
      <div className="divider mt-2 mb-6"></div>
      <AnnouncementForm />
      <h1 className="divider divider-start mt-10 mb-8">Announcements List</h1>
      <AnnouncementsListTable />
    </div>
  );
};

export default Announcements;
