import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";

import Home from './home'
import Login from './login'
import Gustos from './gustos'
import Perfil from './perfil'
import Amigos from './amigos'
import Match from './match'
import Citas from './citas'

import Posibles from './posibles'
import GustoList from './GustoList'


import 'semantic-ui-css/semantic.min.css'
import '../css/main.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default ()=>(
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/citas" exact component={Citas} />
        <Route path="/perfil" exact component={Perfil} />
        <Route path="/gustos" exact component={Gustos} />
        <Route path="/match" exact component={Match} />
        <Route path="/amigos" exact component={Amigos} />

    </Switch>
  </Router>
)
