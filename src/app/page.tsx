export default function Home() {
  return (  
    <div className='space-y-4 flex flex-col items-center justify-center h-screen w-screen'>
      <div className='text-2xl pb-2 font-bold'>[GENSPO]</div>
      <div className='text-xs max-w-xs text-center'>Virtual shopping and fashion try-on. Upload your own photos. Add clothing from your own closet or the latest collections. Find your new personal style.</div>
      <a 
        href="#" 
        className="flex items-center bg-white border border-[#1d1d1f] rounded-[13px] px-6 p-2 hover:opacity-80 transition-opacity"
      >
        <svg viewBox="0 0 384 512" className="w-5 h-5 mr-2">
          <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
        </svg>
        <div>
          <div className="text-[10px] leading-none">Download on the</div>
          <div className="text-[18px] font-medium leading-tight">App Store</div>
        </div>
      </a>
      <img src="/homegraphic.png" alt="Genspo" className='w-4/5 md:w-1/2 max-w-md'/>
    </div>
  );
}