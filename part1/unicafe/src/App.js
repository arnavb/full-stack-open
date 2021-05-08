import React, { useState } from "react"

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <Statistic text={"Good"} value={good} />
        <Statistic text={"Neutral"} value={neutral} />
        <Statistic text={"Bad"} value={bad} />
        <Statistic text={"All"} value={good + neutral + bad} />
        <Statistic
          text={"Average"}
          value={(good - bad) / (good + neutral + bad)}
        />
        <Statistic text={"Positive"} value={good / (good + neutral + bad)} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return (
    <div>
      <h1>Give Feedback</h1>
      
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      
      <h2>Statistics</h2>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
