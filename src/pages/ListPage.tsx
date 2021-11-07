import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { onValue } from "firebase/database";
import React from "react";
import { useEffect, useState } from "react";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import { ContentInterface } from "../models/content.interface";
import { deleteBlogPost, getPosts } from "../service/firebase";
import "./ListPage.css";

function ListPage() {
  const [isLoading, setIsLoading] = useState(true);
  let ListPosts: ContentInterface[] = [];
  const [dataSet, setData] = useState(ListPosts);
  useEffect(getData, []);
  function getData() {
    ListPosts = [];
    let res: any = getPosts();
    onValue(res, (snapshot) => {
      const data = snapshot.val();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          ListPosts.push({ id: key, ...data[key] });
        }
      }
      setIsLoading(false);
      setData(ListPosts);
    });
  }

  function deletePost(id: string) {
    deleteBlogPost(id)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.error("err", err);
      });
  }

  if (isLoading) {
    return <div className="">...Loading...</div>;
  }
  const mainFeaturedPost = {
    title: "Title of a longer featured blog post",
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: "https://source.unsplash.com/random",
    imageText: "main image description",
    linkText: "Continue reading…",
  };
  const featuredPosts = [
    {
      title: "Featured post",
      date: "Nov 12",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random",
      imageLabel: "Image Text",
    },
    {
      title: "Post title",
      date: "Nov 11",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      image: "https://source.unsplash.com/random",
      imageLabel: "Image Text",
    },
  ];
  return (
    <React.Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>

      {/* <button onClick={logout}>logout</button> */}
      <ul>
        {dataSet.map((lp) => {
          return (
            <div key={lp.id}>
              <br></br>
              <Card>
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
                  <Button size="small" onClick={() => deletePost(lp.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
              <br></br>
            </div>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

export default ListPage;
