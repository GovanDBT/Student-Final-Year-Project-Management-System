import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 container mx-auto">
        <h1>Login</h1>
        <h1>Main</h1>
      </div>
    </div>
  );
}
