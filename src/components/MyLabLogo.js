import React from "react";

const MyLabLogo=()=>{
    const container={
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    const flow={
        display: 'flex',
        flexDirection: 'column',
       // backgroundColor: "rgb(254, 146, 212)"
    }

    const headerLogo={
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        height:'60%'
    }

    return(
        <div style={container}>
            <div style={headerLogo}>
                <div style={flow}>                  
                    <h2 style={{marginBottom: '0px',backgroundColor: "rgb(254, 120, 212)",paddingTop:'2px',paddingLeft:'2px',paddingRight:'2px',color:'white',marginTop:'17px'}}>MY</h2>
                    <h5 style={{marginTop:'0px',backgroundColor: "rgb(254, 120, 212)",paddingBottom:'2px',paddingLeft:'2px',paddingRight:'2px',color:'white'}}>Myanmar</h5>
                </div>
                <div style={{paddingLeft: '4px'}}>
                    <h2 style={{marginBottom: '0px',marginTop:'17px'}}>LABS</h2>
                    <h5 style={{marginTop:'0px'}}>Healthcare</h5>
                </div>
            </div>
            <div style={{display:'flex',alignItems:'center',marginTop:'0px',height:'20%'}}>
                <p style={{marginTop:'10px',fontSize:'13px'}}>Powered by</p><br></br>
                
            </div>
            <div style={{display:'flex',alignItems:'center',marginTop:'0px',height:'20%',fontFamily:'cursive'}}>
            <p style={{marginTop:'1rem',fontSize:'20px',fontFamily:'monospace'}}>Kan Taw Mon Lab</p>
            </div>
        </div>
    )
}
export default MyLabLogo;