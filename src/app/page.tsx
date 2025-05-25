import MainComponet from "./MainComponet";
import NavBar from "./NavBar";
import OfferTime from "./OfferTime";

export default function Home() {
  return (
    <div className="bg-white">
      <NavBar/>
      <OfferTime/>
      <MainComponet/>
    </div>
  );
}
