import React from 'react';
import PropTypes from 'prop-types';

const Interest = (props) =>{
    return (
        <div>
            <div>Interest: <input 
                    placeholder={props.interest}
                    onChange={props.onChange}
                />
            </div>
            <div>Applied length: <input
                // placeholder={props.length}
                // onChange={props.onChange}
            />
            </div>
        </div>
    )
}


Interest.propTypes = {
    Interest: PropTypes.node
}

export default Interest;
