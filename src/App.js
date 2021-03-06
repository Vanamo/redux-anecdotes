import React from 'react'
import reducer from './reducer'
import { createStore } from 'redux'

class App extends React.Component {

  create = (event) => {
    event.preventDefault()
    const getId = () => (100000*Math.random()).toFixed(0)
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: event.target.anecdote.value,
        id: getId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }

  render() {
    const store = this.props.store


    const vote = (id) => () => {
      store.dispatch({
        type: 'VOTE',
        data: { id }
      })
    }

    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.create}>
          <div><input name="anecdote" /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App