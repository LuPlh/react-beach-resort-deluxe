import React from 'react';
import Room from './Room';

//props destruturée rooms qui provient de RoomsContainer
const RoomsList = ({rooms}) => {
    //si aucune chambre ne match avec la recherche filtrée
    if (rooms.length === 0){
        return (
            <div className="empty-search">
                <h3>unfortunately no rooms matched</h3>
            </div>
        )
    }
    return ( 
        <>
        <section className="roomslist">
            <div className="roomslist-center">
                {rooms.map(item => {
                    return <Room key={item.id} room={item}/>
                })}
            </div>
        </section>
        </>
     );
}
 
export default RoomsList;