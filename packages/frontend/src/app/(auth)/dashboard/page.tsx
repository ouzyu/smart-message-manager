'use client';

import { Button } from '@/components/shadcn/button';

export default function Dashboard() {
  return (
    <div>
      <p>hello world !!</p>
      <Button
        onClick={() => {
          console.log('debug');
        }}
      >
        Push me
      </Button>
    </div>
  );
}
