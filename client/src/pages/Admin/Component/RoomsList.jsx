import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import useFetch from "../../../hooks/useFetch";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../CSS/RoomList.css";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
const RoomList = ({ setShowEditingModal, setEditingRoomId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRooms, setTotalRooms] = useState();
  const [pageSize, setPageSize] = useState(5);
  const [rowData, setRowData] = useState();
  const [reload, setReload] = useState(false);

  const { loading, performFetch } = useFetch(
    `/admin/dashboard/rooms?page=${currentPage}&limit=${pageSize}`,
    (res) => {
      setTotalRooms(res.pagination.total);
      setRowData(res.rooms);
    }
  );
  const gridRef = useRef();
  const columnDefs = [
    { field: "roomNo", headerName: "Number", width: "90px" },
    { field: "roomType", headerName: "Type", width: "120px" },
    { field: "roomDescription", headerName: "Description", width: "495px" },
    { field: "bedCount", headerName: "Bed Count", width: "110px" },
    {
      field: "roomPrice",
      headerName: "Price",
      width: "80px",
      valueGetter: function (params) {
        return params.data.roomPrice
          ? params.data.roomPrice.$numberDecimal
          : "";
      },
    },

    {
      field: "D",
      width: "50px",
      height: "50px",
      cellRenderer: (params) => (
        <DeleteCell data={params.data} reload={reload} setReload={setReload} />
      ),
    },
    {
      field: "D",
      width: "50px",
      height: "50px",
      cellRenderer: (params) => (
        <EditCell
          data={params.data}
          reload={reload}
          setReload={setReload}
          setShowEditingModal={setShowEditingModal}
          setEditingRoomId={setEditingRoomId}
        />
      ),
    },
  ];

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
  }, [reload, currentPage, pageSize]);
  const defaultColDef = useMemo(() => ({
    sortable: true,
    editable: true,
    enableRowGroup: true,
    resizable: true,
  }));
  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    setPageSize(value);
    setCurrentPage(1);
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);
  const onBtNext = () => {
    if (currentPage < Math.ceil(totalRooms / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const onBtPrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePageChange = (e) => {
    const newPage = e.target.value;
    if (
      !isNaN(newPage) &&
      newPage > 0 &&
      newPage <= Math.ceil(totalRooms / pageSize)
    ) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: 1000, height: 600, margin: 20 }}>
          <div className="grid-header">
            <div>
              Page Size:
              <select onChange={onPageSizeChanged} id="page-size">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button onClick={onBtPrevious}>-</button>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => handlePageChange(e)}
                style={{ width: "40px" }}
              />
              <button onClick={onBtNext}>+</button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>Total Rooms :</p>
                <p>{totalRooms}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p>Total Page :</p>
                <p>{Math.ceil(totalRooms / pageSize)}</p>
              </div>
            </div>
          </div>
          <div className="ag-theme-alpine" style={{ width: 1000, height: 360 }}>
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              paginationAutoPageSize={true}
              paginationPageSize={pageSize}
              pagination={true}
              suppressPaginationPanel={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

RoomList.propTypes = {
  reload: PropTypes.bool,
};

const DeleteCell = (props) => {
  const { performFetch } = useFetch(`/rooms/${props?.data?._id}/delete`, () => {
    props.setReload(!props.reload);
  });
  const buttonClicked = () => {
    performFetch({
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "DELETE",
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        cursor: "pointer",
      }}
    >
      <MdDelete onClick={buttonClicked} size={16} />
    </div>
  );
};
const EditCell = (props) => {
  const buttonClicked = () => {
    props.setShowEditingModal(true);
    props.setEditingRoomId(props.data);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        cursor: "pointer",
      }}
    >
      <AiFillEdit onClick={buttonClicked} size={16} />
    </div>
  );
};
export default RoomList;
EditCell.propTypes = {
  reload: PropTypes.bool,
  setReload: PropTypes.func,
  data: PropTypes.object,
  setShowEditingModal: PropTypes.fun,
  setEditingRoomId: PropTypes.fun,
};
DeleteCell.propTypes = {
  reload: PropTypes.bool,
  setReload: PropTypes.func,
  data: PropTypes.object,
};
RoomList.propTypes = {
  setShowEditingModal: PropTypes.func,
  setEditingRoomId: PropTypes.func,
};
