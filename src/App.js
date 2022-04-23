import './App.css';
import { Component, Fragment } from 'react';
import { Card } from "./components/Card"
import { Modal } from './components/Modal';
import { Filter } from './components/Filter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rockets: [],
      selectedHeight:0
    }
  }
  componentDidMount() {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((response) => response.json())
      .then(rockets => this.setState({ rockets: rockets }))
  }

  handleChange=(e)=>{
    this.setState({selectedHeight: e.target.value});
  }

  render() {
    const {rockets,selectedHeight}=this.state;
    const filteredRockets=rockets.filter((rocket)=>
      rocket.height.feet>selectedHeight
    );
    return (
      <div className="container">
        <h1>SpaceX Rockets Encyclopedia</h1>
        <Filter onChange={this.handleChange}/>
        <div className="row">
          {filteredRockets.map((rocket) => (
            <Fragment>
              <Card rocket={rocket} />
              <Modal rocket={rocket} />

            </Fragment>

          ))}
        </div>
      </div>
    );
  }
}

export default App;
