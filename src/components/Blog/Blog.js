// **************************************ABOUT.JS*****************************************

// -------------------------------------DEPENDENCIES---------------------------------------
import React, { Component } from "react";
import axios from "axios";
import Post from "../Post/Post";
import { MdAdd } from "react-icons/md";
import "./Blog.css";

// -------------------------------------FUNCTIONALITY--------------------------------------
class Blog extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.getData();
  }
  async getData() {
    const post = await axios.get("/api/posts");
    this.setState({
      posts: post.data,
    });
  }

   // -----------------------------------STRUCTURE---------------------------------------------
  render(props) {
    console.log(this.state.posts);
    const arr = this.state.posts.map((element, index) => {
      return (
        <div className="pullPost" key={element.id}>
          <Post className="postComp" posts={element} dlt={this.dlt} />
        </div>
      );
    });
    return (
      <div className="body">
        <div className="blogComponent">
          <p className="blogTitle">Kortney's Blog</p>
          <div className="postMain">
            <div className="addPostButtonBox">
            {/* {props.isLoggedIn === true ? (             */}
              <div className="addPostButton">
                {/* <p className="tooltipAddPost">Add Post</p> */}
                {/* <MdAdd /> */}
              </div>
          {/* // ) : null} */}
            </div>
            <div className="postContent">{arr}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
