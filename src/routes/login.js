import React,{ Component } from 'react';
import  {Grid,Form,Button,Icon,Divider} from 'semantic-ui-react';
import Slider from "react-slick";


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
  render() {
    var settings = {
     dots: true,
     infinite: true,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 5000,
     pauseOnHover: true
   };


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
              <img src="images/dop-logo.png" />
            </div>
            <div style={styles.divLogin}>
              <Form>
                <Form.Field>
                  <input placeholder='Correo' />
                </Form.Field>
                <Form.Field>
                  <input type="password" placeholder='Contraseña' />
                </Form.Field>
                <Button primary fluid type='submit'>Ingresar</Button>

                <Divider horizontal>O</Divider>

                <Button color='facebook'>
                  <Icon name='facebook' /> Iniciar con facebook
                </Button>
                <Button color='twitter'>
                  <Icon name='twitter' /> Iniciar con Twitter
                </Button>
              </Form>

            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Login;
