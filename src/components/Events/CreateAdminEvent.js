import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import AdminEventForm from './AdminEventForm'
import EventsAlert from './EventsAlert'
import EventCalendar from './Calendar/EventCalendar'
import { createEvent } from '../../actions/EventsActions'
import { firebaseConnect } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'

class CreateAdminEvent extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  createEvent = (event, callback) => {
    const { firebase } = this.props
    const { firestore } = this.context.store

    createEvent(firestore, firebase, event, () => callback(true))
  }

  render() {
    const { history } = this.props

    return (
      <Container>
        <Row>
          <Col>
            <div className="d-flex">
              <h1 className="display-3">Create Event</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <EventsAlert />
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="8">
            <AdminEventForm
              submit={this.createEvent}
              btnText="Create Admin Event"
              modal={{
                title: 'Event Created!',
                body: 'Your event has been successfully created!',
                primaryBtnText: 'To Events',
                secondaryBtnText: 'Dismiss',
                onSubmit: () => history.push('/events')
              }}
            />
          </Col>
          <Col className="my-2 d-none d-lg-block" md="4">
            <EventCalendar bySpaces={true} stack={true} />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default withRouter(
  compose(firebaseConnect(), connect(mapStateToProps))(CreateAdminEvent)
)
