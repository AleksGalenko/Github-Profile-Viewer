import React, { useState } from 'react';

const RepositoryList = ({ repositories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(10); // Default: 10 repositories per page

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repositories.slice(indexOfFirstRepo, indexOfLastRepo);

  const totalPageCount = Math.ceil(repositories.length / reposPerPage);

  const visiblePageNumbers = [];
  const maxVisiblePageNumbers = 5; // Maximum number of visible page numbers
  const ellipsis = '...';

  if (totalPageCount <= maxVisiblePageNumbers) {
    // If there are fewer pages than the maximum visible page numbers, show all page numbers
    for (let i = 1; i <= totalPageCount; i++) {
      visiblePageNumbers.push(i);
    }
  } else {
    // Otherwise, show the first, last, and a few pages around the current page
    visiblePageNumbers.push(1);
    if (currentPage > 2) {
      visiblePageNumbers.push(ellipsis);
    }
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPageCount) {
        visiblePageNumbers.push(i);
      }
    }
    if (currentPage < totalPageCount - 1) {
      visiblePageNumbers.push(ellipsis);
    }
    visiblePageNumbers.push(totalPageCount);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const handlePerPageChange = (e) => {
    setReposPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing the number of repositories per page
  };

  return (
    <div className="repository-list">
      <h2>Repositories</h2>
      <div className="pagination-controls">
        <label htmlFor="reposPerPage">Repositories per page:</label>
        <select
          id="reposPerPage"
          value={reposPerPage}
          onChange={handlePerPageChange}
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          {/* <option value="1000">1000</option> */}
        </select>
        {visiblePageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => handleClick(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number === ellipsis ? (
              <span>{ellipsis}</span>
            ) : (
              <span>{number}</span>
            )}
          </button>
        ))}
      </div>
      <ul>
        {currentRepos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description || 'No description available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
