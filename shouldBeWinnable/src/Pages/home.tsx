import React from 'react'
import Card from '../Components/Card'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import stockChart from '../images/stockchart.jpg'

const Home = () => {
    const { t } = useTranslation()

    const steps = [
        { title: t('step1.title'), content: t('step1.content') },
        { title: 'Step 2: Use Should Be Winnable to find the best bets', content: 'Here you can put more information about this step.' },
        { title: 'Step 3: Place your bets', content: 'Here you can put more information about this step.'},
        { title: 'Step 4: Enjoy your winnings', content: 'Here you can put more information about this step.'}
    ];  

    return (
        <div className='bg-slate-700 text-white h-screen'>
            <div className='text-white h-fit px-8 py-20 flex' style={{
                backgroundImage: `linear-gradient(to left, rgba(255,255,255,0), rgba(46, 91, 102, 1)), url(${stockChart})`, backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>
                <div className=' w-fit'>
                    <div className='grid grid-cols-1 gap-6'>
                        <p className='text-xl'>Matched Betting</p>
                        <h1 className='font-bold text-7xl'> Make Bets, Risk Free</h1>
                        <p className='text-lg'> Bet both sides and guarantee positive returns </p>
                        <button className='bg-red-500 py-3 px-6 text-lg rounded-md w-fit'>
                            Try Matched Betting
                        </button>
                    </div>
                </div>
            </div>

            <div className='px-8 py-16 bg-slate-700 h-fit'>
                <h1 className='text-2xl flex justify-center pb-4'> How does it work?</h1>
                <div className='grid grid-cols-3 gap-5 '>
                    <Card title='What is Matched Betting?' content={t('what is matched')}></Card>
                    <Card title='Can you Give an Example?' content={t('matched bet example')}></Card>
                    <Card title='What do you Offer?' content={t('what do you offer')}></Card>
                </div>
            </div>
            <div className='px-8 py-16 bg-slate-800 text-white h-fit'>
                <h1 className='text-2xl flex justify-center pb-4'> How do I Start? </h1>
                <div className='flex flex-col items-center'>
                    {steps.map((step, index) => (
                        <Accordion key={index} 
                        sx={{ backgroundColor: 'rgb(30 41 59)', 
                            color: 'white', 
                            borderTopColor: 'slategrey', 
                            borderBottomColor:'slategrey',
                            borderTopWidth: '1px',
                            borderBottomWidth: '1px',
                            borderRadius: '0px',
                            width: '70%',
                            '&.Mui-expanded': {
                                margin: '0',
                            },
                            }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}  />}>
                                <Typography sx ={{ textAlign: 'left', width: '100%' }}>{step.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Typography>{step.content}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
