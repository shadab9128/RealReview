
import SearchBar from "@/components/SearchBar";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-realreview-teal/90 to-realreview-sky/90">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center max-w-3xl mb-6 leading-tight">
          Find Your Perfect Location with Real Photos & Reviews
        </h1>
        <p className="text-white/90 text-lg md:text-xl text-center max-w-2xl mb-10">
          Get honest reviews from locals and see real photos of properties, neighborhoods, and facilities
        </p>
        <SearchBar />
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
            <p className="font-bold text-2xl md:text-3xl">5k+</p>
            <p className="text-white/80 text-sm">Properties</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
            <p className="font-bold text-2xl md:text-3xl">10k+</p>
            <p className="text-white/80 text-sm">Users</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
            <p className="font-bold text-2xl md:text-3xl">50k+</p>
            <p className="text-white/80 text-sm">Photos</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
            <p className="font-bold text-2xl md:text-3xl">100+</p>
            <p className="text-white/80 text-sm">Cities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
