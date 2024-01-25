import LiveFootage from "../../component/Dashboard/LiveFootage";
import Hero from "../../component/Hero";
import SelectedTent from "../../component/SelectedTent";

const Camera = () => {
  return (
    <div className="w-full px-5">
      <div className="mt-4">
        <SelectedTent />
      </div>
      <div className="my-5 grid lg:grid-cols-5 gap-5">
        <Hero />
      </div>
      <div className="w-full flex flex-row justify-center">
        <LiveFootage />
      </div>
    </div>
  );
};

export default Camera;
