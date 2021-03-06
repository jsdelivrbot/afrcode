import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { TextField } from 'redux-form-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'

import { authenticateUser } from '../actions/authenticationJwtActions'
import { createDataToAuthentication } from '../util/applicationContext'
import { required, alphaNumeric } from '../util/fieldLevelValidations'
import styles from './LoginStyles'
import App from './App'

class Login extends Component {
  onSubmit (values) {
    this.props.authenticateUser(createDataToAuthentication(values.username, values.password))
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { isUserAuthenticated } = this.props.authentication
    const { classes } = this.props

    if (isUserAuthenticated) {
      return (<Redirect to={from} />)
    }

    const { handleSubmit, submitting } = this.props

    return (
      <App>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Grid container direction='column' alignItems='center' spacing={16}>
            <Card className={classes.card}>
              <Grid className={classes.titleBar} container justify='center' >
                <Icon className={classes.icon}>account_circle</Icon>
              </Grid>
              <CardContent>
                <Field
                  className={classes.loginForm}
                  label='Login'
                  name='username'
                  type='text'
                  autoFocus
                  component={TextField}
                  fullWidth
                  validate={[required, alphaNumeric]}
                />
                <Field
                  className={classes.loginForm}
                  label='Senha'
                  name='password'
                  type='password'
                  component={TextField}
                  validate={[required]}
                  fullWidth
                />
              </CardContent>
              <CardActions>
                <Button fullWidth color='primary' type='submit' disabled={submitting}>Entrar</Button>
              </CardActions>
            </Card>
          </Grid>
        </form>
      </App>
    )
  }
}

const materialUIEnhance = withStyles(styles)(Login)

const mapStateToProps = ({ authentication }) => ({ authentication })

const reduxEnhance = connect(mapStateToProps, { authenticateUser })(materialUIEnhance)

export default reduxForm({ form: 'LoginForm' })(reduxEnhance)
