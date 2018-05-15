import React,{Component} from 'react'
import Slider from "react-slick";
import { Mutation,graphql,compose, Query} from 'react-apollo'
import { GET_PLEASURES,ALL_USERS,ADD_MATCH} from  '../../queries.js'
import  {Grid,List,Loader,Card,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';




const updateCache = (cache, { data: { createMatch } }) => {
  const { allUsers } = cache.readQuery({ query: ALL_USERS})

  console.log({allUsers});
  cache.writeQuery({
    query: ALL_USERS,
    data: {
      allUsers: allUsers.filter(user => user.id !== createMatch.id_user_two)
    }
  })
}



const styles={
  gmyButtons:{
    textAlign:'center',
  },
  myButtons:{
    fontSize:'30px',
  }
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}


class ListPosibles extends Component{
  render(){

    const settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "60px",
      slidesToShow: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return(
        <Query query={ALL_USERS}>
          {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              return(
                console.log(data.allUsers),

                data.allUsers.map(({ id,name,age, gender,picture }) => (
                  <div class="myCard">
                    <Card centered>
                      <Card.Content>
                        <Image size='large' src={picture} />
                        <Card.Header>
                          {name}
                        </Card.Header>
                        <Card.Meta>
                          {gender}
                          {age}
                        </Card.Meta>
                        <Card.Description>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra style={styles.gmyButtons}>

                        <Mutation mutation={ADD_MATCH} variables={{id}} update={updateCache}>
                          {createMatch => (
                            <span
                              onClick={() => createMatch({ variables: { id_user_one : 1 , id_user_two:id, state_user_one:1 } })}
                              className="fr red pointer"
                            >
                              {loading ? "" : <Button circular style={styles.myButtons} color='blue' icon='user plus' />}
                            </span>
                          )}
                        </Mutation>

                        <Button circular style={styles.myButtons} color='violet' icon='user times' />
                      </Card.Content>
                    </Card>
                  </div>
                ))

              )
          }}
        </Query>

    )

  }
}

export default ListPosibles;
