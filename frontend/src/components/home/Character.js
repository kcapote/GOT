import React from 'react';

const Character = ({character, idx, page, viewProfile}) => {
    const pageCurrent = page ===1? 1: ((page -1) * 10)+1;

    const handlerClick = () => {
       viewProfile(character._id);
    }

;    return ( <tr>
                <th scope="row">{idx+pageCurrent}</th>
                <td>{character.name}</td>
                <td>{character.house} </td>
                <td>{character.father}</td>
                <td> 
                    <button className="btn btn-secondary" onClick={handlerClick}>View</button>
                </td>
            </tr> );
}
 
export default Character;