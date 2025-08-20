
"use client"

import * as React from "react"
import { IndianRupee, TrendingUp, Users, ArrowUp, ShoppingCart } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChartConfig } from "@/components/ui/chart"

const salesData = [
    { month: "Jan", sales: 4250, revenue: 2100000 },
    { month: "Feb", sales: 4800, revenue: 2450000 },
    { month: "Mar", sales: 5100, revenue: 2800000 },
    { month: "Apr", sales: 5500, revenue: 3100000 },
    { month: "May", sales: 5800, revenue: 3400000 },
    { month: "Jun", sales: 6200, revenue: 3769231 },
]

const salesByRegionData = [
    { region: "Mumbai", sales: 1250000 },
    { region: "Delhi", sales: 980000 },
    { region: "Bangalore", sales: 820000 },
    { region: "Chennai", sales: 450000 },
    { region: "Kolkata", sales: 180000 },
    { region: "Other", sales: 89231 },
]


const chartConfig: ChartConfig = {
  sales: {
    label: "Sales (units)",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue (₹)",
    color: "hsl(var(--chart-2))",
  },
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Marketplace Dashboard
        </h1>
        <div className="flex gap-2">
          <Select defaultValue="india">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-categories">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="home-goods">Home Goods</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,769,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5%</div>
            <p className="text-xs text-muted-foreground">+2.0% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Sellers
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={salesData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                 <YAxis
                    yAxisId="left"
                    tickFormatter={(value) => `${value}`}
                    
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) =>
                      `₹${new Intl.NumberFormat("en-IN", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(value as number)}`
                    }
                  />
                <Tooltip
                    content={<ChartTooltipContent
                        formatter={(value, name) => {
                          if (name === "revenue") {
                            return `₹${new Intl.NumberFormat("en-IN").format(value as number)}`
                          }
                          return `${value} units`
                        }}
                    />}
                />
                <Line
                  yAxisId="left"
                  dataKey="sales"
                  type="monotone"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={true}
                />
                 <Line
                  yAxisId="right"
                  dataKey="revenue"
                  type="monotone"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Current Month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={salesByRegionData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="region" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                    tickFormatter={(value) =>
                        `₹${new Intl.NumberFormat("en-IN", {
                        notation: "compact",
                        compactDisplay: "short",
                        }).format(value as number)}`
                    }
                />
                <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent
                        formatter={(value) =>
                            `₹${new Intl.NumberFormat("en-IN").format(value as number)}`
                        }
                    />}
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
