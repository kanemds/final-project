import React, { useState, useEffect } from "react";
import { api_base } from "config";
function useAccount(props) {
  const [account, setAccount] = useState([]);
  useEffect(() => {
    const fetchaccount = async () => {
      const url = `${api_base}/account`;
      const res = await fetch(url);
      setAccount(await res.json());
    };
    fetchaccount();
  }, []);
  if (account === null) {
    return "Loading...";
  }
  return account ? account : "";
}
export default useAccount;
