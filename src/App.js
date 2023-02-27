import logo from './logo.svg';
import './App.css';
import { Route, Routes, Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import AllBlogs from './pages/AllBlogs';
import Form from './pages/Form';
import SingleBlog from './pages/SingleBlog';

function App(props) {

  const navigate = useNavigate()

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
  };

  // Our Api Url
  const url = "https://masoniteblog-backend-ll.onrender.com/blog/";

  // State to Hold The List of BlogPosts
  const [posts, setPosts] = useState([]);

// an object that represents a null todo
  const nullBlog = {
    title: "",
    body: "",
  };

// const state to hold blog to edit 
const [targetBlog, setTargetBlog] = useState(nullBlog);


  // Function to get list of Blogs from API
const getBlogs = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

useEffect(() => {
  getBlogs();
}, []);

// Function to add todo from form data
const addBlogs = async (newBlogs) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlogs),
  });

  getBlogs();
};

// Function to select todo to edit
const getTargetBlog = (blog) => {
  setTargetBlog(blog);
  navigate("/edit");
};

// Function to edit BLOG on form submission
const updateBlog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  // get updated list of BLOGS
  getBlogs();
};

const deleteBlog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method: "delete",
  });

  // get updated list of todos
  getBlogs();
  navigate("/");
};



  return (
    <div className="App">
      <h1 style={h1}>My Blog Posts!</h1>
      <Link to="/new"><button style={button}>Create New Blog Post!</button></Link>
      <Routes>
        <Route path="/" element={<AllBlogs posts ={posts}/>}/>
        <Route path="/blog/:id" element={<SingleBlog posts ={posts} edit={getTargetBlog} deleteBlog={deleteBlog}/>}/>
        <Route path="/new" element={
          <Form
          initialBlog={nullBlog}
          handleSubmit={addBlogs}
          buttonLabel="create blog"
            />
        }/>
        <Route path="/edit" element={<Form
        initialBlog={targetBlog}
        handleSubmit={updateBlog}
        buttonLabel="update blog"
      /> }/>
      </Routes>

    </div>
  );
}

export default App;

