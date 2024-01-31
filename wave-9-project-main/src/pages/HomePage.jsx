import Subscription from '../components/Home/Subscription';
import WeMakeItEasySection from '../components/WeMakeItEasySection/WeMakeItEasy';
import Hero from '../components/home/Hero';
import NewWaySection from '../components/home/NewWaySection/NewWaySection';
import Testimonials from '../components/Home/Testimonials';
import MostRecentForRentCards from '../components/MostRecentForRent/MostRecentForRentCards.jsx';
import Footer from '../components/Home/Footer';
import { AuthContextProvider, useAuthContext } from '../contexts/AuthContext';


let sectionExampleForRent = {
  title: "Most Recent Properties For Rent",
  description: "For Rent",
  buttonText: "Browse For Rent Properties"
}

let sectionExampleForBuy = {
  title: "Most Recent Properties For Sale",
  description: "For Sale",
  buttonText: "Browse For Sale Properties"
}

const HomePage = () => {

  return (
    <>
      <Hero />
      <WeMakeItEasySection />
      <NewWaySection />
      <MostRecentForRentCards section={sectionExampleForRent} endpoint={'for-rent'} />
      <MostRecentForRentCards section={sectionExampleForBuy} endpoint={'for-sale'} />
      <Testimonials />
      <Subscription />
    </>
  );
};

export default HomePage;
