"use client"
import React from 'react'
import Navbar from '@/components/Navbar'
import { Calendar } from '@/components/ui/calendar'
import TiltedCard from '@/components/Components/TiltedCard/TiltedCard'

const Home = () => {
    const [date, setDate] = React.useState(new Date())
    return (
         <div className="flex flex-col min-h-screen w-full">
      {/* Header / Navbar placeholder */}
      <div className='w-screen flex items-center justify-center'>
       <Navbar /> 
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
        <div className="flex items-center justify-center bg-amber-700 p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-[40vw] rounded-lg border"
          />
        </div>

        <div className="h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-100 p-4">
          <TiltedCard className='bg-blue-600' imageSrc={'holi.webp'} captionText='holi' overlayContent={'holi'} rotateAmplitude={10}>
            hello
          </TiltedCard>
          <TiltedCard className='bg-blue-600' imageSrc={'holi.webp'} captionText='holi' overlayContent={'holi'}>
            hello
          </TiltedCard>
          <TiltedCard className='bg-blue-600' imageSrc={'holi.webp'} captionText='holi' overlayContent={'holi'}>
            hello
          </TiltedCard>
          <TiltedCard className='bg-blue-600' imageSrc={'holi.webp'} captionText='holi' overlayContent={'holi'}>
            hello
          </TiltedCard>
          <TiltedCard className='bg-blue-600' imageSrc={'holi.webp'} captionText='holi' overlayContent={'holi'}>
            hello
          </TiltedCard>
          <TiltedCard className='bg-blue-600' imageSrc={'holi.webp'} captionText='holi' overlayContent={'holi'}>
            hello
          </TiltedCard>
          <TiltedCard className='bg-blue-600' imageSrc={'holi.webp'} captionText='holi' overlayContent={'holi'}>
            hello
          </TiltedCard>
        </div>
      </div>
    </div>
    )
}

export default Home
