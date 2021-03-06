import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { docHt, get, getURL, callAPI } from "./services";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Styles from "./app-style";
import Iframe from "./sections/iframe";
import Transformations from "./sections/transformations";
import Publicreviews from "./sections/publicreviews";
import emailTemplates from "./emailTemplate.json";

class Secret extends Component {
  constructor() {
    super();
    this.state = {
      emailSent: false,
      emailSending: false,
    };
  }
  updatesendingEmail = (val) => {
    this.setState({
      emailSending: val,
    });
  };
  emailSent = () => {
    this.setState({
      emailSent: true,
      emailSending: false,
    });
  };
  hotLead = () => {
    this.updatesendingEmail(true);
    let { email, name, mobile } = JSON.parse(get("userDetails"));
    email = "varun@getsetgo.fitness";
    let { city } = JSON.parse(get("loc"));
    let emailBody = emailTemplates.hotLead
      .replace(/#fname/g, name.split(" ")[0])
      .replace(/#full_name/g, name)
      .replace(/#city/, city)
      .replace(/#email/g, email)
      .replace(/#mob/g, mobile);
    callAPI(getURL("sendEmail"), "post", this.emailSent, this.emailSent, {
      to: email,
      cc: "info@getsetgo.fitness",
      subject: "Hot lead from GetSetGo Fitness!",
      message: emailBody,
    });
  };
  render() {
    let { emailSending, emailSent } = this.state;
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
        style={{ minHeight: `${docHt() - 100}px`, paddingTop: "70px" }}
      >
        <Grid item style={{ ...Styles.centerTxt, ...Styles.marginBottom }}>
          <Typography
            variant="subtitle1"
            style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
          >
            Congratulations! You are about to join one of the most helpful, free
            fitness community on Facebook
          </Typography>
          <Typography
            variant="h1"
            style={{
              ...Styles.colorPrimary,
              ...Styles.centerTxt,
              ...Styles.marginBottom,
            }}
          >
            To join the community, click on the button below
          </Typography>
          <a
            href="https://www.facebook.com/groups/getsetgofitness"
            target="_blank"
          >
            <Button
              variant="contained"
              color="primary"
              style={{ width: "50%" }}
            >
              <Typography
                variant="h2"
                style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
              >
                Join the community
              </Typography>
            </Button>
          </a>
        </Grid>
        <Grid
          item
          container
          style={{ ...Styles.centerTxt, ...Styles.paddingLR }}
          direction="column"
        >
          <Grid item>
            <Typography
              variant="h2"
              style={{
                ...Styles.colorWhite,
                ...Styles.centerTxt,
                ...Styles.marginBottom,
              }}
            >
              As promised, here is your secret home workout
            </Typography>
            <Grid
              item
              style={{
                ...Styles.padding1,
                ...Styles.marginBottom,
                ...{ border: "1px solid #fff", display: "inline-block" },
              }}
            >
              <Iframe
                title="full body home workout"
                wd="560"
                ht="315"
                src="https://www.youtube.com/embed/u3RRJBrcr-w"
              />
            </Grid>
            <Typography
              variant="h1"
              style={{
                ...Styles.colorPrimary,
                ...Styles.centerTxt,
                ...Styles.marginBottom,
              }}
            >
              But wait, there's more ...
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
            >
              Check out our program: FitAtHome, a unique, community driven,
              personalized life-altering fitness program
            </Typography>
          </Grid>
          <Grid
            container
            style={{ ...Styles.padding5 }}
            justify="space-evenly"
            alignItems="center"
          >
            <Grid
              item
              style={{ ...Styles.padding1, ...{ border: "1px solid #fff" } }}
            >
              <Iframe
                title="FitAtHome - the complete indoor transformation system"
                wd="560"
                ht="315"
                src="https://www.youtube.com/embed/HD8dg_LSFc8"
              />
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="subtitle1"
                style={{ ...Styles.colorWhite, ...{ textAlign: "left" } }}
              >
                <ul>
                  <li>
                    A fun, live morning yoga class with world-renowned yoga
                    instructors
                  </li>
                  <li>
                    Scientifically designed no-equipment home workouts with
                    do-it-along videos
                  </li>
                  <li>
                    Live Zumba, HIIT to keep your heart health in top-notch
                    condition
                  </li>
                  <li>
                    One-to-one nutrition coaching with our in-house expert
                    coaches. It includes weekly progress monitoring and
                    unlimited chat with the coach
                  </li>
                  <li>
                    Curated video content for every day entertainment and much
                    more
                  </li>
                </ul>
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Typography
            variant="h2"
            style={{
              ...Styles.colorWhite,
              ...Styles.centerTxt,
              ...Styles.marginBottom,
            }}
          >
            Interested?
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{ ...Styles.centerTxt }}
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={3} style={{ ...Styles.centerTxt }}>
            {!(emailSending || emailSent) && (
              <Button
                variant="contained"
                color="primary"
                style={{ ...Styles.marginBottom, ...{ width: "90%" } }}
                onClick={this.hotLead}
              >
                <Typography
                  variant="h2"
                  style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
                >
                  Request a call from GetSetGo
                </Typography>
              </Button>
            )}
            {emailSending && !emailSent && (
              <Typography
                variant="subtitle1"
                style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
              >
                Hold on, we're taking a note ...
              </Typography>
            )}
            {!emailSending && emailSent && (
              <Typography
                variant="subtitle2"
                style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
              >
                ... and done! You will hear from us soon. Meanwhile, if you wish
                to check the packages, click on the button on the right
              </Typography>
            )}
          </Grid>
          <Grid item xs={3} style={{ ...Styles.centerTxt }}>
            <Link to="/packages">
              <Button
                variant="contained"
                color="primary"
                style={{ ...Styles.marginBottom, ...{ width: "90%" } }}
              >
                <Typography
                  variant="h2"
                  style={{ ...Styles.colorWhite, ...Styles.centerTxt }}
                >
                  Check out the packages
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Transformations />
        <Publicreviews />
      </Grid>
    );
  }
}
export default Secret;
