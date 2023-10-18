import { NavBar } from "./components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:grid-cols-5 px-4 lg:px-12">
        {Array(5)
          .fill(0)
          .map((i, k) => {
            return <div></div>;
          })}
      </div>
    </div>
  );
}
