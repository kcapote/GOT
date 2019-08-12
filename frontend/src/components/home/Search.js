import React, {Component, useState, useEffect} from 'react'; 


const Search = ({loadData, term}) => {
    const [text, setText] = useState(term);  

    const handlerChange= (e) => {
      setText(e.target.value);  
      loadData(e.target.value);
        
    }

    useEffect(()=>{
      loadData(text);
    },[text])
  
    return(
  
    <div className="jumbotron jumbotron-fluid mb-5 rounded p-5">
      <div className="container">
        <h1 className="display-4">Search</h1>
        <p className="lead">Game of Thrones</p>
        <hr className="my-4"/>  
        <input type="text" value={text} onChange={handlerChange} className="form-control" placeholder="Name or House" aria-label="Recipient's username" aria-describedby="button-addon2"/>
      </div>
    </div>

  )
}

export default Search;