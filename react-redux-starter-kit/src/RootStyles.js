import blue from '@material-ui/core/colors/blue'
import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true
  }
})

const styles = theme => ({
  root: theme.typography.body2Next
})

export default styles
