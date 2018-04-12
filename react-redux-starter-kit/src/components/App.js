import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import _ from 'lodash'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'

import AppRoutes from '../routes/AppRoutes'
import { getMenuItems } from '../util/applicationContext'
import { authenticateUser } from '../actions/authenticationJwtActions'

import styles from './AppStyles'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mainMenuOpen: false,
      userMenuAnchorEl: null
    }
    this.handleMainMenuOpen = this.handleMainMenuOpen.bind(this)
    this.handleMainMenuClose = this.handleMainMenuClose.bind(this)
    this.handleUserMenuOpen = this.handleUserMenuOpen.bind(this)
    this.handleUserMenuClose = this.handleUserMenuClose.bind(this)
  }

  handleUserMenuOpen (event) {
    this.setState({ userMenuAnchorEl: event.currentTarget })
  }

  handleUserMenuClose () {
    this.setState({ userMenuAnchorEl: null })
  }

  handleMainMenuOpen () {
    this.setState({ mainMenuOpen: true })
  }

  handleMainMenuClose () {
    this.setState({ mainMenuOpen: false })
  }

  renderMainMenuItems () {
    const { classes } = this.props
    return (
      <div className={classes.menuList}>
        <List component='nav'>
          {getMenuItems().map(it =>
            (<ListItem button key={it} onClick={this.handleMainMenuClose}><ListItemText primary={it} /></ListItem>))}
        </List>
      </div>
    )
  }

  renderMainMenu () {
    const { classes, theme } = this.props
    const { mainMenuOpen } = this.state
    return (
      <Drawer
        variant='persistent'
        anchor='left'
        open={mainMenuOpen}
        classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleMainMenuClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {this.renderMainMenuItems()}
      </Drawer>
    )
  }

  renderMainMenuIconButton () {
    const { classes } = this.props
    const { mainMenuOpen } = this.state
    return (
      <IconButton color='inherit' aria-label='open drawer' onClick={this.handleMainMenuOpen}
        className={classNames(classes.menuButton, mainMenuOpen && classes.hide)}>
        <MenuIcon />
      </IconButton>
    )
  }

  renderToobalTitle () {
    const { classes } = this.props
    return (
      <Typography variant='title' color='inherit' className={classes.flex}>App</Typography>
    )
  }

  renderUserMenuIconButton (userMenuId) {
    const { classes, authentication } = this.props
    const { userMenuAnchorEl } = this.state
    return (
      <IconButton aria-owns={userMenuAnchorEl ? userMenuId : null} aria-haspopup='true' color='inherit'
        onClick={this.handleUserMenuOpen}>
        <Avatar className={classes.avatar}>{_.toUpper(authentication.username[0])}</Avatar>
      </IconButton>
    )
  }

  renderUserMenuItems () {
    const { classes } = this.props
    return (
      <MenuItem onClick={this.handleUserMenuClose}>
        <Link className={classes.logoutMenuItem} to='/logout'>Sair</Link>
      </MenuItem>
    )
  }

  renderUserMenu (userMenuId) {
    const { userMenuAnchorEl } = this.state
    return (
      <Menu
        id={userMenuId}
        anchorEl={userMenuAnchorEl}
        open={Boolean(userMenuAnchorEl)}
        onClose={this.handleUserMenuClose}>
        {this.renderUserMenuItems()}
      </Menu>
    )
  }

  renderUserMenuDiv () {
    const userMenuId = 'user-menu'
    const { classes } = this.props
    return (
      <div className={classes.row}>
        {this.renderUserMenuIconButton(userMenuId)}
        {this.renderUserMenu(userMenuId)}
      </div>
    )
  }

  renderToolbarContents () {
    const { authentication } = this.props
    return authentication && authentication.isUserAuthenticated && (
      <React.Fragment>
        {this.renderMainMenuIconButton()}
        {this.renderToobalTitle()}
        {this.renderUserMenuDiv()}
      </React.Fragment>
    )
  }

  renderAppBar () {
    const { classes } = this.props
    const { mainMenuOpen } = this.state
    return (
      <AppBar className={classNames(classes.appBar, {
        [classes.appBarShift]: mainMenuOpen,
        [classes.appBarShiftLeft]: mainMenuOpen})}>
        <Toolbar disableGutters={!mainMenuOpen}>
          {this.renderToolbarContents()}
        </Toolbar>
      </AppBar>
    )
  }

  renderMain () {
    const { classes } = this.props
    const { mainMenuOpen } = this.state
    return (
      <main
        className={classNames(classes.content, classes.contentLeft, {
          [classes.contentShift]: mainMenuOpen,
          [classes.contentShiftLeft]: mainMenuOpen})}>
        <div className={classes.drawerHeader} />
        <AppRoutes />
      </main>
    )
  }

  render () {
    const { classes } = this.props
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            {this.renderAppBar()}
            {this.renderMainMenu()}
            {this.renderMain()}
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication })

const materialUIEnhance = withStyles(styles, { withTheme: true })(App)

export default connect(mapStateToProps, { authenticateUser })(materialUIEnhance)
