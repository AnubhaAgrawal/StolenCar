import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Message from './Message';
import '../App.css';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));
function ReportForm() {
    const [reportBody, SetReport] = useState({username: '', age: '', LicenceNumber: '', UserID:'', ProofofOwnerShip:'', VIN: '', status:false });
    const [userId, SetId] = useState(1);
    const [userId1, SetId1] = useState(1);
    const [userId2, SetId2] = useState(1);
    const [data, setData] = useState([]);
    const [police, setPolice] = useState({username: '', assigntask: false});
    const [getpolice, getPolice] = useState([]);
    const [message, setMessage] = useState(null);
    const [message1, setMessage1] = useState(null);
    const resetForm = () =>{
        SetReport({username: '', age: 0, LicenceNumber: '', UserID:1, ProofofOwnerShip:'', VIN: '', status:false });
    }
    const resetForm1 = () =>{
        setPolice({username: '', assigntask: false});
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(userId===1){
          SetId(0);
        }else{
          SetId(1);
        }
        //console.log("Hi you submit ");
        //console.log(reportBody);
       
        let t = null;

        getpolice.find(element=>{
          if(!element.assigntask){
            console.log(element._id);
            t ={_id: element._id,assigntask: true, username: element.username};

          }
        })
        if(t){
          console.log(t);
          reportBody.status = true;
          SetReport({...reportBody, status: true})
          console.log(reportBody);
        }


        Axios({
          url: '/api/update ',
          method: 'POST',
          data: t
      })
      .then(()=>{
          console.log('Data has been sent to the server');
          
      })
      .catch(()=>{
       
          console.log('Some error');
      });

        Axios({
            url: '/api/save ',
            method: 'POST',
            data: reportBody
        })
        .then(()=>{
            console.log('Data has been sent to the server');
            setMessage1({msgBody : "Data has been successfully saved to the server", msgError: false });
            resetForm();
        })
        .catch(()=>{
          setMessage1({msgBody : "Some Error Occured", msgError: true });
            console.log('Some error');
        });
    }

    const handleSubmit1 = (event) =>{
        event.preventDefault();
        console.log("Hi you submit ");
        console.log(police);
        if(userId1===1){
          SetId1(0);
        }else{
          SetId1(1);
        }

       let t1 = null;
        
          data.find(element=>{
            if(!element.status){
              console.log("Element Id: ",element._id);
              t1 ={...element, status:true, _id: element._id};
              console.log("Value: ", t1);
              police.assigntask = true;
    
            }
          })
  
     
       
        if(t1){
          Axios({
            url: '/api/change ',
            method: 'POST',
            data: t1
        })
        .then(()=>{
    
            console.log('Data has been sent to the server');
            
        })
        .catch(()=>{
         
            console.log('Some error');
        });
    
        }

        Axios({
            url: '/api/police ',
            method: 'POST',
            data: police
        })
        .then((res)=>{
          console.log(res);
        //  setMessage(data.message);
        setMessage({msgBody : "Data saved successfully", msgError: false });
            console.log('Data has been sent to the server');
            resetForm1();
        })
        .catch((err)=>{
          setMessage({msgBody : "Username is already taken", msgError: true });
            console.log('Some error');
        });
    }

    const handleSubmit3 = (event) =>{
      event.preventDefault();
      if(userId2===1){
        SetId2(0);
      }else{
        SetId2(1);
      }

      
      console.log("Hi you submit ");
      console.log(police);
      let t=null;
      getpolice.find(element=>{
        if(element.username== police.username){
          console.log(element._id);
          t ={_id: element._id,assigntask: false, username: element.username};

        }
      })
     let t1 = null
      if(t){
        data.find(element=>{
          if(!element.status){
            console.log("Element Id: ",element._id);
            t1 ={...element, status:true, _id: element._id};
            console.log("Value: ", t1);
            //console.log(t1);
            t = null;
  
          }
        })

      }
     
      if(t1){
        Axios({
          url: '/api/change ',
          method: 'POST',
          data: t1
      })
      .then(()=>{
  
          console.log('Data has been sent to the server');
          
      })
      .catch(()=>{
       
          console.log('Some error');
      });
  
      }
      if(t){
      
      Axios({
        url: '/api/update ',
        method: 'POST',
        data: t
    })
    .then(()=>{

        console.log('Data has been sent to the server');
        
    })
    .catch(()=>{
     
        console.log('Some error');
    });

  }

     
  }
  
    //var data = [];
    useEffect(() => {
        const fetchData = async () => {
          const result = await Axios(
            `/api`,
          );
         
             setData(result.data);
            
        };
     
        fetchData();

        const fetchData1 = async () => {
            const result = await Axios(
              `/api/poli`,
            );
             getPolice(result.data);
             console.log(result);
             //console.log("hgh");
             //console.log(getpolice);
          };
       
          fetchData1();
      }, [userId, userId1, userId2]);
  
      const classes = useStyles();
      const [anchorEl, setAnchorEl] = React.useState(null);
      const [anchorEl1, setAnchorEl1] = React.useState(null);
      const [anchorEl2, setAnchorEl2] = React.useState(null);
      const [anchorEl3, setAnchorEl3] = React.useState(null);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
      };
      const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
      };
      const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleClose1 = () => {
        setAnchorEl1(null);
      };
      const handleClose2 = () => {
        setAnchorEl2(null);
      };
      const handleClose3 = () => {
        setAnchorEl3(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
      const open1 = Boolean(anchorEl1);
      const id1 = open1 ? 'simple-popover' : undefined;
      const open2 = Boolean(anchorEl2);
      const id2 = open2 ? 'simple-popover' : undefined;
      const open3 = Boolean(anchorEl3);
      const id3 = open3 ? 'simple-popover' : undefined;
    return (
        <div>
          <div className = "header">
             <h2>Report your Stolen Car</h2>
             <h4>Fill this Form</h4>
             </div>
            <form onSubmit = { handleSubmit} className ="form" >
            <label for="fname" className="lab">User Name</label>
                <div className = "form-input">
               
                    <input type= "text" name = "name" placeholder = "User Name" value = {reportBody.username} onChange = {
                        (e)=> { console.log(e.target.value);
                            SetReport({...reportBody, username: e.target.value})
                                }}>
                    </input>
                </div>
                <label for="fname" className ="lab">Age</label>
                <div className = "form-input">
                    <input type= "text" name = "age" placeholder = "Age" value = {reportBody.age} onChange = {(e)=> SetReport({...reportBody, age: e.target.value})}>
                    </input>
                </div>
                <label for="fname" className = "lab">LicenceNumber</label>
                <div className = "form-input">
                    <input type= "text" name = "LN" placeholder = "Licence Number" value = {reportBody.LicenceNumber} onChange = {(e)=> SetReport({...reportBody, LicenceNumber: e.target.value})}>
                    </input>
                </div>
                <label for="fname" className = "lab">AdharCard Number</label>
                <div className = "form-input">
                    <input type= "text" name = "UserId" placeholder = "User Id(AdharCard Number) " value = {reportBody.UserID} onChange = {(e)=> SetReport({...reportBody, UserID: e.target.value})}>
                    </input>
                </div> 
                <label for="fname" className = "lab">Proof of Ownership</label>
                <div className = "form-input">
                    <input type= "text" name = "poo" placeholder = "Proof of ownership" value = {reportBody.ProofofOwnerShip} onChange = {(e)=> SetReport({...reportBody, ProofofOwnerShip: e.target.value})}>
                    </input>
                </div>
                <label for="fname" className = "lab">VIN</label>
                <div className = "form-input">
                    <input type= "text" name = "vin" placeholder = "VIN" value = {reportBody.VIN} onChange = {(e)=> SetReport({...reportBody, VIN: e.target.value})}>
                    </input>
                </div>

                <button className="btn">Submit</button>
            </form>
            {message1 ? <Message message = {message1}/> : null}
            {console.log(data)}
         <div>
     <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        List of Reports
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>   <ul>{data.length!==0 && data.map((post, index) =>{
                return(<div key = {index}>
                   
                <li> UserName- {post.username}, UserId- {post.UserID}, LicenceNumber- {post.LicenceNumber}, status- {post.status? "Assigned": "Not Assigned"}</li>
                </div>)
            } )}</ul>
</Typography>
      </Popover>
      </div>
      <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick1}>
        Add Police Officer
      </Button>
      <Popover
        id={id1}
        open={open1}
        anchorEl={anchorEl1}
        onClose={handleClose1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>  
         <form onSubmit = {handleSubmit1}>
         <div className = "form-input">
                    <input type= "text" name = "username" placeholder = "Add Unique UserName of Police Officer" value = {police.username} onChange = {(e)=> setPolice({...police, username: e.target.value})}>
                    </input>
                </div>
                <button className = "btn1">Submit</button>
        </form>
       
        {message ? <Message message = {message}/> : null}
</Typography>
      </Popover>

      </div>
      <div>
     <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick2}>
        List of PoliceOfficers
      </Button>
      <Popover
        id={id}
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>    <ul> {getpolice.length!==0 && getpolice.map((post, index) =>{
                return(<div key = {index}>
                   
                <li>UserName- {post.username}, Status- {post.assigntask? "true": "false"}</li>
               
                </div>)
            })}</ul>
</Typography>
      </Popover>
      </div>

      <div>
        <h5>If car is Found by any of the police office give name of it and assign new report if it was not prevously assigned or if all reports are already assigned then wait for another report to come</h5>
     <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick3}>
     Which Police officer find a car 
      </Button>
      <Popover
        id={id3}
        open={open3}
        anchorEl={anchorEl3}
        onClose={handleClose3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
        <form onSubmit = {handleSubmit3}>      
        <div className = "form-input">
                    <input type= "text" name = "username" placeholder = "Add UserName of Police Officer whose work is complete" value = {police.username} onChange = {(e)=> setPolice({username: e.target.value, assigntask: true})}>
                    </input>
                   
                </div>
                <button className="btn1">Submit</button>
          </form>      
</Typography>
      </Popover>
      </div>
    
        </div>
    )
}

export default ReportForm
