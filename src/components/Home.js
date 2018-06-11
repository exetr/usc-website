import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Async from 'react-promise';
import { connect } from 'react-redux';
import { headerAboutUs as carouselOne, headerContactUs as carouselTwo, headerDashboard as carouselThree } from '../resources/images';
import {
  UncontrolledCarousel,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { getGoogleCalendarEvents, dayFormat, getDescriptionIconColor } from '../resources/gcal'
import { setGoogleEvents } from '../actions'
import { isEmpty } from '../utils/utils'
import lodash from 'lodash'

const items = [
  {
    src: carouselOne,
    altText: 'Welcome',
    caption: 'The 17th USC Committee',
    header: 'Welcome'
  },
  {
    src: carouselTwo,
    altText: 'Welcome',
    caption: 'Freshmen Orientation Project 2017',
    header: 'Aurora'
  },
  {
    src: carouselThree,
    altText: 'Welcome',
    caption: 'Cinnamon College',
    header: 'Our Home'
  }
];

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }

  componentDidMount = () => {
    if (isEmpty(this.props.events)) {
      getGoogleCalendarEvents(this.props.setGoogleEvents)
    }
  }

  render() {
    var { upcomingEvents } = this.props

    if (upcomingEvents.length > 5) {
      upcomingEvents = lodash.slice(upcomingEvents, 0, 5)
    }

    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <UncontrolledCarousel items={items} />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Jumbotron>
              <h1 className="display-3">About Us</h1>
              <p className="lead">The University Scholars Club (USC) is a community of students enrolled in the National University of Singapore (NUS) University Scholars Programme (USP), which is a multidisciplinary, partially residential academic programme for NUS undergraduates.</p>
              <p className="lead">
                <Link to={`/about`}>
                  <Button color="primary">Learn More</Button>
                </Link>
              </p>
              <hr className="my-2" />
              <br />
              <h1 className="display-3">Upcoming Events</h1>
              <Container>
                <Row>
                  {
                    upcomingEvents.length > 0 ? upcomingEvents.map((event)=>
                      <Col key={event.glink}>
                        <Card>
                          <CardBody>
                            <CardTitle>{event.title + '    '}<FontAwesomeIcon className="align-middle" icon="circle" color={getDescriptionIconColor(event)} size="xs" /></CardTitle>
                            <CardSubtitle>{moment(event.start).format('Do MMMM') + (event.type ? ' - ' + event.type : '')}</CardSubtitle>
                            <CardText>{ moment(event.start).format('hh:mm a') + (event.venue ? ' - ' + event.venue : '')  }</CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ) : <Col><h4>No Upcoming Events :( Stay tuned!</h4></Col>
                  }
                </Row>
              </Container>
              <br/>
              <p className="lead">
                <Link to={`/events`}>
                  <Button color="primary">See More</Button>
                </Link>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    upcomingEvents: state.googleEventsUpcoming
  }
}

export default connect(mapStateToProps, { setGoogleEvents })(Home);