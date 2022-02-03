import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  useAddSuperHeroData,
  useSuperHeroesData
} from '../../hooks/useSuperHeroesData'

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = data => {
    console.log({ data })
  }

  const onError = error => {
    console.log({ error })
  }

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  )

  const { mutate: addHero } = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo }
    addHero(hero)
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <label for="name">name :
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label for="name">alterEgo :
          <input
            type='text'
            value={alterEgo}
            onChange={e => setAlterEgo(e.target.value)}
          />
        </label>
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      <br /><br />

      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map(hero => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>
              {hero.id} {hero.name}
            </Link>
          </div>
        )
      })}
    </>
  )
}