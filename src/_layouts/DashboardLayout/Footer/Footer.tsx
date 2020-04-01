import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

import { Theme } from '_theme'

const Footer = () => {
  const classes = useStyles()

  return <footer className={classes.footer}></footer>
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    display: 'flex',
    background: '#fff',
    padding: '0.5rem 1rem',
    justifyContent: 'space-between',
  },
}))

export default Footer
