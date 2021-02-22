import React from 'react'
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  }
}))
const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Awesome Password Generator v0.1
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
