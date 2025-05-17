
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Check, X, Eye } from "lucide-react";
import { toast } from "sonner";

// Mock data for pending approvals
const pendingSubmissions = [
  {
    id: "p1",
    title: "Modern Apartment",
    location: "Manhattan, New York",
    submittedBy: "user123",
    submittedDate: "2023-10-15",
    status: "pending"
  },
  {
    id: "p2",
    title: "Suburban House",
    location: "Brooklyn, New York",
    submittedBy: "user456",
    submittedDate: "2023-10-14",
    status: "pending"
  },
  {
    id: "p3",
    title: "Riverside Condo",
    location: "Chicago, Illinois",
    submittedBy: "user789",
    submittedDate: "2023-10-13",
    status: "pending"
  }
];

// Mock data for approved properties
const approvedProperties = [
  {
    id: "a1",
    title: "Luxury Villa",
    location: "Miami, Florida",
    submittedBy: "user123",
    approvedDate: "2023-10-10",
    views: 245
  },
  {
    id: "a2",
    title: "Downtown Loft",
    location: "San Francisco, California",
    submittedBy: "user456",
    approvedDate: "2023-10-08",
    views: 189
  }
];

// Mock data for property statistics
const statistics = {
  totalProperties: 125,
  pendingApproval: 3,
  approved: 112,
  rejected: 10,
  totalViews: 12580,
  totalReviews: 438
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pendingItems, setPendingItems] = useState(pendingSubmissions);
  const [approvedItems, setApprovedItems] = useState(approvedProperties);

  // Handle approve action
  const handleApprove = (id: string) => {
    const itemToApprove = pendingItems.find(item => item.id === id);
    if (!itemToApprove) return;

    // Remove from pending
    setPendingItems(pendingItems.filter(item => item.id !== id));
    
    // Add to approved with current date and 0 views
    setApprovedItems([
      ...approvedItems,
      {
        ...itemToApprove,
        approvedDate: new Date().toISOString().split('T')[0],
        views: 0
      }
    ]);

    toast.success(`${itemToApprove.title} has been approved`);
  };

  // Handle reject action
  const handleReject = (id: string) => {
    const itemToReject = pendingItems.find(item => item.id === id);
    if (!itemToReject) return;

    // Remove from pending
    setPendingItems(pendingItems.filter(item => item.id !== id));
    
    toast.success(`${itemToReject.title} has been rejected`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-realreview-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-realreview-gray-500 mb-8">
            Manage property submissions, reviews, and site content
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="approved">Approved Properties</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{statistics.totalProperties}</div>
                    <p className="text-realreview-gray-500 text-sm">
                      {statistics.pendingApproval} pending approval
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{statistics.totalViews.toLocaleString()}</div>
                    <p className="text-realreview-gray-500 text-sm">
                      Across all properties
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{statistics.totalReviews}</div>
                    <p className="text-realreview-gray-500 text-sm">
                      From {Math.floor(statistics.totalReviews / 3)} users
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-realreview-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">New property submission</p>
                        <p className="text-sm text-realreview-gray-500">Modern Apartment in Manhattan</p>
                      </div>
                      <span className="text-sm text-realreview-gray-500">10 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-realreview-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">New review</p>
                        <p className="text-sm text-realreview-gray-500">For "Luxury Villa" in Miami</p>
                      </div>
                      <span className="text-sm text-realreview-gray-500">1 hour ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-realreview-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Property approved</p>
                        <p className="text-sm text-realreview-gray-500">Downtown Loft in San Francisco</p>
                      </div>
                      <span className="text-sm text-realreview-gray-500">3 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approval</CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingItems.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Submitted By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.submittedBy}</TableCell>
                            <TableCell>{item.submittedDate}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 px-2"
                                  onClick={() => toast.info("Viewing property details")}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50" 
                                  onClick={() => handleApprove(item.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleReject(item.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-realreview-gray-500">No pending submissions</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approved">
              <Card>
                <CardHeader>
                  <CardTitle>Approved Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Approved Date</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{item.submittedBy}</TableCell>
                          <TableCell>{item.approvedDate}</TableCell>
                          <TableCell className="text-right">{item.views}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
