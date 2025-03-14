'use client';

import { useState } from 'react';
import { supabase } from '../utils/supabase/client';
import { track } from '@vercel/analytics';
import { PostgrestError } from '@supabase/supabase-js';

export default function Home() {
  const [gender] = useState<'men' | 'women'>('women');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImage, setCurrentImage] = useState('/input.png');
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const garments = {
    women: [
      { name: 'Sweater', image: '/upper.webp', type: 'upper' },
      { name: 'Jeans', image: '/lower.webp', type: 'lower' },
    ],
    men: [
      { name: 'Suit', image: '/upper.webp', type: 'upper' },
      { name: 'Casual Shirt', image: '/lower.webp', type: 'lower' },
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setSubmitError(null);
    
    try {
      console.log('Attempting to submit email:', email);
      
      // First, let's check if we can query the table
      const { error: checkError } = await supabase
        .from('beta_signups')
        .select('count')
        .limit(1);
      
      if (checkError) {
        console.error('Error checking table:', checkError);
        throw new Error(`Table check failed: ${checkError.message}`);
      }

      // If we can query, try to insert
      const { error, data } = await supabase
        .from('beta_signups')
        .insert([
          { 
            email,
            contacted: false 
          }
        ])
        .select();

      console.log('Supabase response:', { error, data });

      if (error) {
        console.error('Supabase error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        if (error.code === '23505') {  // unique violation
          track('beta_signup_duplicate', { email });
          throw new Error('This email has already been registered for the beta.');
        }
        if (error.code === '42P01') {  // undefined_table
          track('beta_signup_error', { error: error.message });
          throw new Error('System error: Database table not found. Please contact support.');
        }
        throw error;
      }
      
      console.log('Email submitted successfully');
      track('beta_signup_success', { email });
      setSubmitStatus('submitted');
      
      // Close modal after showing success
      setTimeout(() => {
        setShowModal(false);
        setEmail('');
        setSubmitStatus('idle');
      }, 1000);
    } catch (error: unknown) {
      console.error('Full error details:', error);
      const errorMessage = error instanceof Error ? error.message : 
        (error as PostgrestError)?.message || 'Failed to submit. Please try again.';
      track('beta_signup_error', { error: errorMessage });
      setSubmitError(errorMessage);
      setSubmitStatus('idle');
    }
  };

  const handleTryOn = () => {
    setIsAnimating(true);
    track('try_on_started', { gender });
    // Simulate AI processing
    setTimeout(() => {
      setIsAnimating(false);
      const newImage = '/output.png';
      setCurrentImage(newImage);
      track('try_on_completed', { gender, newImage });
    }, 2000);
  };

  return (
    <div className="p-2 w-screen h-screen flex justify-center">
      <div className='gap-4 max-w-[430px] w-full h-[100dvh] bg-white flex flex-col overflow-hidden relative'>
        {/* Fixed Header */}
        <div className="sticky top-4 z-10 bg-white">
          <div className='border border-black p-2 text-xl font-serif leading-tight'>
            Genspo is an <span className="font-bold">AI fashion try-on</span> app to visualize yourself in any outfit you can imagine.
            <span className='px-1.5 ml-2 text-base bg-lime-200 rounded-xl font-bold uppercase'>
              $19.99/month
            </span>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className='hover:opacity-80 h-12 w-full bg-pink-500 text-white font-medium tracking-wider text-xs uppercase border-l border-r border-b border-black'
          >
            Join Beta
          </button>
        </div>
        
        {/* Flexible Image Section */}
        <div className="flex-1 flex items-center justify-center border border-stone-200 border-y overflow-hidden">
          <img 
            src={currentImage} 
            alt="Model" 
            className={`w-full h-full object-contain transition-all duration-500 ${
              isAnimating ? 'scale-105 blur-sm' : ''
            }`}
          />
        </div>
        
        {/* Fixed Controls Section */}
        <div className="sticky bottom-4 bg-white border border-black">
          <div className="p-3 flex flex-col gap-2">
            <div className='grid grid-cols-2 gap-1.5'>
              {garments[gender].map((garment, index) => (
                <div 
                  key={index} 
                  className={`relative aspect-square w-full overflow-hidden cursor-pointer transition-all`}
                >
                  <img 
                    src={garment.image} 
                    alt={garment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-0.5 text-center">
                    {garment.type === 'upper' ? 'Upper' : 'Lower'}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={handleTryOn}
              disabled={isAnimating}
              className='border border-black bg-white w-full text-black p-1.5 rounded-full hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm'
            >
              {isAnimating ? '...' : 'Generate'}
            </button>
          </div>
        </div>

        {/* Email Signup Modal */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => submitStatus === 'idle' && setShowModal(false)}
          >
            <div 
              className="bg-white p-4 border border-black w-[90%] max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-serif mb-4">Join the Beta</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={submitStatus !== 'idle'}
                  className="border border-black p-2"
                />
                {submitError && (
                  <p className="text-red-500 text-sm">{submitError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={submitStatus !== 'idle'}
                    className="flex-1 bg-pink-500 text-white p-2 border border-black hover:opacity-80 transition-opacity disabled:opacity-50"
                  >
                    {submitStatus === 'idle' && 'Submit'}
                    {submitStatus === 'submitting' && 'Submitting...'}
                    {submitStatus === 'submitted' && 'Submitted!'}
                  </button>
                  {submitStatus === 'idle' && (
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 border border-black p-2 hover:bg-black hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}