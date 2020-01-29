import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';


import Home from './home';
import List from './list';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'null'
        };
    }

    componentDidMount() {
        axios.get('/react/api/demo.json')
            .then(res => {
                const data = res.data.data;
                console.log(data)
                this.setState({ data: JSON.stringify(data) });
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.data
                    }
                </div>
                <BrowserRouter>
                    <Route path='/' exact component={Home} />
                    <Route path='/list' component={List} />
                </BrowserRouter>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'));
