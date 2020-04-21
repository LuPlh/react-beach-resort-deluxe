import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context'; //on importe tout le context pour le consommer technique class compo
import StyledHero from '../components/StyledHero';

class SingleRoom extends Component {
    //première étape -> to fix the slug   
    constructor(props) {
        super(props);
        //console.log(this.props); va afficher les props fournies par react router -> match -> params -> slug
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }
    static contextType = RoomContext; //récupération du context de cette manière avec les class component

    render() {
        const { getRoom } = this.context;//deuxième étape récupération context class component
        const room = getRoom(this.state.slug);
        //console.log(room); affiche undefined
        //si le slug ne correspond pas, prévoir une page d'erreur
        if (!room) {
            return <div className="error">
                <h3>no such room could be found</h3>
                <Link to='/rooms' className="btn-primary">back to rooms</Link>
            </div>
        }
        //deuxième étape -> to fix the hero qui a une image par défaut dans CSS
        const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
        const [mainImg, ...otherImg] = images;//la premiere img correspond à mainImg (background), puis le reste des img qui sera à afficher en dessous 
        //du hero
        //console.log(otherImg);
        return (
            <>
                <StyledHero img={mainImg || this.state.defaultBcg}> {/*correspond à la props img définit dans le styled components  ou le defaultBcg présent dans le state*/}
                    <Banner title={`${name} room`}>
                        <Link to='/rooms' className="btn-primary">back to rooms</Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {[...otherImg].map((item, index) => {
                            return <img key={index} src={item} alt={name} />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price: ${price}</h6>
                            <h6>size: {size} SQFT</h6>
                            <h6>max capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                            <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
                            <h6>{breakfast ? 'breakfast included' : 'breakfast no included'}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {extras.map((item,index)=>{
                            return <li key={index}> - {item}</li>
                        })}
                    </ul>
                </section>
            </>
        );
    }
}

export default SingleRoom;