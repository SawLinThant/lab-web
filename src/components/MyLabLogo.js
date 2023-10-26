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
                    <h1 style={{marginBottom: '0px',backgroundColor: "rgb(254, 120, 212)",paddingTop:'2px',paddingLeft:'2px',paddingRight:'2px',color:'white'}}>MY</h1>
                    <h4 style={{marginTop:'0px',backgroundColor: "rgb(254, 120, 212)",paddingBottom:'2px',paddingLeft:'2px',paddingRight:'2px',color:'white'}}>Myanmar</h4>
                </div>
                <div style={{paddingLeft: '4px'}}>
                    <h1 style={{marginBottom: '0px'}}>LABS</h1>
                    <h4 style={{marginTop:'0px'}}>Healthcare</h4>
                </div>
            </div>
            <div style={{display:'flex',alignItems:'center',marginTop:'0px',height:'20%'}}>
                <p style={{marginTop:'0.5rem'}}>Powered by</p><br></br>
                
            </div>
            <div style={{display:'flex',alignItems:'center',marginTop:'0px',height:'20%',fontFamily:'cursive'}}>
            <p style={{marginTop:'1rem',fontSize:'1.5rem',fontFamily:'monospace'}}>Kan Taw Mon Lab</p>
            </div>
        </div>
    )
}
export default MyLabLogo;