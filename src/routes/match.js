import React,{ Component } from 'react';
import  {Grid,List,Segment,Card,Form,Image,Menu,Button,Icon,Divider,Header,Sidebar,Modal} from 'semantic-ui-react';
import Slider from "react-slick";



const styles={
  gridContent:{
    height:'100%',
    marginLeft:'0px',
    marginRight:'0px',
  },
  sidebar:{
    height:'100%',
  },
  divLogin:{
    /*backgroundColor:'#fff',*/
    textAlign:'center',
    padding:'25px',
  },
  columnPerfil:{
    /*backgroundColor:'#fff',*/
    textAlign:'center',
  },
  columnInformation:{
    /*backgroundColor:'#fff',*/
    color:'#fff',
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



class Match extends Component{

  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return(
      <div id="contenido-principal">
        <div class="ui vertical inverted left visible sidebar menu">
        <div class="div-image-profile-menu">
          <Image src='images/perfil.jpg' size='small' verticalAlign='middle' circular  centered/>
        </div>
          <a class="item" href="/inicio">
            <i class="home icon"></i>
                Inicio
          </a>
          <a class="item" href="/perfil">
          <i class="settings icon"></i>
          Perfil
          </a>
          <a class="item" href="/amigos">
            <i class="users icon"></i>
            Amigos
          </a>
          <a class="item" href="/citas">
            <i class="hand victory icon"></i>
            Citas
          </a>

          <a class="item" href="/gustos">
            <i class="smile icon"></i>
            Gustos
          </a>
          <a class="item">
          <i class="chat icon"></i>
          Mensajes (Proximamente)
          </a>
          <a class="item" href="/match">
          <i class="like icon"></i>
          Encuentra personas!
          </a>
      </div>
      <div class="pusher">
        <Grid columns={2} centered verticalAlign='middle' style={styles.gridContent}>
            <Grid.Column width={12} style={styles.columnInformation}>
              <div>
                  <Header as='h1' icon textAlign='center'>
                       <Icon name='smile' />
                       Encuentra Amigos!
                       <Header.Subheader>
                        Dale like a la persona que te guste!
                       </Header.Subheader>
                    </Header>

                <Slider {...settings}>
                  <div>
                    <Card centered>
                      <Card.Content>
                        <Image size='large' src='images/elliot.jpg' />
                        <Card.Header>
                          Elliot Baker
                        </Card.Header>
                        <Card.Meta>
                          Friends
                        </Card.Meta>
                        <Card.Description>
                          Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className='ui two buttons'>
                          <Button basic color='green'>Approve</Button>
                          <Button basic color='red'>Decline</Button>
                        </div>
                      </Card.Content>
                    </Card>
                  </div>

                  <div>
                    <Card centered>
                      <Card.Content>
                        <Image size='large' src='images/elliot.jpg' />
                        <Card.Header>
                          Elliot Baker
                        </Card.Header>
                        <Card.Meta>
                          Friends
                        </Card.Meta>
                        <Card.Description>
                          Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className='ui two buttons'>
                          <Button basic color='green'>Approve</Button>
                          <Button basic color='red'>Decline</Button>
                        </div>
                      </Card.Content>
                    </Card>
                  </div>

                  <div>
                    <Card centered>
                      <Card.Content>
                        <Image size='large' src='images/elliot.jpg' />
                        <Card.Header>
                          Elliot Baker
                        </Card.Header>
                        <Card.Meta>
                          Friends
                        </Card.Meta>
                        <Card.Description>
                          Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className='ui two buttons'>
                          <Button basic color='green'>Approve</Button>
                          <Button basic color='red'>Decline</Button>
                        </div>
                      </Card.Content>
                    </Card>
                  </div>
                  <div>
                    <Card centered>
                      <Card.Content>
                        <Image size='large' src='images/elliot.jpg' />
                        <Card.Header>
                          Elliot Baker
                        </Card.Header>
                        <Card.Meta>
                          Friends
                        </Card.Meta>
                        <Card.Description>
                          Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className='ui two buttons'>
                          <Button basic color='green'>Approve</Button>
                          <Button basic color='red'>Decline</Button>
                        </div>
                      </Card.Content>
                    </Card>
                  </div>



                </Slider>



              </div>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}


export default Match;
