"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  Target,
  Mail,
  ShoppingCart,
  BarChart3,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react"

interface Segment {
  id: string
  name: string
  ruleSet: string
  audienceSize: number
  createdBy: string
}

interface Campaign {
  id: string
  name: string
  segment: string
  messageTemplate: string
  status: string
  sent: number
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalSpent: string
  visits: number
  lastActive: string
}

export default function Home() {
  // IMPORTANT: Set initial state to "signup" to start with create account page
  const [currentView, setCurrentView] = useState<"signup" | "signin" | "dashboard">("signup")
  const [userName, setUserName] = useState("")
  const [segments, setSegments] = useState<Segment[]>([
    { id: "1", name: "High Value Customers", ruleSet: "Total spent > $1000", audienceSize: 342, createdBy: "Admin" },
    {
      id: "2",
      name: "Recent Visitors",
      ruleSet: "Last active < 7 days",
      audienceSize: 1205,
      createdBy: "Marketing Team",
    },
    { id: "3", name: "Frequent Buyers", ruleSet: "Visits > 10", audienceSize: 567, createdBy: "Sales Team" },
    { id: "4", name: "New Customers", ruleSet: "Created < 30 days", audienceSize: 89, createdBy: "Admin" },
  ])
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Summer Sale 2024",
      segment: "High Value Customers",
      messageTemplate: "Get 20% off on all items!",
      status: "Active",
      sent: 342,
    },
    {
      id: "2",
      name: "Welcome Series",
      segment: "New Customers",
      messageTemplate: "Welcome to our store! Here's 10% off...",
      status: "Scheduled",
      sent: 0,
    },
    {
      id: "3",
      name: "Re-engagement Campaign",
      segment: "Recent Visitors",
      messageTemplate: "We miss you! Come back for exclusive deals",
      status: "Completed",
      sent: 1205,
    },
    {
      id: "4",
      name: "VIP Exclusive",
      segment: "Frequent Buyers",
      messageTemplate: "Exclusive VIP access to new products",
      status: "Draft",
      sent: 0,
    },
  ])
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1-555-0123",
      totalSpent: "$2,450",
      visits: 12,
      lastActive: "2 days ago",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1-555-0124",
      totalSpent: "$1,890",
      visits: 8,
      lastActive: "1 week ago",
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike@example.com",
      phone: "+1-555-0125",
      totalSpent: "$3,200",
      visits: 15,
      lastActive: "Today",
    },
    {
      id: "4",
      name: "Lisa Wilson",
      email: "lisa@example.com",
      phone: "+1-555-0126",
      totalSpent: "$980",
      visits: 5,
      lastActive: "3 days ago",
    },
    {
      id: "5",
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "+1-555-0127",
      totalSpent: "$5,670",
      visits: 22,
      lastActive: "Yesterday",
    },
    {
      id: "6",
      name: "Emma Taylor",
      email: "emma@example.com",
      phone: "+1-555-0128",
      totalSpent: "$1,340",
      visits: 7,
      lastActive: "5 days ago",
    },
  ])

  // Add Segment Function
  const addSegment = (segmentData: { name: string; ruleSet: string }) => {
    const newSegment: Segment = {
      id: Date.now().toString(),
      name: segmentData.name,
      ruleSet: segmentData.ruleSet,
      audienceSize: Math.floor(Math.random() * 1000) + 50, // Random audience size for demo
      createdBy: userName || "User",
    }
    setSegments([...segments, newSegment])
  }

  // Add Campaign Function
  const addCampaign = (campaignData: { name: string; segment: string; messageTemplate: string }) => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: campaignData.name,
      segment: campaignData.segment,
      messageTemplate: campaignData.messageTemplate,
      status: "Draft",
      sent: 0,
    }
    setCampaigns([...campaigns, newCampaign])
  }

  // Add Customer Function
  const addCustomer = (customerData: { name: string; email: string; phone: string }) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      totalSpent: "$0",
      visits: 0,
      lastActive: "Just joined",
    }
    setCustomers([...customers, newCustomer])
  }

  // Create Account Form
  if (currentView === "signup") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Enter your information to create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                setUserName(formData.get("name") as string)
                setCurrentView("signin")
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Sign In Form
  if (currentView === "signin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your CRM</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setCurrentView("dashboard")
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign In to CRM
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // CRM Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
            <Badge variant="secondary">Pro</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {userName || "User"}</span>
            <Button onClick={() => setCurrentView("signup")} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaigns.filter((c) => c.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">
                {campaigns.filter((c) => c.status === "Scheduled").length} scheduled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89,432</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Segments</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{segments.length}</div>
              <p className="text-xs text-muted-foreground">Total segments created</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Customer Management</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Customer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Customer</DialogTitle>
                      <DialogDescription>Enter customer information to add them to your CRM.</DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        addCustomer({
                          name: formData.get("name") as string,
                          email: formData.get("email") as string,
                          phone: formData.get("phone") as string,
                        })
                        // Close dialog by resetting form
                        e.currentTarget.reset()
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="customer-name">Full Name</Label>
                        <Input id="customer-name" name="name" placeholder="e.g., John Smith" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer-email">Email Address</Label>
                        <Input
                          id="customer-email"
                          name="email"
                          type="email"
                          placeholder="e.g., john@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer-phone">Phone Number</Label>
                        <Input id="customer-phone" name="phone" type="tel" placeholder="e.g., +1-555-0123" required />
                      </div>
                      <Button type="submit" className="w-full">
                        Add Customer
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.map((customer, i) => (
                <Card key={customer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <CardDescription>{customer.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm">{customer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Spent:</span>
                      <span className="text-sm font-semibold">{customer.totalSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Visits:</span>
                      <span className="text-sm">{customer.visits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Active:</span>
                      <span className="text-sm">{customer.lastActive}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Segments Tab */}
          <TabsContent value="segments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Customer Segments</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Segment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Segment</DialogTitle>
                    <DialogDescription>Define a new customer segment with targeting rules.</DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      addSegment({
                        name: formData.get("name") as string,
                        ruleSet: formData.get("ruleSet") as string,
                      })
                      // Close dialog by resetting form
                      e.currentTarget.reset()
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="segment-name">Segment Name</Label>
                      <Input id="segment-name" name="name" placeholder="e.g., Premium Customers" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rule-set">Targeting Rules</Label>
                      <Textarea
                        id="rule-set"
                        name="ruleSet"
                        placeholder="e.g., Total spent > $500 AND Last active < 30 days"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Segment
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {segments.map((segment, i) => (
                <Card key={segment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{segment.name}</CardTitle>
                      <Target className="h-5 w-5 text-blue-500" />
                    </div>
                    <CardDescription>Created by {segment.createdBy}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Rule Set:</span>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1">{segment.ruleSet}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Audience Size:</span>
                      <Badge variant="secondary">{segment.audienceSize.toLocaleString()}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Marketing Campaigns</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Campaign</DialogTitle>
                    <DialogDescription>Set up a new marketing campaign for your customer segments.</DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      addCampaign({
                        name: formData.get("name") as string,
                        segment: formData.get("segment") as string,
                        messageTemplate: formData.get("messageTemplate") as string,
                      })
                      // Close dialog by resetting form
                      e.currentTarget.reset()
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input id="campaign-name" name="name" placeholder="e.g., Black Friday Sale 2024" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-segment">Target Segment</Label>
                      <Select name="segment" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a segment" />
                        </SelectTrigger>
                        <SelectContent>
                          {segments.map((segment) => (
                            <SelectItem key={segment.id} value={segment.name}>
                              {segment.name} ({segment.audienceSize.toLocaleString()} customers)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message-template">Message Template</Label>
                      <Textarea
                        id="message-template"
                        name="messageTemplate"
                        placeholder="e.g., Get 50% off everything! Limited time offer..."
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Campaign
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign, i) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <Badge
                        variant={
                          campaign.status === "Active"
                            ? "default"
                            : campaign.status === "Completed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <CardDescription>Target: {campaign.segment}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Message Template:</span>
                      <p className="text-sm bg-gray-100 p-2 rounded mt-1">{campaign.messageTemplate}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Messages Sent:</span>
                      <span className="text-sm font-semibold">{campaign.sent.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Filter by Date
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "ORD-001",
                  customer: "John Smith",
                  amount: "$245.99",
                  items: "3 items",
                  orderDate: "2024-01-15",
                  status: "Completed",
                },
                {
                  id: "ORD-002",
                  customer: "Sarah Johnson",
                  amount: "$89.50",
                  items: "1 item",
                  orderDate: "2024-01-15",
                  status: "Processing",
                },
                {
                  id: "ORD-003",
                  customer: "Mike Davis",
                  amount: "$567.25",
                  items: "5 items",
                  orderDate: "2024-01-14",
                  status: "Shipped",
                },
                {
                  id: "ORD-004",
                  customer: "Lisa Wilson",
                  amount: "$123.75",
                  items: "2 items",
                  orderDate: "2024-01-14",
                  status: "Completed",
                },
                {
                  id: "ORD-005",
                  customer: "Tom Brown",
                  amount: "$890.00",
                  items: "7 items",
                  orderDate: "2024-01-13",
                  status: "Completed",
                },
              ].map((order, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <ShoppingCart className="h-8 w-8 text-blue-500" />
                        <div>
                          <h4 className="font-semibold">{order.id}</h4>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.amount}</p>
                        <p className="text-sm text-gray-600">{order.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{order.orderDate}</p>
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : order.status === "Processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Communications Tab */}
          <TabsContent value="communications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Communication Log</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Status
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  campaign: "Summer Sale 2024",
                  customer: "John Smith",
                  status: "Delivered",
                  timestamp: "2024-01-15 10:30 AM",
                },
                {
                  campaign: "Welcome Series",
                  customer: "Emma Taylor",
                  status: "Opened",
                  timestamp: "2024-01-15 09:15 AM",
                },
                {
                  campaign: "Re-engagement Campaign",
                  customer: "Mike Davis",
                  status: "Clicked",
                  timestamp: "2024-01-14 03:45 PM",
                },
                {
                  campaign: "VIP Exclusive",
                  customer: "Sarah Johnson",
                  status: "Sent",
                  timestamp: "2024-01-14 11:20 AM",
                },
                {
                  campaign: "Summer Sale 2024",
                  customer: "Lisa Wilson",
                  status: "Bounced",
                  timestamp: "2024-01-13 02:10 PM",
                },
              ].map((log, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <MessageSquare className="h-8 w-8 text-green-500" />
                        <div>
                          <h4 className="font-semibold">{log.campaign}</h4>
                          <p className="text-sm text-gray-600">To: {log.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            log.status === "Delivered"
                              ? "default"
                              : log.status === "Opened"
                                ? "secondary"
                                : log.status === "Clicked"
                                  ? "default"
                                  : "outline"
                          }
                        >
                          {log.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{log.timestamp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  CRM Analytics Overview
                </CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Analytics charts and reports would be displayed here</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Campaign performance, customer lifetime value, conversion rates, etc.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
