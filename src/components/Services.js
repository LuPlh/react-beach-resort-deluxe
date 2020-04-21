import React, { Component } from 'react';
import Title from './Title';
import {FaCocktail,FaHiking,FaShuttleVan,FaBeer} from 'react-icons/fa';

class Services extends Component {
    state = { 
        services:[
            {
                icon:<FaCocktail/>,
                title:"Free Cocktails",
                info:"Cognitis enim pilatorum caesorumque funeribus nemo deinde ad has stationes appulit navem, sed ut Scironis praerupta letalia declinantes litoribus Cypriis contigui navigabant."
            },
            {
                icon:<FaHiking/>,
                title:"Endless Hiking",
                info:"Cognitis enim pilatorum caesorumque funeribus nemo deinde ad has stationes appulit navem, sed ut Scironis praerupta letalia declinantes litoribus Cypriis contigui navigabant."
            },
            {
                icon:<FaShuttleVan/>,
                title:"Free Shuttle",
                info:"Cognitis enim pilatorum caesorumque funeribus nemo deinde ad has stationes appulit navem, sed ut Scironis praerupta letalia declinantes litoribus Cypriis contigui navigabant."
            },
            {
                icon:<FaBeer/>,
                title:"Strongest Beer",
                info:"Cognitis enim pilatorum caesorumque funeribus nemo deinde ad has stationes appulit navem, sed ut Scironis praerupta letalia declinantes litoribus Cypriis contigui navigabant."
            }
        ]
     }
    render() { 
        return ( 
            <>
                <section className="services">
                <Title title="services"/>
                <div className="services-center">
                    {this.state.services.map((item,index)=>{
                    return <article key={index} className="service">
                        <span>{item.icon}</span>
                        <h6>{item.title}</h6>
                        <p>{item.info}</p>
                    </article>
                    })}
                </div>
                </section>
            </>
         );
    }
}
 
export default Services;