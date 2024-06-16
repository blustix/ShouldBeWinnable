import React from 'react'
import Card from '../Components/Card'
import { useTranslation } from 'react-i18next'

const Home = () => {
    const {t} = useTranslation()

    return (
        <div className='bg-slate-500 text-white h-screen'>
            <div className='bg-slate-700 text-white h-fit px-8 py-16'>
            <div className='max-w-2xl w-fit'>
                <div className='grid grid-cols-1 gap-5'>
                    <p className='text-xl'>Matched Betting</p>
                    <h1 className='font-bold text-6xl'> Make Bets, Risk Free</h1>   
                    <p className='text-lg'> Bet both sides and guarantee positive returns </p>
                    <button className='bg-red-500 py-3 px-6 text-lg rounded-md w-fit'>
                        Try Matched Betting
                    </button>
                </div>
            </div>
            </div>  
            
            <div className='px-8 py-16'>
                <h1 className='text-2xl flex justify-center'> How does it work?</h1>
                <div className='grid grid-cols-3 gap-5 '>
                <Card title='What is Matched Betting?' content={t('lorem ipsum')}></Card>
                <Card title='Pog2' content='champ'></Card>
                <Card title='Pog3' content='champ'></Card>
                </div>

            </div>
        </div>
    )
}

export default Home
