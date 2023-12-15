import React, { useState } from "react";
import { useUsersData } from "../../services/users";
import Spinner from "../../components/Spinner/Spinner";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import RenderUser from "../../components/RenderUser/RenderUser";
import { Add, ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useDisclosure } from "../../utils/hooks";
import CreateUser from "../../components/CreateUser/CreateUser";
import { debounce } from "lodash";

const Home = () => {
  // state
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("firstName.asc");
  const [searchQuery, setSearchQuery] = useState("");

  // hooks
  const { isOpen, onToggle } = useDisclosure();

  // queries
  const { isPending, error, data, refetch } = useUsersData(
    page,
    limit,
    sort,
    searchQuery
  );

  const handleChangeLimit = (e) => {
    setPage(0);
    setLimit(e.target.value);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleSort = () => {
    if (sort === "firstName.asc") setSort("firstName.desc");
    if (sort === "firstName.desc") setSort("firstName.asc");
  };

  const handleSearch = debounce((e) => {
    setSearchQuery(e.target.value);
  }, 500);

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-400">{error.message}</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-center">Users</h1>
      <div className="flex justify-end gap-3 mb-6 xs:flex-col sm:flex-row">
        <TextField onChange={handleSearch} size="small" placeholder="Search" />
        <Button
          onClick={onToggle}
          variant="outlined"
          disableElevation
          startIcon={<Add />}
        >
          Create User
        </Button>
      </div>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead className="bg-slate-200">
              <TableRow>
                <TableCell>
                  Full name
                  <IconButton size="small" onClick={handleSort}>
                    {sort === "firstName.asc" && (
                      <ArrowUpward fontSize="small" color="primary" />
                    )}
                    {sort === "firstName.desc" && (
                      <ArrowDownward fontSize="small" color="primary" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((user) => (
                <RenderUser
                  key={user._id}
                  userID={user._id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  type={user.type}
                  email={user.email}
                  refetch={refetch}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                colSpan={3}
                count={data.totalCount}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[3, 10, 25, 50, 100]}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeLimit}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>

      {isOpen && (
        <CreateUser open={isOpen} toggle={onToggle} refetch={refetch} />
      )}
    </div>
  );
};

export default Home;
