import React, { Component } from "react";
import Header from "./sections/header";
import Footer from "./sections/footer";
import ScrollToTop from "./scrolltotop";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import theme from "./theme";
import { updateLoc } from "./services";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home";
import Package from "./package";
import Ordersummary from "./ordersummary";
import ReactPixel from "react-facebook-pixel";

//import Secret from './secretworkout';

ReactGA.initialize("UA-86957619-1");
ReactGA.pageview(window.location.pathname + window.location.search);
ReactGA.pageview("/");
ReactGA.pageview("/packages");
//ReactGA.pageview('/secret');
ReactGA.pageview("/summary");
const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      scrollStatus: false,
    };
  }
  componentDidMount() {
    updateLoc(this.cb);
  }
  cb(currency) {
    ReactPixel.init("727377464279666", options);
    ReactPixel.pageView(); // For tracking page view
    ReactPixel.track("Purchase", { currency: currency }); // For tracking default events, more info about events and data https://developers.facebook.com/docs/ads-for-websites/pixel-events/v2.9
  }
  freezeScroll(val) {
    this.setState({ scrollStatus: val });
  }
  //  component={props=> <Home freezeScroll={(val)=>{this.freezeScroll(val)}} {...props}/>}/>
  render() {
    let { scrollStatus } = this.state;
    return (
      <Router>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Grid
              container
              direction="column"
              className="app"
              style={
                scrollStatus ? { overflow: "hidden", height: "100vh" } : {}
              }
            >
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home
                    freezeScroll={(val) => {
                      this.freezeScroll(val);
                    }}
                  />
                </Route>
                <Route path="/packages">
                  <Package
                    freezeScroll={(val) => {
                      this.freezeScroll(val);
                    }}
                  />
                </Route>
                <Route
                  path="/thank_you/summary/:orderId"
                  component={Ordersummary}
                />
              </Switch>
              <Footer />
            </Grid>
          </CssBaseline>
        </ThemeProvider>
      </Router>
    );
  }
}
export default App;
