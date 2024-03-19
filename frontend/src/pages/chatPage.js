// import React       from 'react';
// // import {useState}  from "react";
// // import axios       from 'axios';
// // import {useEffect} from 'react';
// const Chatpage = () => {
// //     const[chats,setChats]=useState([]);
// //     const fetchChats=async()=>{
// //         const {data} =await axios.get('/api/chats');
// //         //console.log(data);
// //         setChats(data);
// //     };
// //     useEffect(()=>{
// //            fetchChats();
// //     },[]);
// // return (
// //     <div>
// //       CHAT PAGE//{chats.map((chat=><div key={chat._id}>{chat.chatName}</div>))}
// //     </div>
// // )
// // }
// return (
//     <div>
//       CHAT PAGE
//     </div>
// )
// }
// export default Chatpage

import { Box, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/others/chatBox";
import MyChats from "../components/others/myChats";
import SideDrawer from "../components/miscellaneous/sideDrawer";
import { ChatState } from "../context/chatProvider";
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
        color="white"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};
export default Chatpage;
