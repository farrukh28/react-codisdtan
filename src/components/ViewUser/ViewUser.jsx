import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useUserData } from "../../services/users";
import Spinner from "../Spinner/Spinner";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const ViewUser = ({ userID, open, toggle }) => {
  // queries
  const { data, isPending, error } = useUserData(userID);

  const handleClose = () => {
    toggle();
  };

  return (
    <Dialog open={open} fullWidth onClose={handleClose}>
      <DialogTitle>User Details</DialogTitle>
      {isPending && <Spinner />}
      {error && <p className="text-red-400">{error.message}</p>}
      {data && (
        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>{`${data.data.firstName} ${data.data.lastName}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{data.data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{data.data.type}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleClose}
          color="secondary"
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUser;
