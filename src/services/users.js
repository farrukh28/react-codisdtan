import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const fetchAllUsers = (page, limit, sort, q) => {
  return axios.get("/users", {
    params: {
      page,
      limit,
      sort,
      q,
    },
  });
};

export const useUsersData = (page = 0, limit = 10, sort = "", q = "") => {
  page = ++page;
  return useQuery({
    queryKey: ["get-all-users", page, limit, sort, q],
    queryFn: () => fetchAllUsers(page, limit, sort, q),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
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
