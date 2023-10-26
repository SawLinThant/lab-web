import React from "react";
import { Business } from "@mui/icons-material";
import { Mail } from "@mui/icons-material";
import Phone from "@mui/icons-material/Phone";

const Contact=()=>{
    const container={
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft:'1rem',
        marginTop:'1rem',
    }
    return(
        <div style={container}>
           <div style={{display:'flex',flexDirection:'row'}}>
              <Business/><p style={{marginTop:'0px',paddingLeft:'3px'}}>Head Off:-No.19/23,Zayyawaddy street/Baho Road,Sanchaung,Yangon,Myanmar</p>
           </div>
           <div style={{display:'flex',flexDirection:'row'}}>
              <Mail/><p style={{marginTop:'0px',paddingLeft:'3px'}}>myanmar@mylabs.care</p>
           </div>
           <div style={{display:'flex',flexDirection:'row'}}>
              <Phone/><p style={{marginTop:'0px',paddingLeft:'3px'}}>09897602060/09892880288</p>
           </div>
        </div>
    )
}
export default Contact;