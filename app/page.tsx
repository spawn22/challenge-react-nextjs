import { Products } from "./components";
import {SideBar} from "./components";
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center  p-24">
      <title>react-challenge</title>
      <>
        <h3 className="text-4xl font-bold text-white flex justify-center items-center"></h3>
        <Products SideBar={SideBar}/>
      </>
    </main>
  );
}
