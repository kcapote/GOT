import React, {Component} from 'react';
import Spinner from '../spinner/Spinner';
import axios from 'axios';
import Character from './Character';
import Pagination from './Pagination';
import Search from './Search';
const urlBackend = 'http://localhost:3001';

export default class Home extends Component {
    state = {
        characters: [],
        page: 1,
        size: 10,
        loading: false,
        totalPage: 0,
        term: ''
    }

    componentDidMount = () => {
        
        this.setState({...this.state, loading: true});
        this.loadData();
    }
    

    viewProfile = (id) =>{
        
        this.props.history.push(`/viewProfile/${id}`);
    }

    nextPage = () => {
        if(this.state.page === this.state.totalPage) return;
        this.movePage(+1);
    }

    prevPage = () =>{
        if(this.state.page === 1) return;
        this.movePage(-1);        
    }

    movePage = (val) =>{
        this.setState({
            ...this.state, 
            loading: true,
            page: this.state.page + val
        }, ()=>{
            this.loadData();

        });
    }
    
    load = async (url) =>{
        const characters = await axios.get(url);

        this.setState({
            ...this.state,
            characters: characters.data.objs,
            totalPage: Math.ceil(characters.data.total/this.state.size)
        },()=>{
            this.setState({...this.state, loading: false});
        });
    }

    loadData = (term?) => {

        if(term) {
            this.setState({...this.state, term});      
            const url = `${urlBackend}/characters/search/${term}?page=${this.state.page}&sizePage=${this.state.size}`;
            this.load(url); 
        }else{
            const url = `${urlBackend}/characters?page=${this.state.page}&sizePage=${this.state.size}`;
            this.load(url);
        }
    }




    render() {
        if(this.state.loading){
            return <Spinner/>
        }

        return (
            <div className="inicio">    
                <Search
                     loadData={this.loadData}
                     term={this.state.term }/>
                <h2>List of Characters</h2>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">House</th>
                        <th scope="col">Father</th>
                        <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.characters.map( (character, idx) => (
                                <Character character = {character} 
                                        idx = {idx} 
                                        key = {idx}
                                        page = {this.state.page}
                                        viewProfile={this.viewProfile} />
                            ))
                        }
                    </tbody>
                </table>
                <Pagination 
                        nextPage ={this.nextPage}
                        prevPage ={this.prevPage}
                    />
            </div>
        )


    }
}