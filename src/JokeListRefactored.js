import React, {Component} from "react";
import JokeRefactored from "./JokeRefactored";
import axios from "axios";

import "./JokeList.css";

class JokeListRefactored extends Component {
    static defaultProps = {
        numJokesToGet: 10
      };

    constructor(props) {
        super(props);
        this.state = {jokes: []};
        this.generateNewJokes = this.generateNewJokes.bind(this);
        this.vote = this.vote.bind(this);
    }

    componentDidMount() {
        if(this.state.jokes.length < this.props.numJokesToGet)  this.getJokes();   
    }

    componentDidUpdate() {
        if(this.state.jokes.length < this.props.numJokesToGet)  this.getJokes();   
    }

    async getJokes() {
        let j = [...this.state.jokes];
        let seenJokes = new Set();
        try {
          while (j.length < this.props.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com", {
              headers: { Accept: "application/json" }
            });
            let { status, ...jokeObj } = res.data;
    
            if (!seenJokes.has(jokeObj.id)) {
              seenJokes.add(jokeObj.id);
              j.push({ ...jokeObj, votes: 0 });
            } else {
              console.error("duplicate found!");
            }
          }
          this.setState({jokes: j});
        } catch (e) {
          console.log(e);
        }
    }
    
    generateNewJokes() {
        this.setState({jokes: []});
    }

    vote(id, delta) {
        this.setState(s => ({jokes: s.jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)}));
    }

    render() {
        console.log("Component rendered.");
        const {jokes} = this.state;

        if (jokes.length) {
            let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

            return (
                <div className="JokeList">
                    <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                    Get New Jokes
                    </button>
    
                    {sortedJokes.map(j => (
                        <JokeRefactored text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
                    ))}
                </div>
            );
        }
        return null;
    }
}

export default JokeListRefactored;