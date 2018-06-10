import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Authorize } from "./components/Authorize";
import { About } from "./components/About";
import { Profile } from "./components/Profile";
import { Exit } from "./components/Exit";
import { Users } from "./components/Users";
import { Statistic } from "./components/Statistic";
import { Page } from "./components/Page";
import { CreateNewPart } from "./components/CreateNewPart";
import {CreateNewTheme} from "./components/CreateNewTheme";

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/newpart' component={ CreateNewPart } />
    <Route path='/newtheme' component={ CreateNewTheme } />
    <Route path='/page' component={ Page } />
    <Route path='/auth' component={ Authorize } />
    <Route path='/about' component={ About } />
    <Route path='/profile' component={ Profile } />
    <Route path='/statistic' component={ Statistic } />
    <Route path='/users' component={ Users }/>
    <Route path='/exit' component={ Exit } />
</Layout>;
