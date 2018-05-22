import React,{Component} from 'react'
import Slider from "react-slick";
import { Mutation,graphql,compose, Query} from 'react-apollo'
import { GET_PLEASURES,ALL_USERS,ADD_MATCH,FILTER_LIST,ACCEPTED_BY_USER,REJECTED_BY_USER} from  '../../queries.js'
import  {Grid,List,Loader,Card,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal,Table} from 'semantic-ui-react';




const updateCache = (cache, { data: { createMatch } }) => {
  const { allUsers } = cache.readQuery({ query: ALL_USERS})
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
  uniqueArray = function(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array
  }

  render(){
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }

    if (this.props.queryAllUsers.loading || this.props.queryAcceptedUsers.loading || this.props.queryRejectedUsers.loading) {
      return <div>Loading...</div>
    }

    const allUsers=this.props.queryAllUsers.allUsers
    const usersAccepted=this.props.queryAcceptedUsers.acceptedByUser
    const usersRejected=this.props.queryRejectedUsers.rejectedByUser


    let listUsers=[]
    let infoUsers={}


    allUsers.map(({ id,name,age, gender,picture }) => (
      listUsers.push(id),
      infoUsers[id]={'name':name,'age':age, 'gender':gender , 'picture':picture},
      listUsers=this.uniqueArray(listUsers,parseInt(sessionStorage.getItem('id')))
    ))

    console.log(listUsers)

    usersAccepted.map(({ id_user_accepted }) => (
      listUsers=this.uniqueArray(listUsers,id_user_accepted)
    ))

    console.log(listUsers)

    usersRejected.map(({ id_user_rejected }) => (
      listUsers=this.uniqueArray(listUsers,id_user_rejected)
    ))

    console.log(listUsers)

    return (
      <Slider {...settings}>
        {listUsers.map((key)=>(
              <div class="myCard">
                <Card centered>
                  <Card.Content>
                    <Image size='large' src={infoUsers[key].picture} />
                    <Card.Header>
                      {infoUsers[key].name}
                    </Card.Header>
                    <Card.Meta>
                      {infoUsers[key].gender}
                      {infoUsers[key].age}
                    </Card.Meta>
                    <Card.Description>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra style={styles.gmyButtons}>
                    <Mutation mutation={ADD_MATCH} variables={{key}} update={updateCache}>
                      {createMatch => (
                        <span
                          onClick={() => createMatch({ variables: { id_user_one : parseInt(sessionStorage.getItem('id')) , id_user_two:key, state_user_one:1 } })}
                          className="fr red pointer"
                        >
                          {this.loading ? "" : <Button circular style={styles.myButtons} color='blue' icon='user plus' />}
                        </span>
                      )}
                    </Mutation>

                    <Mutation mutation={ADD_MATCH} variables={{key}} update={updateCache}>
                      {createMatch => (
                        <span
                          onClick={() => createMatch({ variables: { id_user_one : parseInt(sessionStorage.getItem('id')) , id_user_two:key, state_user_one:2 } })}
                          className="fr red pointer"
                        >
                          {this.loading ? "" : <Button circular style={styles.myButtons} color='violet' icon='user times' />}
                        </span>
                      )}
                    </Mutation>


                  </Card.Content>
                </Card>
              </div>
          )
        )}
      </Slider>
    )

  }
}

export default compose(
  graphql(ALL_USERS, {name: 'queryAllUsers'}),
  graphql(ACCEPTED_BY_USER, {name: 'queryAcceptedUsers', options: props => ({ variables: { id: sessionStorage.getItem('id') }}) }),
  graphql(REJECTED_BY_USER, {name: 'queryRejectedUsers', options: props => ({ variables: { id: sessionStorage.getItem('id') }}) })
)(ListPosibles);
