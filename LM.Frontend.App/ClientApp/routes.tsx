import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Authorize } from "./components/Authorize";
import { About } from "./components/About";
import { Profile } from "./components/Profile";
import { Exit } from "./components/Exit";
import { Users } from "./components/Users";

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/auth' component={ Authorize } />
    <Route path='/about' component={ About } />
    <Route path='/profile' component={ Profile } />
    <Route path='/users' component={ Users }/>
    <Route path='/exit' component={ Exit } />
</Layout>;
