import React, { useState } from 'react'
import {
  CssBaseline,
  makeStyles,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip
} from '@material-ui/core'
import Header from './components/Header'
import { generatePassword, PASS_ENUM } from './lib/password'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import Copyright from './components/Copyright'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  password: {
    marginTop: theme.spacing(3)
  },
  image: {
    height: '100vh'
  }
}))

const App = () => {
  const classes = useStyles()
  const [PasswordPreferences, setPasswordPreferences] = useState(0)
  const [PasswordLength, setPasswordLength] = useState(10)
  const [PasswordValue, setPasswordValue] = useState()
  const [Open, setOpen] = React.useState(false)

  const handleOnChange = (passEnum, checked) => {
    setPasswordPreferences(
      checked ? PasswordPreferences | passEnum : PasswordPreferences & ~passEnum
    )
  }

  const PassEnumValues = [
    {
      value: PASS_ENUM.USE_UPPERCASE,
      text: 'Use UPPERCASE [A, B, C...]'
    },
    {
      value: PASS_ENUM.USE_NUMERIC,
      text: 'Use UPPERCASE [1, 2, 3...]'
    },
    {
      value: PASS_ENUM.USE_SYMBOL,
      text: 'Use UPPERCASE [!, @, #...]'
    }
  ]

  const handleSubmit = event => {
    event.preventDefault()
    const newPassword = generatePassword(PasswordPreferences, PasswordLength)
    setPasswordValue(newPassword)
  }
  const copyHandler = () => {
    navigator.clipboard.writeText(PasswordValue)
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 1200)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Awesome Password Generator v0.1
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup row>
              {PassEnumValues.map(v => (
                <FormControlLabel
                  key={v.value}
                  control={
                    <Checkbox
                      checked={!!(PasswordPreferences & v.value)}
                      onChange={event =>
                        handleOnChange(v.value, event.target.checked)
                      }
                    />
                  }
                  label={v.text}
                />
              ))}
            </FormGroup>
            <FormGroup row>
              <Typography id="discrete-slider-small-steps" gutterBottom>
                Password size:
              </Typography>
              <Slider
                defaultValue={10}
                aria-labelledby="ValueDisplay"
                onChange={(event, newValue) => {
                  setPasswordLength(newValue)
                }}
                step={1}
                marks
                min={4}
                max={32}
                valueLabelDisplay="auto"
              />
            </FormGroup>
            <FormGroup row>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Generate Password
              </Button>
            </FormGroup>
            {PasswordValue && (
              <FormGroup row className={classes.password}>
                <TextField
                  value={PasswordValue}
                  fullWidth
                  InputProps={{
                    endAdornment: document.queryCommandSupported('copy') ? (
                      <InputAdornment position="start">
                        <Tooltip
                          PopperProps={{
                            disablePortal: true
                          }}
                          onClose={() => setOpen(false)}
                          open={Open}
                          title="Coppied to clipboard!"
                          aria-label="Coppied to clipboard!"
                          disableHoverListener
                          disableFocusListener
                          disableTouchListener
                        >
                          <IconButton
                            aria-label="Copy password"
                            onClick={copyHandler}
                          >
                            <FileCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ) : null
                  }}
                  focused={false}
                  variant="outlined"
                />
              </FormGroup>
            )}
          </form>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  )
}

export default App
