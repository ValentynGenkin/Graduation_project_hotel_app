import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import PropTypes from "prop-types";
import "../CSS/UserList.css";

const UsersList = ({ reload }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { loading, performFetch } = useFetch(
    "/admin/dashboard/allUsers",
    (res) => setUsers(res.users)
  );

  useEffect(() => {
    const fetchData = async () => {
      performFetch({
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    };

    fetchData();
  }, [reload]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        users && (
          <div>
            <h1>All Users</h1>
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="admin-table-header">FullName</th>
                  <th className="admin-table-header">Email</th>
                  <th className="admin-table-header">Phone</th>
                  <th className="admin-table-header">Role</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="admin-table-data">
                      {user?.firstname} {user?.lastname}
                    </td>
                    <td className="admin-table-data">{user.email}</td>
                    <td className="admin-table-data">{user.phone}</td>
                    <td className="admin-table-data">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="admin-pagination">
              <div className="admin-pg-container">
                {users.length > usersPerPage &&
                  Array(Math.ceil(users.length / usersPerPage))
                    .fill()
                    .map((_, i) => (
                      <div
                        key={i}
                        className="admin-page-number"
                        onClick={() => paginate(i + 1)}
                        style={{
                          color: i + 1 === currentPage ? "red" : "black",
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

UsersList.propTypes = {
  reload: PropTypes.bool.isRequired,
};

export default UsersList;
