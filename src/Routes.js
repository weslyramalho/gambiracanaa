import React from 'react';
import { Switch } from 'react-router-dom'; 
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import RouterHandler from './components/RouterHandler';


export default () => {
    return (
        
        <Switch>
            <RouterHandler exact path="/">
                <Home />
            </RouterHandler>
            <RouterHandler exact path="/about">
                <About />
            </RouterHandler>
            <RouterHandler exact path="/signin">
                <SignIn />
            </RouterHandler>
            <RouterHandler exact path="/signup">
                <SignUp />
            </RouterHandler>
            <RouterHandler exact path="/ad/:id">
                <AdPage />
            </RouterHandler>
            <RouterHandler private exact path="/post-an-ad">
                 <AddAd />
            </RouterHandler>
            <RouterHandler exact path="/ads">
                <Ads />
            </RouterHandler>
            <RouterHandler>
                <NotFound />
            </RouterHandler>
        </Switch>
    )
}