import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { withRoomConsumer } from '../context'; //import du Higher Order Component
import Loading from './Loading';


//Première technique avec Higher Order Component définie dans context.js
const RoomsContainer = ({ context }) => {
    const { loading, sortedRooms, rooms } = context;
    if (loading) {
        return <Loading></Loading>;
    }
    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    );
}
export default withRoomConsumer(RoomsContainer);



/*Deuxième technique plus traditionnelle
import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { RoomConsumer } from '../context'; //import du consumer
import Loading from './Loading';

const RoomsContainer = () => {
    return (
        <RoomConsumer>
            {
                (value) => { //value correspond à ce qu'on a dans le context
                  const {loading, sortedRooms,rooms}=value;
                  if (loading){
                      return <Loading></Loading>;
                  }
                    return (
                        <div>
                            Hello from RoomsContainer
                            <RoomsFilter rooms={rooms}/>
                            <RoomsList rooms={sortedRooms} />
                        </div>
                    );
                }
            }

        </RoomConsumer>


    );
}

export default RoomsContainer;*/