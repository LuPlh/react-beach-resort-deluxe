import styled from "styled-components";


//on veut accéder à l'img background de manière dynamique afin qu'il corresponde à la chambre
//définition d'une props qui s'appelle img pour l'utiliser dans le hero singleRoom.js
const StyledHero= styled.header`
min-height:60vh;
background: url(${props=>props.img}) center/cover no-repeat; 
display: flex;
align-items: center;
justify-content: center;
`

export default StyledHero;