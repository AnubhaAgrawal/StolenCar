import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const Message = (props) => {
    return (
        <div role = "alert">
            {props.message.msgError && <Alert severity="error" onClose={() => {}}>{props.message.msgBody}</Alert>}
            {!props.message.msgError && <Alert severity="success" onClose={() => {}}>{props.message.msgBody}</Alert>}
            
        </div>
    )
}
export default Message;