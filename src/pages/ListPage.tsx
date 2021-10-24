import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import { ContentInterface } from '../models/content.interface'
import { getPosts } from '../service/firebase'
import './ListPage.css'

function ListPage() {
  const [isLoading, setIsLoading] = useState(true)
  let ListPosts: ContentInterface[] = []
  const [dataSet, setData] = useState(ListPosts)
  useEffect(getData, [])
  function getData() {
    ListPosts = []
    let res: any = getPosts()
    onValue(res, (snapshot) => {
      const data = snapshot.val()
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          ListPosts.push({ id: key, ...data[key] })
        }
      }
      setIsLoading(false)
      setData(ListPosts)
    })
  }

  if (isLoading) {
    return <div className="">...Loading...</div>
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <h1>All Blog Posts</h1>
      {/* <button onClick={logout}>logout</button> */}
      <ul>
        {dataSet.map((lp) => {
          return (
            <>
              <br></br>
              <Card key={lp.id}>
                {/* <h3>{lp.title}</h3>
              <time>{lp.creationTime}</time>
              <p dangerouslySetInnerHTML={{ __html: lp.description }}></p>
              <span>{lp.likes}</span>
              <span>{lp.views}</span> */}
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {lp.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    dangerouslySetInnerHTML={{ __html: lp.description }}
                  ></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {lp.likes}
                  </Typography>
                  <Typography variant="body2">{lp.views}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Read Complete</Button>
                </CardActions>
              </Card>
              <br></br>
            </>
          )
        })}
      </ul>
    </Box>
  )
}

export default ListPage
