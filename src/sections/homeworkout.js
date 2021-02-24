import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Styles from "../app-style.js";
import { Typography } from "@material-ui/core";
import { retrievePath } from "../services";
import PreloadImage from "../helpers/preloadimg";
class Homeworkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPlaying: false,
    };
  }
  render() {
    let { videoPlaying } = this.state;
    return (
      <Grid
        container
        item
        style={{ ...Styles.highZ, ...Styles.fullHt }}
        direction="row"
        alignItems="center"
        justify="space-evenly"
        className="top"
      >
        <Grid
          container
          item
          xs={5}
          style={{
            background: "#000",
            padding: "40px",
            position: "relative",
            ...Styles.cardRadius,
          }}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item xs={10} style={{ position: "relative" }}>
            <video width="300" controls={videoPlaying} ref="vidRef">
              <source src={`${retrievePath()}homewo.mp4`} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            {!videoPlaying && (
              <div
                onClick={() => {
                  this.refs.vidRef.play();
                  this.setState({ videoPlaying: true });
                }}
                style={{
                  ...Styles.highZ,
                  ...{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <PreloadImage
                  src={`${retrievePath()}videoframe.jpg`}
                  alt="Start your day with meditation or yoga"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                  }}
                />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={5}
          style={{
            ...Styles.blackBG,
            ...Styles.padding5,
            ...Styles.cardRadius,
          }}
          alignItems="flex-start"
          justify="center"
          direction="column"
        >
          <Typography variant="h2" style={Styles.colorWhite}>
            There’s a<span style={Styles.colorPrimary}> reason doctors </span>
            recommend us
          </Typography>
          <Typography
            variant="h6"
            style={{ ...Styles.colorGrey, ...Styles.italicTxt }}
          >
            "18 years of my life went by taking insulin shots. Enrolling in the
            GetSetGo Fitness Diabetes Care package was by far the best
            investment I made for my health. With the help of the diet and
            exercise plan given by the GetSetGo team, I managed to normalize my
            condition. Today I am fit in my late 40s feeling like I'm in my late
            20s." <br></br>
            <br></br>
            <span style={Styles.boldTxt}>Ashok Goyal,</span> <br></br>
            <b>Diabetes Care Client</b> <br></br> <b>Hyderabad</b>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default Homeworkout;