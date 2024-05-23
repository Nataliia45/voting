import React, { Component } from 'react';
import SmileCard from '../SmileCard/SmileCard';
import './Voting.css';

export default class Voting extends Component {
  state = {
    candidates: [],
    winner: null,
  };

  componentDidMount() {
    fetch('http://localhost:3000/data.json')
      .then(result => result.json())
      .then(result => {
        const myCandidates = result.map(candidate => ({
          ...candidate,
          counter: 0,
        }));
        this.setState({ candidates: myCandidates });
      });
  }

  changeCounter = (id) => {
    this.setState(state => {
      const candidateIndex = state.candidates.findIndex(candidate => candidate.id === id);
      const myNewState = [...state.candidates];
      myNewState[candidateIndex].counter++;
      return {
        candidates: myNewState,
      };
    });
  };

  showResults = () => {
    const { candidates } = this.state;
    if (candidates.length === 0) {
      return;
    }
    const winner = candidates.reduce((prev, current) => (prev.counter > current.counter ? prev : current));
    this.setState({ winner });
  };

  render() {
    const { candidates, winner } = this.state;

    return (
      <div className="voting-container">
        <p>Hello</p>
        {!candidates.length && <div>No can available</div>}
        {!!candidates.length && (
          <div className='container'>
            {this.state.candidates.map(candidate => (
              <SmileCard
                id={candidate.id}
                name={candidate.name}
                key={candidate.id}
                counter={candidate.counter}
                votingAction={this.changeCounter}
              />
            ))}
          </div>
        )}

        <input type='button' value="ShowResults" onClick={this.showResults} />
        {winner && (
          <div>
            <h2>Winner</h2>
            <p>Name: {winner.name}</p>
            <p>Votes: {winner.counter}</p>
          </div>
        )}
      </div>
    );
  }
}
