import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPost } from "../../../../../core/dataSource/localDataSource/post";
function AllPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleViewClick = (post) => {
    dispatch(selectPost(post));
    navigate("/lost-found-manual-claim");
  };
  const postsData = useSelector((state) => state.Post);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const [filter, setFilter] = useState({
    location: "all",
  });
  const [dateFilter, setDateFilter] = useState("all");
  const isWithinDateRange = (postDate, range) => {
    const today = new Date();
    const postCreationDate = new Date(postDate);

    switch (range) {
      case "today":
        return postCreationDate.toDateString() === today.toDateString();
      case "thisWeek":
        let weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        return postCreationDate >= weekStart && postCreationDate <= today;
      case "thisMonth":
        return (
          postCreationDate.getMonth() === today.getMonth() &&
          postCreationDate.getFullYear() === today.getFullYear()
        );
      default:
        return true;
    }
  };
  const [filteredPosts, setFilteredPosts] = useState(postsData.posts);

  useEffect(() => {
    let newFilteredPosts = postsData.posts;

    if (filter.location !== "all") {
      newFilteredPosts = newFilteredPosts?.filter(
        (post) => post.location === filter.location
      );
    }
    if (dateFilter !== "all") {
      newFilteredPosts = newFilteredPosts.filter((post) =>
        isWithinDateRange(post.createdAt, dateFilter)
      );
    }
    setFilteredPosts(newFilteredPosts);
  }, [filter, dateFilter, postsData.posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);

  const handleLocationChange = (e) => {
    setFilter({ ...filter, location: e.target.value });
  };
  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filterData = () => {};
  useEffect(() => {}, [currentPosts]);
  return (
    <div className="posts-show-container">
      <div className="filters">
        <div className="filter-category">
          <h3>Location</h3>
          <hr></hr>

          <label>
            <input
              type="radio"
              name="location"
              value="all"
              checked={filter.location === "all"}
              onChange={handleLocationChange}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              name="location"
              value="BEIRUT"
              checked={filter.location === "BEIRUT"}
              onChange={handleLocationChange}
            />
            BEIRUT
          </label>
          <label>
            <input
              type="radio"
              name="location"
              value="SOUTH"
              checked={filter.location === "SOUTH"}
              onChange={handleLocationChange}
            />
            SOUTH
          </label>
          <label>
            <input
              type="radio"
              name="location"
              value="NORTH"
              checked={filter.location === "NORTH"}
              onChange={handleLocationChange}
            />
            NORTH
          </label>

          <label>
            <input
              type="radio"
              name="location"
              value="BEKAA"
              checked={filter.location === "BEKAA"}
              onChange={handleLocationChange}
            />
            BEKAA
          </label>
          <label>
            <input
              type="radio"
              name="location"
              value="MOUNT-LEBANON"
              checked={filter.location === "MOUNT-LEBANON"}
              onChange={handleLocationChange}
            />
            MOUNT-LEBANON
          </label>
          <label>
            <input
              type="radio"
              name="location"
              value="OTHER"
              checked={filter.location === "OTHER"}
              onChange={handleLocationChange}
            />
            OTHER
          </label>
        </div>
        <div className="filter-category">
          <h3>Date</h3>
          <hr />
          <label>
            <input
              type="radio"
              name="dateFilter"
              value="all"
              checked={dateFilter === "all"}
              onChange={handleDateFilterChange}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="dateFilter"
              value="today"
              checked={dateFilter === "today"}
              onChange={handleDateFilterChange}
            />
            Today
          </label>
          <label>
            <input
              type="radio"
              name="dateFilter"
              value="thisWeek"
              checked={dateFilter === "thisWeek"}
              onChange={handleDateFilterChange}
            />
            This Week
          </label>
          <label>
            <input
              type="radio"
              name="dateFilter"
              value="thisMonth"
              checked={dateFilter === "thisMonth"}
              onChange={handleDateFilterChange}
            />
            This Month
          </label>
        </div>
      </div>
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
        {currentPosts?.length === 0 ? (
          <div className="no-posts-to-show">
            <p>No POSTS Found</p>
          </div>
        ) : (
          <div className="post-pagination-postCards">
            {currentPosts?.map((post, index) => (
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
