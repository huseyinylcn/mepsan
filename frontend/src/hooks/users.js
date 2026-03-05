import { userUpdate, usersAPI, userDelete, userAdd, meApi } from "../api/api";
import { useState, useEffect } from "react";

export function useUsers() {
  ;
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);





  const [users, setUsers] = useState([]);






  const triggerUsersUpdate = (payload) => {
    setLoading2(true);
    userUpdate(payload)
      .then(data => {

        setLoading2(false);
      })
      .catch(() => setLoading(false));
  };


  const triggerUsersDelete = (payload) => {
    setLoading3(true);
    userDelete(payload)
      .then(data => {

        setLoading3(false);
      })
      .catch(() => setLoading(false));
  };



  const triggerAddUser = async (payload) => {
    try {
      const data = await userAdd(payload);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };



  const triggerusers = () => {

    setLoading(true);
    usersAPI()
      .then(data => {

        setUsers(data.result)
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };



  useEffect(() => {
    triggerusers()
  }, []);

  return { loading, users, setUsers, triggerUsersUpdate, loading2, triggerUsersDelete, loading3, triggerAddUser, triggerusers};
}