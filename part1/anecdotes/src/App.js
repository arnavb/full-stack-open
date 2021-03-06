import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({...anecdotes.map(val => 0)})
  
  const highestVotedAnecdote = () => {
    let votesArray = Object.values(votes)
    return votesArray.indexOf(Math.max(...votesArray))
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>This quote has {votes[selected]} votes</p>
      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      >
        Load next anecdote
      </button>
      <button onClick={() => setVotes({...votes, [selected]: votes[selected] + 1})}>Vote</button>
      
      <h1>Highest voted anecdote</h1>
      <p>{anecdotes[highestVotedAnecdote()]}</p>
      <p>has {votes[highestVotedAnecdote()]} votes</p>
    </div>
  );
};

export default App;
