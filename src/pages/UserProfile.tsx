
import React from "react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfile = () => {
  const { user, signOut } = useUser();
  const navigate = useNavigate();

  // Redirect to sign in page if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-realreview-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center md:text-left">
                    <CardTitle className="text-3xl">{user.name}</CardTitle>
                    <p className="text-realreview-gray-500">{user.email}</p>
                    <div className="flex gap-2 mt-4 justify-center md:justify-start">
                      <Button variant="outline">Edit Profile</Button>
                      <Button variant="destructive" onClick={signOut}>Sign Out</Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Tabs defaultValue="properties">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="properties">My Properties</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="properties" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-realreview-gray-500">You haven't uploaded any properties yet.</p>
                    <Button className="mt-4 bg-realreview-teal hover:bg-realreview-teal/90" onClick={() => navigate('/upload')}>
                      Upload a Property
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="favorites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-realreview-gray-500">You haven't favorited any properties yet.</p>
                    <Button className="mt-4 bg-realreview-teal hover:bg-realreview-teal/90" onClick={() => navigate('/')}>
                      Browse Properties
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-realreview-gray-500">You haven't written any reviews yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Email Notifications</h3>
                      <p className="text-realreview-gray-500 text-sm mb-4">Manage the emails you want to receive</p>
                      {/* Settings options would go here */}
                      <p className="text-realreview-gray-500">Settings functionality will be implemented soon.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
