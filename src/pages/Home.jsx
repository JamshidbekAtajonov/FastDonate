import HomeFilter from "../components/HomeFilter";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer"
function Home() {
  return (
    <div className="main-container">
      <Carousel />
      <HomeFilter />
    </div>
  );
}

export default Home;
