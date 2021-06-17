import React, { Component } from 'react'
// npm install react-router-dom
import {Route} from "react-router-dom"
export default class Routing extends Component {
    render() {
        return (
            <div>
              Routing Example 
               {/*path -> / -> home
               /profile -> profile
               /listing -> listing
                not a match -> error */}
                {/* /home -> home */}
                <Route path="/home" component={Home}></Route>
            </div>
        )
    }
}


 class Home extends Component {
    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}



class Profile extends Component {
    render() {
        return (
            <div>
              Profile  
            </div>
        )
    }
}


class Listing extends Component {
    render() {
        return (
            <div>
               Listing 
            </div>
        )
    }
}



class Error extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
