import React, { useState, useEffect } from 'react';
//import { ethers } from 'ethers';
import CromoMarket from './contracts/CromoMarket.json';

const marketAddress = '0x265d37eB5f8D9998cBA2E83Ba0C0Da6E9C5431f8';
//const provider = new ethers.JsonRpcProvider();
const ethers = require("ethers");
const provider = new ethers.BrowserProvider(window.ethereum);

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [cromos, setCromos] = useState([]);
  const [selectedCromo, setSelectedCromo] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const marketContract = new ethers.Contract(marketAddress, CromoMarket.abi, signer);
        setProvider(provider);
        setSigner(signer);
        setMarketContract(marketContract);

        const cromoCount = await marketContract.nextCromoId();
        const cromoList = [];
        for (let i = 0; i < cromoCount; i++) {
          const cromo = await marketContract.getCromo(i);
          cromoList.push(cromo);
        }
        setCromos(cromoList);
      } else {
        console.error("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const handleBuyCromo = async (cromoId) => {
    const cromo = await marketContract.getCromo(cromoId);
    const price = ethers.utils.parseUnits(cromo.price.toString(), 'ether');
    const tx = await marketContract.buyCromo(cromoId, { value: price });
    await tx.wait();
    alert('Cromo purchased successfully');
  };

  return (
    <div className="App">
      <h1>Cromo Marketplace</h1>
      <div>
        {cromos.map((cromo) => (
          <div key={cromo.id}>
            <h3>{cromo.name}</h3>
            <p>Price: {ethers.utils.formatUnits(cromo.price, 'ether')} Yoppen</p>
            {cromo.owner === ethers.constants.AddressZero ? (
              <button onClick={() => handleBuyCromo(cromo.id)}>Buy</button>
            ) : (
              <p>Owned by: {cromo.owner}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
