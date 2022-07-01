import React from 'react'
import './App.css'

function App() {
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
                  View the source code <a href="">here</a>
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
              <div className="buttonWrap">
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