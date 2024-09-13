import React, { useEffect, useState } from 'react';
import './covid.css';

const Covid = () => {
    const [data, setData] = useState({});
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        getCovidData();
    }, []);

    const getCovidData = async () => {
        try {
            const res = await import("./data.json");
            const actualData = res.statewise;
            console.log("res",actualData[0])
            setData(actualData[0]); 
            setStates(actualData.slice(1)); 
            setSelectedState(actualData[1]?.state); 
        } catch (err) {
            console.log("error", err);
        }
    }

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        const stateData = states.find(state => state.state === selectedState);
        if (stateData) {
            setData(stateData);
        }
        setSelectedState(selectedState);
    }

    return (
        <>
            <section>
                <center>
                    <div className='mainContext'>
                        <h2>🔴 Live</h2>
                        <div className="container">
                            <span className="text1">Wear Mask. Stay Safe.</span>
                            <span className="text2">
                                <h1 style={{marginBottom: "0", paddingTop: "53px"}}>
                                    Covid-19 Tracker
                                </h1>
                            </span>
                        </div>
                    </div>
                </center>

                <ul>
                    <li className='card'>
                        <div className='main_card'>
                            <div className='inner_card name'>
                                <p className='card_header'> <h3>STATE </h3></p>
                                <p className='card_data'>
                                    <div className="state-dropdown">
                                        <select value={selectedState} onChange={handleStateChange}>
                                            {states.map((state, index) => (
                                                <option key={index} value={state.state}>{state.state}</option>
                                            ))}
                                        </select>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </li>
                    <div className='dataResult'>
                        <li className='card'>
                            <div className='main_card'>
                                <div className='inner_card recovered'>
                                    <p className='card_header'> Total <h3>RECOVERED </h3></p>
                                    <p className='card_data'> {data.recovered} </p>
                                </div>
                            </div>
                        </li>
                        <li className='card'>
                            <div className='main_card'>
                                <div className='inner_card confirmed'>
                                    <p className='card_header'> Total <h3>CONFIRMED </h3></p>
                                    <p className='card_data'> {data.confirmed} </p>
                                </div>
                            </div>
                        </li>
                        <li className='card'>
                            <div className='main_card'>
                                <div className='inner_card death'>
                                    <p className='card_header'> Total <h3>DEATH CASES </h3></p>
                                    <p className='card_data'> {data.deaths} </p>
                                </div>
                            </div>
                        </li>
                        <li className='card'>
                            <div className='main_card'>
                                <div className='inner_card active'>
                                    <p className='card_header'> Total <h3>ACTIVE CASES</h3></p>
                                    <p className='card_data'> {data.active} </p>
                                </div>
                            </div>
                        </li>
                        <li className='card'>
                            <div className='main_card'>
                                <div className='inner_card updated'>
                                    <p className='card_header'> Last <h3>UPDATED on </h3></p>
                                    <p className='card_data'> {data.lastupdatedtime} </p>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </section>
        </>
    )
}

export default Covid;
