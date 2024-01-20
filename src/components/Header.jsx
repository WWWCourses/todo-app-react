import React, {useState} from 'react';

const Header = ({appTitle}) => {
    return (
        <React.Fragment>
            <h1>{appTitle}</h1>
        </React.Fragment>
    );
};

export default Header;