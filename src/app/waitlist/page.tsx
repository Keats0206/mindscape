"use client"

"use client"

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from 'next/dynamic';
import { ImageItem } from '@/components/ui/image-cloud';

const ImageCloud = dynamic(() => import('@/components/ui/image-cloud'), { ssr: false });

const WaitlistPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: string; message: string }>({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log(email);

      const { data, error } = await supabase
        .from('waitlist_emails')
        .insert({ email })
        .select();

      if (error) {
        throw error;
      }

      console.log(data);

      setSubmitStatus({ type: 'success', message: 'Thank you for subscribing!' });
      setEmail('');
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const images: ImageItem[] = [
    { src: '/generation_1.png', alt: 'Image 1' },
    { src: '/generation_2.png', alt: 'Image 2' },
    { src: '/generation_3.png', alt: 'Image 3' },
    { src: '/generation_4.png', alt: 'Image 4' },
    { src: '/generation_5.png', alt: 'Image 5' },
    { src: '/generation_6.png', alt: 'Image 6' },
    { src: '/generation_7.png', alt: 'Image 7' },
    { src: '/generation_8.png', alt: 'Image 8' },
  ];

  return (
    <div className="w-screen absolute top-0 z-10 min-h-screen flex justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="z-30 max-w-md w-full space-y-8">
        <div className='w-full h-96'>   
          <ImageCloud images={images}/>
        </div>    
        <div>
          <h2 className="text-center text-3xl font-extrabold text-foreground">
            Join Waitlist
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email-address" className="sr-only">
              Email address
            </Label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white'
            />
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </div>
        </form>

        {submitStatus.message && (
          <div
            className={`mt-4 text-center ${
              submitStatus.type === 'error' ? 'text-destructive' : 'text-success'
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistPage;