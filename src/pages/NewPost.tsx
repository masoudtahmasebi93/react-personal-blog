import { Box, Button, TextField } from '@mui/material'
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
    <Box>
      <TextField
        label="Title"
        type="text"
        name="title"
        id="title"
        required
        inputRef={titleRef}
      />
      <Box>
        <EditorWrapper {...temp} saveHandler={readData}></EditorWrapper>
      </Box>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button onClick={SaveData}>Save</Button>
    </Box>
  )
}

export default NewPost
