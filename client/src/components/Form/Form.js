import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux';
import useStyle from "./styles";
import {createPost,updatePost} from '../../actions/posts'
import { useSelector } from 'react-redux'

function Form({setCurrentId,currentId}) {

  const user=JSON.parse(localStorage.getItem('profile'));

  const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null)
  
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  
    useEffect(()=>{
      if(post)
      setPostData(post);
    },[post])

  const classes = useStyle();
  
  const dispatch=useDispatch();

  const handleSubmit = (e) => {
      //  e.preventDefault();
      //  console.log(postData)
       if(currentId)
       {
        dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));

       }
       else{
         dispatch(createPost({...postData,name:user?.result?.name}));

       }
      clear();
  };

  const clear=()=>{
    setCurrentId(null);
    setPostData({ 
    title: "",
    message: "",
    tags: "",
    selectedFile: "",})
  }

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">{currentId?'Editing':'Creating'} a memory</Typography>
       

        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) =>
            setPostData({ ...postData, title: e.target.value })
          }
        />

        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
          type="file"
          multipe={false}
          onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
          />
        </div>
        <Button variant='contained' color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button  variant='contained' color="secondary" size="small" onClick={clear} fullWidth>CLEAR</Button>
      </form>
    </Paper>
  );
}

export default Form;
