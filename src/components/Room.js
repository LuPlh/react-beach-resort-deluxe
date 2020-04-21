import React from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../images/room-1.jpeg';
import PropTypes from 'prop-types';

const Room = ({room}) => {
    //console.log(room); regarder les différentes propriétés contenues dans une chambre
    const {name,slug,images,price}=room; // on choisit les props destructurées de room pour ensuite les display en dessous

    return ( 
        <article className="room">
            <div className="img-container">
                <img src={images[0] || defaultImg} alt="single room"></img> {/*pour chaque objet room, il y a une série de 4 photos, on veut pour chaque sélectionner la premiere */}
                <div className="price-top">
                   <h6>${price}</h6> 
                   <p>per night</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">features</Link>
            </div>
            <div className="room-info">
                {name}
            </div>
        </article>
     );
}
 
//un seule prop room qui est un objet dont on doit utiliser shape()
Room.propTypes={
    room: PropTypes.shape({
        name:PropTypes.string.isRequired,
        slug:PropTypes.string.isRequired,
        images:PropTypes.arrayOf(PropTypes.string).isRequired,
        price:PropTypes.number.isRequired

    })
}

export default Room;