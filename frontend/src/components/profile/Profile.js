import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from '../spinner/Spinner';

const Profile = (props) => {
    
    const urlBackend = 'http://localhost:3001';
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        const { id } = props.match.params;
        loadProfile(id);

    },[props.match.params])

    const loadProfile = async(id) =>{
        setLoading(true);
        const url = `${urlBackend}/characters/${id}`;
        const character = await axios.get(url);
        setProfile(character.data.character);
        setLoading(false);

    }
    if(loading){
        return <Spinner/>
    }
    return ( 
        
        <div className="row justify-content-center inicio"> 
            <div className="col-5">
                <img src={profile.image} width="300px" height="auto" />
            </div>
            <div className="col-4" >
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" value={profile.name} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">House</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" value={profile.house} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Father</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" value={profile.father} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Actor</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" value={profile.actor} readOnly />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={profile.alive}  readOnly/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Alive?</label>
                </div>
               
            </form>
            </div>

        </div>
     );
}
 
export default Profile;