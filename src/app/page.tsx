"use client"

import styles from './page.module.scss'
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import {
    generation1, 
    generation2, 
    generation3, 
    generation4, 
    generation5, 
    generation6, 
    generation7, 
    generation8
} from '@/data/images'
import WordRotate from "@/components/ui/word-rotate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Libre_Baskerville } from 'next/font/google'

const displayFont = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start: number, target: number, amount: number) => start * (1 - amount) +target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`})

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;
    
    if(xForce != 0 || yForce != 0){
      requestAnimationFrame(animate);
    }
    else{
      cancelAnimationFrame(requestAnimationFrameId as number)
      requestAnimationFrameId = null;
    }
  }

  return (
    <main onMouseMove={(e) => {manageMouseMove(e as React.MouseEvent<HTMLDivElement>)}} className={styles.main}>
      <div ref={plane1} className={styles.plane}>
          <Image 
            src={generation1}
            alt='image'
            width={300}
          />
           <Image 
            src={generation2}
            alt='image'
            width={300}
          />
          <Image 
            src={generation3}
            alt='image'
            width={225}
          />
      </div>
      <div ref={plane2} className={styles.plane}>
          <Image 
            src={generation4}
            alt='image'
            width={250}
          />
           <Image 
            src={generation6}
            alt='image'
            width={200}
          />
          <Image 
            src={generation8}
            alt='image'
            width={225}
          />
      </div>
      <div ref={plane3} className={styles.plane}>
          <Image 
            src={generation7}
            alt='image'
            width={150}
          />
           <Image 
            src={generation5}
            alt='image'
            width={200}
          />
      </div>
      <div className={displayFont.className}>
        <div className='z-50 w-screen h-screen flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center mb-12'>
            <div className=' z-50 text-6xl font-medium max-w-[700px] text-center'>Dream up your next</div>
            <WordRotate
              className={`text-center text-6xl pb-2 font-medium`}
              words={["outfit idea", "tattoo concept", "nail desin"]}
            />          
          <RainbowButton className='text-sm'>Join Beta</RainbowButton>;
          </div>
        </div>
      </div>
    </main>
  )
}