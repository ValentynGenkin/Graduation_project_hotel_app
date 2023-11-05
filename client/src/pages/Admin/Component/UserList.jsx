import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import styled from "styled-components";
import PropTypes from "prop-types";
// import { MdDeleteForever } from "react-icons/md";
const UsersList = ({ reload }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { loading, performFetch } = useFetch("/admin/allUsers", (res) =>
    setUsers(res.users)
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

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // const handleDelete = (id) => {
  //   console.log(id)
  // };
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        users && (
          <div>
            <h1>All Users</h1>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Phone</TableHeader>
                  <TableHeader>Role</TableHeader>
                  {/* <TableHeader>Delete</TableHeader> */}
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id}>
                    <TableData>
                      {user?.firstname} {user?.lastname}
                    </TableData>
                    <TableData>{user.email}</TableData>
                    <TableData>{user.phone}</TableData>
                    <TableData>{user.role}</TableData>
                    {/* <TableAction onClick={() => handleDelete(user._id)}>
                      <MdDeleteForever size={24} color />
                    </TableAction> */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {users.length > usersPerPage && (
                <PgContainer>
                  {Array(Math.ceil(users.length / usersPerPage))
                    .fill()
                    .map((_, i) => (
                      <PageNumber
                        key={i}
                        onClick={() => paginate(i + 1)}
                        style={{
                          color: i + 1 == currentPage ? "red" : "black",
                        }}
                      >
                        {i + 1}
                      </PageNumber>
                    ))}
                </PgContainer>
              )}
            </Pagination>
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

const Table = styled.table`
  width: 70vw;
  background-color: white;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
`;

const TableData = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
`;
// const TableAction = styled.td`
//   padding: 8px;
//   cursor: pointer;
//   border-bottom: 1px solid #ddd;
//   text-align: center;
//   transition: color 0.3s; /* Smooth color transition */
//   &:hover {
//     color: red; /* Change color to red on hover */
//   }
// `;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.div`
  margin: 0 5px;
  cursor: pointer;
`;

const PgContainer = styled.div`
  display: flex;
`;
