import React,{ Component } from 'react';
import  {Grid,Form,Button,Icon,Divider} from 'semantic-ui-react';
import Slider from "react-slick";
import axios from 'axios';
import  { Redirect } from 'react-router-dom'

const styles={
  grid:{
    height:'100%',
  },
  divLogin:{
    /*backgroundColor:'#fff',*/
    textAlign:'center',
    padding:'25px',
  }
}

class Login extends Component{
 
 constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
  }

 handleClick(event){
    //alert(this.state.username);

    //mutation { createToken(auth:{auth:{email:\"`+this.state.email+`\",password:\"`+this.state.password+`\"}}){jwt}}
      axios({
          url: 'http://35.227.46.47/graphql',
          method: 'post',
          data: {
            query: `
                           mutation {
                auth(auth:{
                  email: \"`+this.state.email+`\",
                  password: \"`+this.state.password+`\"
                }) {
                  token
                  auth{answer}
                  id
                }
              }          
            `
          }
        })
        .then(function (response) {
                   
            if(response.data.data.auth.auth.answer=="false"){
              alert("Datos inválidos");              
            }
            else{

             var token=response.data.data.auth.token;
             sessionStorage.setItem('token', token);
             var id=response.data.data.auth.id;
             sessionStorage.setItem('id', id);             
             //console.log(response.data.data.createToken.jwt);
             window.location.reload();
            }
      });
  }


  render() {
    var self=this;
    var settings = {
     dots: true,
     infinite: true,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 5000,
     pauseOnHover: true
   };

   const args={}
  const handleChange=(ev,input)=>{
    args[input.name]= input.value;
    console.log(input.name);
    console.log(args);
    this.setState(args);
    console.log(this.state)
    //console.log(this.state.input.name);
  }

  if(sessionStorage.getItem('token'))
  {
      return <Redirect to='/perfil'/>
  }

    return(

      <Grid columns={2} centered verticalAlign='middle' style={styles.grid}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Slider {...settings}>
                <div>
                  <img src="images/slide1.jpeg"/>
                </div>
                <div>
                  <img src="images/slide2.jpeg"/>
                </div>
              </Slider>
          </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>

          <Grid.Column width={4}>
            <div style={styles.divLogin}>
              <img src="images/dop-logo2.png" />
            </div>
            <div style={styles.divLogin}>
             <Form >
          <Form.Field>
             <Form.Input name="email" onChange={handleChange} placeholder='email o nombre de usuario' icon={<Icon name="check circle outline" size="large" />} />
           </Form.Field>
           <Form.Field>
             <Form.Input name="password" onChange={handleChange} type="password" placeholder='Password' icon={<Icon name="remove circle outline" color="red" size="large" />} />
           </Form.Field>
           <Button type='submit' primary fluid onClick={(event) => this.handleClick(event)}>Iniciar sesión</Button>
        </Form>

            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Login;