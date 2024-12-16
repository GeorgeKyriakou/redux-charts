import "./App.css"
import { DisneyCharacters } from "./features/disneyCharacters/Characters"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Disney chars here</h1>
        <DisneyCharacters />
      </header>
    </div>
  )
}

export default App
