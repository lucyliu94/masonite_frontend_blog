import React from "react";
import Post from "../components/post";

const AllBlogs = (props) => {
  return props.posts.map((post) => <Post post={post} key={post.id} />);
};

export default AllBlogs;