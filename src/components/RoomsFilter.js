import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from "./Title";

// get all unique values -> Set() permet de stocker des valeurs uniques

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
}

const RoomsFilter = ({ rooms }) => {
    const context = useContext(RoomContext);
    //console.log(context); affiche le state du context.js

    //avoir accès aux variables du state
    const {
        handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets
    } = context;

    //Exemple pour le TYPE -> obtenir des valeurs uniques
    //get unique types
    let types = getUnique(rooms, "type");

    //add the type "all"
    types = ['all', ...types];
    //map to JSX
    types = types.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

    //GUEST

    let people=getUnique(rooms,"capacity"); //on réutilise la fonction getUnique
    people = people.map((item,index)=>{
    return <option key={index} value={item}>{item}</option>
    })

    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/*select type*/}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    {/* control input avec la value qui prend en compte le type du state */}
                    <select
                        name="type"
                        id="type"
                        value={type} 
                        className="form-control"
                        onChange={handleChange}>
                        {/*veut checker les datas de data.js pour avoir tous les types de chambres diff */}
                        {types}
                    </select>
                </div>
                {/* Guest */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={capacity} 
                        className="form-control"
                        onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/*room prices */}
                <div className="form-group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange}
                    className="form-control"></input>
                </div>
                {/*size */}
                <div className="form-group">
                    <label htmlFor="size">
                        room size
                    </label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input"></input>
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input"></input>
                    </div>
                </div>
                {/* extras checkbox */}
                <div className="form-group">
                    <div className="single-extra">
                    <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}></input>
                    <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                    <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}></input>
                    <label htmlFor="pets">pets</label>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default RoomsFilter;