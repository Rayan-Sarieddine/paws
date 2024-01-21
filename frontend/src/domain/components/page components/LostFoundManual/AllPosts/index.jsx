import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPost } from "../../../../../core/dataSource/localDataSource/post";

function AllPosts() {
  const postsData = useSelector((state) => state.Post.resultPosts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewClick = (post) => {
    dispatch(selectPost(post));
    navigate("/lost-found-manual-claim");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {}, [postsData]);
  return (
    <div className="posts-show-container">
      <div className="post-pagination-main">
        <div className="post-pagination-header">
          <p>LOST & FOUND</p>
        </div>
        <div className="post-pagination-controls">
          <button
            className="btn btn-pagination-left"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            className="btn btn-pagination-right"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(postsData?.posts?.length / postsPerPage)
            }
          >
            &gt;
          </button>
        </div>
        {postsData?.length === 0 ? (
          <div className="no-posts-to-show">
            <p>No POSTS Found</p>
          </div>
        ) : (
          <div className="post-pagination-postCards">
            {postsData?.map((post, index) => (
              <div key={index} className="post-pagination-card">
                <img
                  src={`http://localhost:8000/images/posts/${post.image}`}
                  alt={post._id}
                />
                <div className="post-details-1">
                  <h3>{post.location}</h3>
                  <p>{post.description}</p>
                  <button
                    className="btn btn-adopt"
                    onClick={() => handleViewClick(post)}
                  >
                    CLAIM
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="post-pagination-controls">
          <button
            className="btn btn-pagination-left"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            className="btn btn-pagination-right"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(postsData?.posts?.length / postsPerPage)
            }
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
