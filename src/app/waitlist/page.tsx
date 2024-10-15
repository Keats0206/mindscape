"use client"

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button";
const WaitlistPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus({ type: '', message: '' });
  
      try {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .insert([{ email }]);
  
        if (error) throw error;
  
        setSubmitStatus({ type: 'success', message: 'Thank you for subscribing!' });
        setEmail('');
      } catch (error) {
        setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 mb-48">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Join waitlist
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
  
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </div>
          </form>
  
          {submitStatus.message && (
            <div className={`mt-4 text-center ${submitStatus.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {submitStatus.message}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default WaitlistPage;