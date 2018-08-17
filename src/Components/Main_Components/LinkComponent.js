import React from 'react';
import PropTypes from 'prop-types';


const LinkComponent = (props) =>{
    return(
     <span>Links: {props.connectedId}</span>
    );
}

LinkComponent.propTypes = {

}
export default LinkComponent;
