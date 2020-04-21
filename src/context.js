import React, { Component } from 'react';
//import items from './data'; //on importe les données de data.js qui correspondent aux caractéristiques des chambres
import Client from './Contentful';

const RoomContext = React.createContext(); //pour avoir accès à provider et Consumer
// <RoomContext.Provider value={'hello'}/>

class RoomProvider extends Component {
    state = {
        rooms: [], //stockent toutes les infos de rooms de data.js
        sortedRooms: [], //lors du tri des chambres appliqué avec le petit questionnaire
        featuredRooms: [], //chambres affichées dans le home page en bas
        loading: true, //charger ou non toutes les valeurs précédentes
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    //getData 
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResortDeluxe",
                //order:"sys.createdAt" //va mettre les données dans l'ordre sur affichage du site (par ordre de type de chambre)
                order:"fields.price" //pour ordonner par prix
            });
            let rooms = this.formatData(response.items); //on récupère les données de Contentful et on les formate pour notre site
            let featuredRooms = rooms.filter(room => room.featured === true);
            //Math.max va renvoyer le plus grand nombre d'une série
            let maxPrice = Math.max(...rooms.map(item =>
                item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));

            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice, //par défaut dans le formulaire la jauge est au max pour le prix
                maxPrice,
                maxSize
            })
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getData();
    }

    //Récupération des données dans data.js en les formattant comme on le souhaite -> sous la forme d'un simple objet
    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id; //on récupère les données dans data.js
            let images = item.fields.images.map(image =>
                image.fields.file.url
            );
            let room = { ...item.fields, images, id }; //copie de toutes les propriétés présentes dans data.js + images du dessus + id du dessus
            return room;
        })
        return tempItems;
    }

    //avoir accès au slug compris dans l'url pour afficher la room correspondante
    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]; //copie du state de rooms
        const room = tempRooms.find((room) => room.slug === slug);//trouver le slug qui match
        return room;
    }

    //gestion des controlled component du formulaire filter
    handleChange = (e) => {
        //e.preventDefault();
        const target = e.target;
        const name = e.target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        }, this.filterRooms) //on appel la fonction de filtre après avoir sélectionné dans le formulaire

    };

    //METHODE pour FILTRER les chambres à la suite de la modif du formulaire
    filterRooms = () => {
        //destructure les props
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state;

        //on filtre les chambres en fonction de leur type en modifiant le state du context
        //all the rooms
        let tempRooms = [...rooms];

        //transform value (string to number)
        capacity = parseInt(capacity);//sinon on obtient une string et non un nombre
        price = parseInt(price);

        //filter by type
        if (type !== "all") {
            tempRooms = tempRooms.filter(room => room.type == type);
        }

        //filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        //filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

        //filter by breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }

        //filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }


        //change state
        this.setState({
            sortedRooms: tempRooms
        })
    };


    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}
const RoomConsumer = RoomContext.Consumer;


//Deuxième technique pour utiliser le context: Higher Order Component -> peut nommer les 2 fonctions ci dessous comme on le souhaite -> va englober le component qui utilise le context
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomConsumer, RoomContext };