import React, { useState } from "react";
import { CustomConnectButton } from "../components/CustomConnectButton";
import rocketImage from "../assets/rocket.png";

const WalletConnectModal = () => {

    return (
        <div className="h-screen fixed w-full justify-center" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #E7E7E7 48.38%)' }}>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 max-w-xl md:max-w-4xl xl:max-w-7xl h-full mt-24 justify-items-center" >
                <div className="hidden md:block md:col-span-1 h-1/2 ">
                    <img className="w-full h-full" src={rocketImage} alt="partnershipImage"></img>
                </div>
                <div className="col-span-2 justify-center space-y-28 mt-10">
                    <div className="w-full">
                        <p className="font-bold font-mont text-darkblack text-4xl md:text-6xl items-center text-center leading-tight">
                            Sign in to a new world of Publishing
                        </p>
                    </div>
                    <div className="w-full bg-white rounded-3xl justify-center shadow-[0px_0px_35px_-7px rgba(39, 39, 39, 0.19)]">
                        <div className="px-20 py-5 justify-center justify-items-center">
                            <CustomConnectButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletConnectModal;