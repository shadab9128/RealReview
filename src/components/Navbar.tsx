
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  User, 
  Menu, 
  X, 
  LogOut,
  Heart,
  Settings
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    toast.success("Successfully signed out");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-realreview-teal to-realreview-sky flex items-center justify-center">
            <span className="text-white font-bold text-sm">RR</span>
          </div>
          <span className="font-bold text-xl text-realreview-gray-900">RealReview</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-realreview-gray-700 hover:text-realreview-teal transition-colors">
            Home
          </Link>
          <Link to="/properties" className="text-realreview-gray-700 hover:text-realreview-teal transition-colors">
            Properties
          </Link>
          <Link to="/upload" className="text-realreview-gray-700 hover:text-realreview-teal transition-colors">
            Upload
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <div className="py-6">
                <SearchBar onSearch={() => setIsSearchOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-realreview-teal hover:bg-realreview-teal/90">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full border-b shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-realreview-gray-700 hover:text-realreview-teal transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className="text-realreview-gray-700 hover:text-realreview-teal transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                to="/upload" 
                className="text-realreview-gray-700 hover:text-realreview-teal transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Upload
              </Link>
              <div className="pt-4 flex flex-col space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 py-2">
                      <Avatar>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-realreview-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">Sign In</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-center bg-realreview-teal hover:bg-realreview-teal/90">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
