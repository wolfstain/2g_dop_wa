import React from 'react'
import Query from './Query.js'
import { Mutation } from 'react-apollo'
import { GET_PLEASURES,DELETE_PLEASURE } from  '../../queries.js'

const updateCache = (cache, { data: { deletePleasure } }) => {
  const { pleasureByUser } = cache.readQuery({ query: GET_PLEASURES , variables: {user_id:1} })

  cache.writeQuery({
    query: GET_PLEASURES,
    variables:{user_id:1},
    data: {
      pleasureByUser: pleasureByUser.filter(pleasure => pleasure.id !== deletePleasure.id)
    }
  })

}

export default () => (
  <ul className="avenir list pl0 ml0 center mw5 ba b--light-silver br3">
    <Query query={GET_PLEASURES} variables={{user_id:1}}>
      {({ pleasureByUser }) => {
        return pleasureByUser.map(({ id,name }) => (
          <li className="avenir ph3 pv2 bb b--light-silver" key={id}>
            {name}
            <Mutation
              mutation={DELETE_PLEASURE}
              variables={{ id }}
              update={updateCache}
            >
              {(deletePleasure, { loading, error }) => (
                <span
                  onClick={() => deletePleasure({ variables: { id : parseInt(id) } })}
                  className="fr red pointer"
                >
                  {loading ? 'loading' : 'x'}
                </span>
              )}
            </Mutation>
          </li>
        ))
      }}
    </Query>
  </ul>
)
