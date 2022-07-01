import React from 'react'
import { ethers } from "ethers";
import './App.css'

function App() {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
 const wave = () => {
    
  }
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
                  waiting on hardhat
                </div>
              </div>
              <div className="buttonWrap"  onClick={null}>
                <input type="button" value="Click to Wave👋" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App