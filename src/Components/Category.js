import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance'


const Category = (props) =>{
    
    return(
            <td>
                <h3>{props.category.title}</h3>
                {props.category.entries.map((e,i)=> {
                    return(
                    <Instance 
                        key={i}
                        instance={e}
                        editEntry = {props.editEntry}
                />)
                    })
                }
            </td>
    );
    
    
    
}

Category.propTypes = {
    debt: PropTypes.number.isRequired
}
export default Category;