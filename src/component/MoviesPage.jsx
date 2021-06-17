import React, { Component } from "react";
import { getMovies } from "../temp/MovieService";
import Pagination from "./Pagination";
import List from "./List";
export default class MoviesPage extends Component {
  state = {
    movies: [],
    genres:[{id:1,name:"All Genres"}],
    currSearchText: "",
    limit: 4,
    currentPage: 1,
    cGenre:"All Genres"
  };

  deleteEntry = (id) => {
    let filteredArr = this.state.movies.filter((moviesObj) => {
      return moviesObj._id != id;
    });

    this.setState({
      movies: filteredArr,
    });
  };

  setCurrentText = (e) => {
    let task = e.target.value;

    this.setState({
      currSearchText: task,
    });
  };

  sortByRating = (e) => {
    let className = e.target.className;
    let sortedMovies;
    let { movies } = this.state;
    if (className == "fas fa-sort-up") {
      sortedMovies = movies.sort((a, b) => {
        return a.dailyRentalRate - b.dailyRentalRate;
      });
    } else {
      sortedMovies = movies.sort((a, b) => {
        return b.dailyRentalRate - a.dailyRentalRate;
      });
    }
    this.setState({
      movies: sortedMovies,
    });
  };

  sortByStock = (e) => {
    let className = e.target.className;
    let sortedMovies;
    let { movies } = this.state;
    if (className == "fas fa-sort-up") {
      sortedMovies = movies.sort((a, b) => {
        return a.numberInStock - b.numberInStock;
      });
    } else {
      sortedMovies = movies.sort((a, b) => {
        return b.numberInStock - a.numberInStock;
      });
    }
    this.setState({
      movies: sortedMovies,
    });
  };

  changelimit = (e) => {
    let currlimit = e.target.value;
    if(currlimit<1)return ;
    this.setState({
      limit: currlimit,
    });
  };

  changeCurrentPage=(pageNumber)=>{
this.setState({
  currentPage:pageNumber
})
  }

  async componentDidMount(){
    let resp=await fetch("https://react-backend101.herokuapp.com/movies");
    let jsonMovies=await resp.json();
  
    let resp2=await fetch("https://react-backend101.herokuapp.com/genres");
    let jsonGenres=await resp2.json();

    this.setState({
      movies:jsonMovies.movies,
      genres:[...this.state.genres,...jsonGenres.genres],
    })
  }
groupBygenre=(name)=>{
  this.setState({
    cGenre:name,
    currSearchText:""
  })
}

  render() {
    let { movies, currSearchText, limit, currentPage,genres,cGenre} = this.state;

    let filtereArr=[...this.state.movies];
    

    if(cGenre!="All Genres"){
     filtereArr= filtereArr.filter((movieObj)=>{
        return movieObj.genre.name==cGenre;
      })
    }


    
    if (currSearchText != "") {
      filtereArr = filtereArr.filter((movieObj) => {
        let title = movieObj.title.trim().toLowerCase();
        return title.startsWith(currSearchText.trim().toLowerCase());
      });
    }
    let numberofPage=Math.ceil( filtereArr.length / limit );
    let si = (currentPage - 1) * limit;
    let edx = (Number(si)) +(Number(limit));
   
    filtereArr = filtereArr.slice(si, edx);
    return (
      <div className="row">
        <div className="col-3">
          <List genres={genres} groupBygenre={this.groupBygenre}></List>
        </div>
        <div className="col-9">
          <input
            type="search"
            value={currSearchText}
            onChange={this.setCurrentText}
          />
          <input
            type="number"
            className="limit col-1"
            placeholder="no of elements/page"
            value={limit}
            onChange={this.changelimit}
          />
          {/* <input type="text" className="pageNumber" placeholder="Page Number"/> */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">
                  <i className="fas fa-sort-up" onClick={this.sortByStock}></i>
                  Stock
                  <i
                    className="fas fa-sort-down"
                    onClick={this.sortByStock}
                  ></i>
                </th>
                <th scope="col">
                  <i className="fas fa-sort-up" onClick={this.sortByRating}></i>
                  Rate
                  <i
                    className="fas fa-sort-down"
                    onClick={this.sortByRating}
                  ></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtereArr.map((movieObj) => {
                return (
                  <tr scope="row" key={movieObj._id}>
                    <td></td>
                    <td>{movieObj.title}</td>
                    <td>{movieObj.genre.name}</td>
                    <td>{movieObj.numberInStock}</td>
                    <td>{movieObj.dailyRentalRate}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          this.deleteEntry(movieObj._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination numberofPage={numberofPage} changeCurrentPage={this.changeCurrentPage}></Pagination>
        </div>
      </div>
    );
  }
}

// filtered array,limit,currentpage,
// this.changeCurrentPage(pageNumber)



