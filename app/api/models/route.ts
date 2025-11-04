import { NextResponse } from 'next/server'

export async function GET() {
  const models = [
    {
      id: '1',
      name: 'Realistic Vision',
      image:
        'https://images.unsplash.com/photo-1728602855968-046527f0381c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbGlzdGljJTIwdmlzaW9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',
    },
    {
      id: '2',
      name: 'Anime Style',
      image:
        'https://images.unsplash.com/photo-1665042099439-39d93c1117e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEFuaW1lJTIwU3R5bGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
    },
    {
      id: '3',
      name: 'Digital Painting',
      image:
        'https://images.unsplash.com/photo-1515222410484-613a51c43721?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RGlnaXRhbCUyMFBhaW50aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',
    },
    {
      id: '4',
      name: 'Digital Painting',
      image:
        'https://images.unsplash.com/photo-1761839271800-f44070ff0eb9?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500',
    },
    {
      id: '5',
      name: '3D Render',
      image:
        'https://images.unsplash.com/photo-1655499603560-6f834760f8d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fDNEJTIwUmVuZGVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500',
    },
    {
      id: '6',
      name: 'Fantasy Art',
      image:
        'https://media.istockphoto.com/id/500840664/photo/clown.webp?a=1&b=1&s=612x612&w=0&k=20&c=S01pYGLJURF4qS4GDPh2NHp4jobqmb-j50IwsWUHREs=',
    }
  ]

  return NextResponse.json(models)
}
