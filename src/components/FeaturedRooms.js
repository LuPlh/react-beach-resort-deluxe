import React, { Component } from 'react';
import { RoomContext } from '../context';
import Loading from './Loading';
import Room from './Room';
import Title from './Title';

class FeaturedRooms extends Component {
    static contextType = RoomContext;
    state = {}

    render() {

        //get this property from the context
        let { loading, featuredRooms: rooms } = this.context; //on ne récupère que les chambres qui ont la propriété featured = true; soit 3 chambres
        //utilisation de cette info pour les afficher dans cette partie
       rooms=rooms.map(room=>{
           return <Room key={room.id} room={room}/>;
       });

       //c'est ici que l'on affiche les 3 rooms featured..
        return (
            <>
                <section className="featured-rooms">
                <Title title="featured rooms" />
                <div className="featured-rooms-center">
                {loading? <Loading></Loading>:rooms}
                </div>
                </section>
               
            </> 
        );
    }
}

export default FeaturedRooms;