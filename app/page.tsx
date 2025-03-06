import Image from "next/image";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="grid grid-rows-2 gap-5 grid-cols-1 lg:grid-cols-[1fr_2fr] lg:grid-rows-1 container mx-auto">
        <LoginForm />
        <h1>Main</h1>
      </div>
    </div>
  );
}
