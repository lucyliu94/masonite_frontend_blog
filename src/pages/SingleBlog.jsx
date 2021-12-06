import React from "react";
import { Link, useParams } from "react-router-dom";

// destructuring the props needed to get our post, including router prop match
const SingleBlog = ({ posts, edit, deleteBlog}) => {
  const params = useParams()
  const id = parseInt(params.id); //get the id from url param
  const post = posts.find((post) => post.id === id);

  ////////////////////
  // Styles
  ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{post.title}</h1>
      <h2>{post.body}</h2>
      <button onClick={(event) => edit(post)}>Edit</button>
      <button onClick={(event) => deleteBlog(post)}>Delete</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleBlog;