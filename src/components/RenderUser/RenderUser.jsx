import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useDisclosure } from "../../utils/hooks";
import ViewUser from "../ViewUser/ViewUser";
import { toast } from "sonner";
import axios from "axios";
import EditUser from "../EditUser/EditUser";

const RenderUser = ({ userID, firstName, lastName, type, email, refetch }) => {
  // state
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // hooks
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isEditOpen, onToggle: onEditToggle } = useDisclosure();

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEditToggle();
    handleCloseMenu();
  };

  const handleView = () => {
    onToggle();
    handleCloseMenu();
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    const toastID = toast.loading("Deleting user...");
    try {
      await axios.delete(`/users/${userID}`);
      toast.success("User deleted", { id: toastID });
      refetch();
      handleCloseMenu();
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <span
            onClick={onToggle}
            className="cursor-pointer"
          >{`${firstName} ${lastName}`}</span>
        </TableCell>
        <TableCell>{email}</TableCell>
        <TableCell align="center">
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu
        onClose={handleCloseMenu}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleView} disabled={isLoading}>
          View
        </MenuItem>
        <MenuItem onClick={handleEdit} disabled={isLoading}>
          Edit
        </MenuItem>
        <MenuItem
          disabled={isLoading}
          onClick={handleDeleteUser}
          className="hover:text-red-500"
        >
          Delete
        </MenuItem>
      </Menu>

      {isOpen && <ViewUser open={isOpen} toggle={onToggle} userID={userID} />}
      {isEditOpen && (
        <EditUser
          open={isEditOpen}
          toggle={onEditToggle}
          userID={userID}
          firstName={firstName}
          lastName={lastName}
          email={email}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default RenderUser;
