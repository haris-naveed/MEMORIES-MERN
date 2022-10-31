import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
 
  paper: {
    padding:'20px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap:'10px'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  
}));