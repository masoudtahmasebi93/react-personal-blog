import { Box, Button, Paper, TextField, Typography,Container } from '@mui/material'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { ContentCreationModel } from '../models/contentCreation.interface'
import EditorWrapper from '../components/EditorWrapper'
import './NewPost.css'

function NewPost() {
  const titleRef = useRef<HTMLInputElement>(null)
  function readData(data: any) {
    temp.description = data
  }
  const temp = {
    title: titleRef.current?.value,
    description: '',
  } as ContentCreationModel
  const history = useHistory()
  function SaveData() {
    temp.title = titleRef.current?.value ?? ''
    console.log('temp', temp)
    fetch(
      'https://masoud-blog-react-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        method: 'POST',
        body: JSON.stringify(temp),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then((res) => {
        console.log('res', res)
        if (res.ok) {
          console.log('result of fb', res.body)
          history.replace('/')
        }
      })
      .finally(() => {
        console.log('finally')
      })
  }
  return (
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Container>
        <Typography component="h1" variant="h4" align="center">
          New Post
        </Typography>
        <br />
        <TextField
          label="Title"
          type="text"
          name="title"
          id="title"
          required
          inputRef={titleRef}
        />
        {' '}
          <EditorWrapper {...temp} saveHandler={readData}></EditorWrapper>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button onClick={SaveData}>Save</Button>
      </Container>
    </Paper>
  )
}

export default NewPost
