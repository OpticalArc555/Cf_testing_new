import { AccordionCustom } from "../components/home/AccordionCustom";
import FooterF from "../components/Footer";
import BrandList from "../components/home/BrandList";
// eslint-disable-next-line no-unused-vars
import ContactUs from "../components/home/ContactUs";
import HeroSection from "../components/home/HeroSection";
import { StickyNavbar } from "../components/navbars/StickyNavbar";
import FeaturedCars from "./FeaturedCars";
import { useFilterCarQuery } from "../services/carAPI";

const Home = () => {
  const { data, error } = useFilterCarQuery();

  return (
    <div>
      <StickyNavbar />
      <HeroSection />
      <div className="mt-[4rem] md:mt-[1rem] flex justify-center">
        <BrandList />
      </div>
      <div className="mt-2 md:my-5">
        <FeaturedCars data={data} error={error} />
      </div>
      <AccordionCustom />
      {/* <ContactUs/> */}
      <FooterF />
    </div>
  );
};

export default Home;
