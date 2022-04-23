import React from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import Nexrad from "./nexrad";
import NASA from "./nasa";
import UserHistory from "./UserHistory";
import { withRouter } from "react-router-dom";

const useStyles = {
  rightAlign: {
    marginLeft: "auto",
  },
};

const LaunchTabs = (props) => {
  const { match, history } = props;
  const { params } = match;

  const tabNameToIndex = {
    0: "NASA",
    1: "Nexrad",
    2: "UserHistory",
  };

  const indexToTabName = {
    NASA: 0,
    Nexrad: 1,
    UserHistory: 2,
  };
  //   const getuserID = () =>{
  //     let params = new URLSearchParams(document.location.search);
  //     let userid = params.get("userid");
  //     setuserID(userid);
  //   }
  //   React.useEffect(() => {
  //             getuserID();
  //         },[]);
  const [selectedTab, setSelectedTab] = React.useState(indexToTabName["NASA"]);
  const [userID, setuserID] = React.useState("");

  // console.log("props in tabs")
  // console.log(props.location.state)
  const handleChange = (event, newValue) => {
    let tabchangeURL = `/tabs/${tabNameToIndex[newValue]}`;

    tabchangeURL = tabchangeURL;
    // console.log(tabchangeURL)
    props.history.push(tabchangeURL, { ...props.location.state });
    // history.push(tabchangeURL);
    // console.log(props)
    setSelectedTab(newValue);
  };

  return (
    <>
      <div>
        <AppBar>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="NASA" />
            <Tab label="Nexrad" />
            <Tab label="History" />
          </Tabs>
        </AppBar>
      </div>
      <div class="container mt-2">
        {selectedTab === 0 && <NASA />}
        {selectedTab === 1 && <Nexrad />}
        {selectedTab === 2 && <UserHistory />}
      </div>
    </>
  );
};

export default withRouter(LaunchTabs);
