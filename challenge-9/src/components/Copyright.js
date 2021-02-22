import { Link, Typography } from '@material-ui/core'
import React from 'react'

// import { Container } from './styles';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="primary" href="https://github.com/antomarsi">
        Antonio Marco da Silva
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
