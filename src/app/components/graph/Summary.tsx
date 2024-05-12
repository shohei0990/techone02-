"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAppContext } from "@/context/AppContext"; 



const Summary = () => {
    const { yearMonth, summary, setSummary } = useAppContext(); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/monthly-summary/${yearMonth.year_month}`);
                setSummary(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [yearMonth, setSummary]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data.</div>;
    if (!summary) return <div>No data available.</div>;

    return (
        <div className="flex flex-col aline-center justify-center">
            <div className="title flex aline-center justify-center mb-3"
             style={{fontSize:"14px",fontWeight:"bold"}}>
                サマリー
            </div>
            <div className="Summary"
                style={{ 
                    display: 'flex',
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40vh',
                    width: '40vh',
                    backgroundColor: 'var(--sub10)',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                }}>
                {/*<div 
                    className="summary-title"  
                    style={{ 
                        fontSize: '22px', 
                        padding:'10px 70px',
                        borderBottom: "2px solid var(--sub11)",
                        color:'var(--sub11)',
                        backgroundColor:'var(--sub10)'
                    }}> 
                </div>*/}

                <a style={{ fontSize: '14px', padding:'20px 0px 0px 0px'}}>総利用食数</a>
                <a style={{ fontSize: '40px', padding:'3px 0px 3px 0px'}}>{summary.total_meals} 食</a>
                <a style={{ fontSize: '14px', padding:'20px 0px 0px 0px'}}>総利用人数</a>
                <a style={{ fontSize: '40px', padding:'3px 0px 20px 0px' }}>{summary.total_users} 人</a>
            </div>
        </div>
    );
};

export default Summary 