import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import SubmissionCountdown from "./components/SubmissionCountdown";
import Announcement from "./components/Announcement";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="grid grid-rows-auto gap-5 lg:grid-cols-3 content-stretch container mx-auto">
        <LoginForm />
        <div className="lg:col-span-2">
          <div className="flex items-start gap-2 lg:gap-5 mb-8">
            <SubmissionCountdown
              title="Days till next submission"
              days={11}
              desc="Project proposal - documentation of introduction, literature review, and system analysis"
            />
            <SubmissionCountdown
              title="Days till final year presentation"
              days={45}
              desc="Presentation of project - including presentation slides, documentation, and implementation"
            />
          </div>
          <h1 className="text-3xl mb-6">Announcement</h1>
          <div className="max-h-110 overflow-scroll p-3 border-1 border-secondary/10 rounded-lg">
            <Announcement />
            <Announcement />
            <Announcement />
          </div>
        </div>
      </div>
    </>
  );
}
