import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop:"30px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "16px",
    
  },
 
  avatar: {
    margin: "8px",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    marginTop: "24px",
  },
  submit: {
    margin: "24px 0 16px 0",
  },
  googleButton: {
    marginBottom: "16px",
  },
}));