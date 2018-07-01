import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance'


const Category = (props) =>{

    const getTitle = (object)=>{
        for(let key in object){
            if(object.hasOwnProperty(key)) {
                return key;
            }
        }
        
    }

    const getValues= (object) =>{
        let key = getTitle(object);
        return object[key] 
    }
    
    return(
            <td>
                <h3>{getTitle(props.category)}</h3>
                {getValues(props.category).map((e,i)=> {
                    return(
                    <Instance 
                        key={i}
                        instance={e}
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