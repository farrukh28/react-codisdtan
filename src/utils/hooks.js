import { useSelector } from "react-redux";

export const useReduxUser = () => useSelector((state) => state.authUser.user);
