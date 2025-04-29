import StudentsTable from "../components/StudentsTable";

const AdminStudentsPage = async () => {
  return (
    <div>
      <h1 className="text-2xl">My Students</h1>
      <div className="divider mt-2 mb-6"></div>
      <StudentsTable />
    </div>
  );
};

export default AdminStudentsPage;
