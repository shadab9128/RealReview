
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch?: () => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    // In a real app, you would redirect to search results page
    console.log("Searching for:", searchValue);
    toast.success(`Searching for "${searchValue}"`);
    
    // This is a mock implementation
    // In a real application, you would navigate to a search results page
    // navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    
    // Close the search dialog if provided
    if (onSearch) {
      onSearch();
    }
    
    // For demo purposes, let's simulate search by redirecting to home page
    // with a delay to show the toast
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search locations, properties, facilities..."
          className="w-full pr-36 h-14 text-base rounded-full shadow-md border-realreview-gray-200 focus:border-realreview-teal"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          autoFocus
        />
        <Button 
          type="submit"
          className="absolute right-0 top-0 h-14 px-6 bg-realreview-teal hover:bg-realreview-teal/90 rounded-r-full"
        >
          <Search className="h-5 w-5 mr-2" />
          <span>Search</span>
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
