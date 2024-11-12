import { useRecoilState } from "recoil";
import { Button, Dialog, DialogHeader, Typography } from "@material-tailwind/react";
import { Banner } from "../components/Settings/Banner";
import { useState } from "react";

const Settings = () => {
    const [openBannerModal,setOpenBannerModal] = useState(false)

    const openBannerModalHandler = ()=>{
        setOpenBannerModal(previous=>!previous)
    }

  return(
    <div className="mt-16 p-8 w-full h-[calc(100vh-4.5rem)] overflow-y-hidden">
      <Button onClick={openBannerModalHandler} className="capitalize bg-maingreenhvr" variant="filled" >Banner</Button>
      <Dialog open={openBannerModal} handler={openBannerModalHandler} size="xl" className="outline-none">
        
        <Typography variant="h3" className="text-center p-4">
            Choose your favourite banner...
        </Typography>
        
        <Banner/>
      </Dialog>
    </div>
  )
}

export default Settings