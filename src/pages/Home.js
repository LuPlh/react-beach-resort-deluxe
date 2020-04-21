import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';


const Home = () => {
    return ( 
        <>
        <Hero> {/*props hero définie par défaut dans Hero.js*/}
            <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
                {/* le bouton représente le children de Banner */}
                <Link to="/rooms" className="btn-primary">
                    our rooms
                </Link>
            </Banner>
        </Hero>
        <Services/>
        <FeaturedRooms/>
        </>
     );
}
 
export default Home;