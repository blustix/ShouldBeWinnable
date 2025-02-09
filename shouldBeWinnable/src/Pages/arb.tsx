import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress } from '@mui/material';
import sportsField from '../images/sportsfield.jpg';

const ArbitragePage = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArbitrage = async () => {
            try {
                const response = await fetch('http://localhost:8080/arbitrage');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setOpportunities(data);
            } catch (err : any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArbitrage();
    }, []);

    return (
        <div className='bg-slate-700 text-white min-h-screen'>
            {/* Hero Section */}
            <div className='h-fit px-8 py-20 flex' style={{
                backgroundImage: `linear-gradient(to left, rgba(255,255,255,0), rgba(46, 91, 102, 1)), url(${sportsField})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>
                <div className='w-fit'>
                    <div className='grid grid-cols-1 gap-6'>
                        <p className='text-xl'>Arbitrage Calculator</p>
                        <h1 className='font-bold text-7xl'>Find Risk-Free Bets</h1>
                        <p className='text-lg'>Automatically detect guaranteed profit opportunities</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='px-8 py-16 bg-slate-700 h-fit'>
                <h1 className='text-2xl flex justify-center pb-4'>Current Opportunities</h1>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <CircularProgress style={{ color: 'white' }} />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center py-8">{error}</div>
                ) : (
                    <div className='flex flex-col items-center gap-4'>
                        {opportunities.map((opp : {event_id: number, market_type: string, profit_margin : number, 
                        guaranteed_return : number, best_odds: any, stake_allocation: any, total_investment: number}, index) => (
                            <Accordion 
                                key={index}
                                sx={{ 
                                    backgroundColor: 'rgb(30 41 59)',
                                    color: 'white',
                                    border: '1px solid rgb(100 116 139)',
                                    borderRadius: '4px',
                                    width: '80%',
                                    '&.Mui-expanded': { margin: '0' },
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                                    <div className="w-full grid grid-cols-3 md:grid-cols-4 gap-4">
                                        <Typography>{opp.event_id}</Typography>
                                        <Typography className="capitalize">{opp.market_type}</Typography>
                                        <Typography className="text-green-400">
                                            Profit: {opp.profit_margin.toFixed(2)}%
                                        </Typography>
                                        <Typography className="hidden md:block">
                                            Return: ${opp.guaranteed_return.toFixed(2)}
                                        </Typography>
                                    </div>
                                </AccordionSummary>
                                
                                <AccordionDetails>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Odds Breakdown */}
                                        <div>
                                            <Typography variant="h6" className="pb-2">
                                                Best Odds Found:
                                            </Typography>
                                            {Object.entries(opp.best_odds).map(([outcome, details] : [any, any]) => (
                                                <div key={outcome} className="flex justify-between py-1">
                                                    <span className="capitalize">{outcome}:</span>
                                                    <span>
                                                        {details.odds} @ {details.bookmaker}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Stake Allocation */}
                                        <div>
                                            <Typography variant="h6" className="pb-2">
                                                Optimal Stakes (${opp.total_investment} total):
                                            </Typography>
                                            {Object.entries(opp.stake_allocation).map(([outcome, stake] : [any, any]) => (
                                                <div key={outcome} className="flex justify-between py-1">
                                                    <span className="capitalize">{outcome}:</span>
                                                    <span>${stake.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                )}
            </div>

            {/* Explanation Section */}
            <div className='px-8 py-16 bg-slate-800 text-white h-fit'>
                <h1 className='text-2xl flex justify-center pb-4'>How It Works</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <Card 
                        title='What is Arbitrage?'
                        content='Arbitrage betting involves placing multiple bets to cover all possible outcomes, guaranteeing profit regardless of the result.'
                    />
                    <Card 
                        title='How We Calculate'
                        content='We scan multiple bookmakers to find odds discrepancies and calculate optimal stakes for risk-free profits.'
                    />
                    <Card 
                        title='Why It Works'
                        content='Different bookmakers may have varying odds due to market conditions, creating temporary profitable opportunities.'
                    />
                </div>
            </div>
        </div>
    );
};

export default ArbitragePage;