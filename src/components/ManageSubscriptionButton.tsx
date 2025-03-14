// components/ManageSubscriptionButton.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  const handlePortalAccess = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/create-portal-link', {
        method: 'POST',
      })
      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error accessing portal:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handlePortalAccess}
      disabled={loading}
      variant="outline"
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </Button>
  )
}