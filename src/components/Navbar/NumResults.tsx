import { type MovieArray } from "../../types/types"



function NumResults({movies}:MovieArray) {
  return (
    <p className="num-results">
    Found <strong>{movies.length}</strong> results
    </p>
  )
}

export default NumResults