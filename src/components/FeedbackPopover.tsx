// components/FeedbackPopover.tsx
"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function FeedbackPopover({ userEmail }: { userEmail: string | undefined }) {
  const [message, setMessage] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendFeedback = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, userEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to send feedback');
      }

      setShowPopover(false);
      setMessage('');
      // You might want to show a success toast here
    } catch (error) {
      console.error('Error sending feedback:', error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button variant="outline" onClick={() => setShowPopover(true)}>
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 ml-24">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium">What can we do better?</p>
          <div className="flex flex-col gap-2">
            <Textarea
              id="message"
              placeholder="I'd love a feature to..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-2 h-24"
              disabled={isLoading}
            />
          </div>
          <Button 
            size="sm" 
            className="w-24" 
            onClick={handleSendFeedback}
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}