import "./App.css"
import { CharacterModal } from "./features/characterDetails/CharacterDetailsModal"
import { DisneyCharacters } from "./features/disneyCharacters/Characters"

const App = () => {
  return (
    <div className="App">
      <CharacterModal />
      <DisneyCharacters />
    </div>
  )
}

export default App
