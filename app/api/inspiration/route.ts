import { NextResponse } from 'next/server'

export async function GET() {
  const mockInspirations = [
    {
      id: "1",
      image:
        "https://plus.unsplash.com/premium_photo-1674815482493-ff789ad93073?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEElMjBwYWludGluZyUyMG9mJTIwYSUyMHdvbWFuJTIwd2l0aCUyMGxvbmclMjBoYWlyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      title: "A painting of a woman with long hair",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1759268571522-b7c837811628?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fEFic3RyYWN0JTIwZGlnaXRhbCUyMGFydCUyMHdpdGglMjB2aWJyYW50JTIwY29sb3JzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      title: "Abstract digital art with vibrant colors",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1747499967281-c0c5eec9933c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RnV0dXJpc3RpYyUyMGNpdHlzY2FwZSUyMGF0JTIwbmlnaHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      title: "Futuristic cityscape at night",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1720593445803-8f5b1f0ebcf0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2VyZW5lJTIwbGFuZHNjYXBlJTIwd2l0aCUyMG1vdW50YWluc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      title: "Serene landscape with mountains",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1715737996124-4f73b2a5653a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q29sb3JmdWwlMjBmYW50YXN5JTIwY3JlYXR1cmUlMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      title: "Colorful fantasy creature portrait",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1692696777365-7a70469ebc2c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1pbmltYWxpc3QlMjBnZW9tZXRyaWMlMjBwYXR0ZXJuc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      title: "Minimalist geometric patterns",
    },
  ];

  return NextResponse.json(mockInspirations);
}
