import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllUsers = (page, limit) => {
  return axios.get("/users", {
    params: {
      page,
      limit,
    },
  });
};

export const useUsersData = (page = 0, limit = 10) => {
  page = ++page;
  return useQuery({
    queryKey: ["get-all-users", page, limit],
    queryFn: () => fetchAllUsers(page, limit),
    refetchOnWindowFocus: false,
  });
};

const fetchUserByID = (userID) => {
  return axios.get(`/users/${userID}`, {});
};

export const useUserData = (userID = null) => {
  return useQuery({
    queryKey: ["get-user-data", userID],
    queryFn: () => fetchUserByID(userID),
    refetchOnWindowFocus: false,
    enabled: !!userID,
  });
};
