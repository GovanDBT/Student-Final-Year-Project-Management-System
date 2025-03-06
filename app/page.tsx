import Image from "next/image";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import SubmissionCountdown from "./components/SubmissionCountdown";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="grid grid-rows-2 gap-5 grid-cols-1 lg:grid-cols-[1fr_2fr] lg:grid-rows-1 container mx-auto">
        <LoginForm />
        <div className="flex items-start gap-5">
          <SubmissionCountdown
            title="Days till next submission"
            days={11}
            desc="Project proposal - documentation of introduction, literature review, and system analysis"
          />
          <SubmissionCountdown
            title="Days final year presentation"
            days={45}
            desc="Presentation of project - including presentation slides, documentation, and implementation"
          />
        </div>
      </div>
    </div>
  );
}
