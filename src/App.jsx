import React from 'react'
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [totalWaves, setTotalWaves] = useState(0)
  const contractAddress = "0x1F0959EC5bD06A74fd059b2B5621b84EB71Bd5Bf";
  /**
   * Create a variable here that references the abi content!
   */
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.wave("this is a message", { gasLimit: 300000 })
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count)
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getAllWaves = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const waves = await wavePortalContract.getAllWaves();

        const wavesCleaned = waves.map(wave => {
          return {
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          };
        });

        setAllWaves(wavesCleaned);
        setTotalWaves(await wavePortalContract.getTotalWaves())
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Listen in for emitter events!
   */
  useEffect(() => {
    checkIfWalletIsConnected();
    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves(prevState => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, [])
  return (
    <>
      <div className="hero">
        <div className="wraper">
          <div className="sectionText">
            <div className="sectionTextwrap">
              <div className="mainText">
                <h1 style={{display: 'inline',}}>
                  React </h1>
                <span>🚀</span> <br />
              <h1>Web3 Project
                </h1>
              </div>
              <div className="subText">
                <p>
                  Hi, this is my first buildspace project. <br />
                  View the source code <a href="https://github.com/PickachuCODE/react-solidity">here</a>
                </p>
              </div>
            </div>
          </div>
          <div className="feedSection">
            <div className="feedwrap">
              <div className="feedBox">
                <div className="box">
                  {allWaves.map((wave, index) => {
                    return (
                      <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
                        <div>Address: {wave.address}</div>
                        <div>Time: {wave.timestamp.toString()}</div>
                        <div>Message: {wave.message}</div>
                      </div>)
                  })}
                </div>
              </div>
              <div style={{display:'flex'}} className="buttonWrap"  onClick={wave}>
                {/*
        * If there is no currentAccount render this button
        */}
                {!currentAccount && (
                  <input style={{ display: 'block', marginRight: '50px' }} type="button" value="Connect Wallet" className="waveButton" onClick={connectWallet} />
                )}
                <input style={{ display: 'block' }} type="button" value={`${ totalWaves } waves: Click to Wave👋`} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App