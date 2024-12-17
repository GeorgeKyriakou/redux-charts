import "./App.css"
import { CharacterModal } from "./features/characterDetails/CharacterDetailsModal"
import { CharactersStatisticsModal } from "./features/chartStats/ChartStats"
import { DisneyCharacters } from "./features/disneyCharacters/Characters"

const App = () => {
  return (
    <div className="App">
      <CharacterModal />
      <DisneyCharacters />
      <CharactersStatisticsModal />
    </div>
  )
}

export default App
