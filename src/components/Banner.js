import React from 'react';

const Banner = ({ children, title, subtitle }) => {
    return (
        <div className="banner">
            <h1>{title}</h1>
            <div></div>
            <p>{subtitle}</p>
            {children} {/*utilisé pour le bouton */}
        </div>
    );
}

export default Banner;