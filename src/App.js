import React, { Component } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  Button,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonGroup,
  Box,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const url = "https://course-api.com/react-tabs-project";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      jobs: [],
      value: 0,
    };
  }

  fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    this.setState({ jobs: newJobs, loading: false });
  };

  componentDidMount() {
    this.fetchJobs();
  }

  handleTabBtn = (index) => {
    this.setState({ value: index });
  };

  render() {
    const { value } = this.state;

    const { company, dates, duties, title } = this.state.jobs[value] || {};
    return (
      <Container data-test="component-app">
        {this.state.loading ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Box mt={10}>
                <CircularProgress />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={2}>
              <ButtonGroup
                orientation="vertical"
                color="primary"
                data-test="btn-container"
              >
                {this.state.jobs.map((jobItem, index) => {
                  return (
                    <Button
                      className="foo"
                      key={jobItem.id}
                      onClick={() => this.handleTabBtn(index)}
                      variant={index === this.state.value && "contained"}
                    >
                      {jobItem.company}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {company}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    {dates}
                  </Button>
                </CardActions>
                <List data-test="duties-container">
                  {duties &&
                    duties.map((duty, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <KeyboardArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText primary={duty} />
                      </ListItem>
                    ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }
}
export default App;
