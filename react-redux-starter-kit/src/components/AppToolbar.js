import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid'

import styles from './AppToolbarStyles'
import AppMenu from './AppMenu'
import UserMenu from './UserMenu'
import { getAppTitle } from '../util/applicationContext'

class AppToolbar extends Component {
  renderToobalTitle () {
    const { classes } = this.props
    return (
      <Typography variant='h6' color='inherit' className={classes.flex}>
        {getAppTitle()}
      </Typography>
    )
  }

  renderMainMenuIconButton () {
    const { classes, mainMenuOpen, handleMainMenuOpen } = this.props
    return (
      <IconButton color='inherit' aria-label='open drawer' onClick={handleMainMenuOpen}
        className={classNames(classes.menuButton, mainMenuOpen && classes.hide)}>
        <MenuIcon />
      </IconButton>
    )
  }

  renderToolbarContents () {
    const {
      authentication,
      userMenuAnchorEl,
      handleUserMenuOpen,
      handleUserMenuClose,
      handleMainMenuClose
    } = this.props
    return authentication && authentication.isUserAuthenticated && (
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              {this.renderMainMenuIconButton()}
            </Grid>
            <Grid item>
              {this.renderToobalTitle()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item />
        <Grid item>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <UserMenu
                userMenuAnchorEl={userMenuAnchorEl}
                handleUserMenuOpen={handleUserMenuOpen}
                handleUserMenuClose={handleUserMenuClose}
                handleMainMenuClose={handleMainMenuClose} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  render () {
    const {
      classes,
      authentication,
      mainMenuOpen,
      handleMainMenuClose
    } = this.props
    return (
      <React.Fragment>
        <AppBar className={classNames(classes.appBar, {
          [classes.appBarShift]: mainMenuOpen,
          [classes.appBarShiftLeft]: mainMenuOpen})}>
          {(authentication && authentication.isUserAuthenticated && (
            <Toolbar>
              {this.renderToolbarContents()}
            </Toolbar>
          )) || (<div />)}
        </AppBar>
        <AppMenu
          mainMenuOpen={mainMenuOpen}
          handleMainMenuClose={handleMainMenuClose} />
      </React.Fragment>
    )
  }
}

const materialUIEnhanced = withStyles(styles)(AppToolbar)

const mapStateToProps = ({ authentication }) => ({ authentication })

export default connect(mapStateToProps)(materialUIEnhanced)
