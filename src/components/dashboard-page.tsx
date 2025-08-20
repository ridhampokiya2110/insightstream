
"use client"

import * as React from "react"
import { IndianRupee, TrendingUp, Users, ShoppingCart } from "lucide-react"
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

type DataPoint = {
  month: string
  sales: number
  revenue: number
}

type RegionSales = {
  region: string
  sales: number
}

type LocalAreaSales = {
    area: string
    sales: number
}

type DashboardData = {
  totalRevenue: number
  totalRevenueChange: number
  conversionRate: number
  conversionRateChange: number
  activeBuyers: number
  activeBuyersChange: number
  newSellers: number
  newSellersChange: number
  salesOverTime: DataPoint[]
  salesByRegion: RegionSales[]
  salesByLocalArea?: LocalAreaSales[]
}

const allData: Record<string, Record<string, DashboardData>> = {
  india: {
    "all-categories": {
      totalRevenue: 3769231.89,
      totalRevenueChange: 20.1,
      conversionRate: 2.5,
      conversionRateChange: 2.0,
      activeBuyers: 2350,
      activeBuyersChange: 180.1,
      newSellers: 12234,
      newSellersChange: 19.0,
      salesOverTime: [
        { month: "Jan", sales: 4250, revenue: 2100000 },
        { month: "Feb", sales: 4800, revenue: 2450000 },
        { month: "Mar", sales: 5100, revenue: 2800000 },
        { month: "Apr", sales: 5500, revenue: 3100000 },
        { month: "May", sales: 5800, revenue: 3400000 },
        { month: "Jun", sales: 6200, revenue: 3769231 },
      ],
      salesByRegion: [
        { region: "Mumbai", sales: 1250000 },
        { region: "Delhi", sales: 980000 },
        { region: "Bangalore", sales: 820000 },
        { region: "Chennai", sales: 450000 },
        { region: "Kolkata", sales: 180000 },
        { region: "Other", sales: 89231 },
      ],
    },
  },
  mumbai: {
    "all-categories": {
      totalRevenue: 1250000,
      totalRevenueChange: 15.5,
      conversionRate: 3.1,
      conversionRateChange: 1.5,
      activeBuyers: 800,
      activeBuyersChange: 150.2,
      newSellers: 4500,
      newSellersChange: 22.3,
      salesOverTime: [
        { month: "Jan", sales: 1500, revenue: 700000 },
        { month: "Feb", sales: 1600, revenue: 800000 },
        { month: "Mar", sales: 1700, revenue: 900000 },
        { month: "Apr", sales: 1800, revenue: 1000000 },
        { month: "May", sales: 1900, revenue: 1100000 },
        { month: "Jun", sales: 2000, revenue: 1250000 },
      ],
      salesByRegion: [
        { region: "Electronics", sales: 500000 },
        { region: "Fashion", sales: 450000 },
        { region: "Home Goods", sales: 300000 },
      ],
      salesByLocalArea: [
          { area: "Borivali", sales: 350000 },
          { area: "Andheri", sales: 300000 },
          { area: "Dadar", sales: 250000 },
          { area: "Thane", sales: 200000 },
          { area: "Colaba", sales: 150000 },
      ]
    },
    electronics: {
      totalRevenue: 500000,
      totalRevenueChange: 18.2,
      conversionRate: 4.5,
      conversionRateChange: 2.1,
      activeBuyers: 350,
      activeBuyersChange: 160.5,
      newSellers: 1800,
      newSellersChange: 25.1,
      salesOverTime: [
        { month: "Jan", sales: 600, revenue: 200000 },
        { month: "Feb", sales: 650, revenue: 250000 },
        { month: "Mar", sales: 700, revenue: 300000 },
        { month: "Apr", sales: 750, revenue: 350000 },
        { month: "May", sales: 800, revenue: 400000 },
        { month: "Jun", sales: 850, revenue: 500000 },
      ],
      salesByRegion: [
        { region: "Borivali", sales: 150000 },
        { region: "Andheri", sales: 120000 },
        { region: "Dadar", sales: 100000 },
        { region: "Thane", sales: 80000 },
        { region: "Colaba", sales: 50000 },
      ],
    },
    fashion: {
      totalRevenue: 450000,
      totalRevenueChange: 12.1,
      conversionRate: 2.8,
      conversionRateChange: 1.2,
      activeBuyers: 300,
      activeBuyersChange: 140.3,
      newSellers: 1500,
      newSellersChange: 18.7,
      salesOverTime: [
        { month: "Jan", sales: 500, revenue: 250000 },
        { month: "Feb", sales: 550, revenue: 280000 },
        { month: "Mar", sales: 600, revenue: 320000 },
        { month: "Apr", sales: 650, revenue: 350000 },
        { month: "May", sales: 700, revenue: 400000 },
        { month: "Jun", sales: 750, revenue: 450000 },
      ],
      salesByRegion: [
        { region: "Borivali", sales: 120000 },
        { region: "Andheri", sales: 100000 },
        { region: "Dadar", sales: 80000 },
        { region: "Thane", sales: 80000 },
        { region: "Colaba", sales: 70000 },
      ],
    },
    "home-goods": {
        totalRevenue: 300000,
        totalRevenueChange: 10.3,
        conversionRate: 2.1,
        conversionRateChange: 0.9,
        activeBuyers: 150,
        activeBuyersChange: 120.1,
        newSellers: 1200,
        newSellersChange: 15.4,
        salesOverTime: [
            { month: "Jan", sales: 400, revenue: 150000 },
            { month: "Feb", sales: 400, revenue: 170000 },
            { month: "Mar", sales: 400, revenue: 200000 },
            { month: "Apr", sales: 400, revenue: 230000 },
            { month: "May", sales: 400, revenue: 250000 },
            { month: "Jun", sales: 500, revenue: 300000 },
        ],
        salesByRegion: [
          { region: "Borivali", sales: 80000 },
          { region: "Andheri", sales: 80000 },
          { region: "Dadar", sales: 70000 },
          { region: "Thane", sales: 40000 },
          { region: "Colaba", sales: 30000 },
      ],
    }
  },
  delhi: {
    "all-categories": {
      totalRevenue: 980000,
      totalRevenueChange: 22.3,
      conversionRate: 2.8,
      conversionRateChange: 2.3,
      activeBuyers: 750,
      activeBuyersChange: 190.5,
      newSellers: 3800,
      newSellersChange: 21.2,
      salesOverTime: [
        { month: "Jan", sales: 1200, revenue: 500000 },
        { month: "Feb", sales: 1300, revenue: 600000 },
        { month: "Mar", sales: 1400, revenue: 700000 },
        { month: "Apr", sales: 1500, revenue: 800000 },
        { month: "May", sales: 1600, revenue: 900000 },
        { month: "Jun", sales: 1700, revenue: 980000 },
      ],
      salesByRegion: [
        { region: "Electronics", sales: 400000 },
        { region: "Fashion", sales: 350000 },
        { region: "Home Goods", sales: 230000 },
      ],
       salesByLocalArea: [
          { area: "Connaught Place", sales: 280000 },
          { area: "Karol Bagh", sales: 220000 },
          { area: "Chandni Chowk", sales: 180000 },
          { area: "Lajpat Nagar", sales: 150000 },
          { area: "Nehru Place", sales: 150000 },
      ]
    },
    electronics: {
      totalRevenue: 400000,
      totalRevenueChange: 25.1,
      conversionRate: 3.8,
      conversionRateChange: 2.5,
      activeBuyers: 300,
      activeBuyersChange: 200.1,
      newSellers: 1500,
      newSellersChange: 24.3,
      salesOverTime: [
        { month: "Jan", sales: 500, revenue: 200000 },
        { month: "Feb", sales: 550, revenue: 240000 },
        { month: "Mar", sales: 600, revenue: 280000 },
        { month: "Apr", sales: 650, revenue: 320000 },
        { month: "May", sales: 700, revenue: 360000 },
        { month: "Jun", sales: 750, revenue: 400000 },
      ],
      salesByRegion: [
        { region: "Nehru Place", sales: 100000 },
        { region: "Karol Bagh", sales: 90000 },
        { region: "Chandni Chowk", sales: 80000 },
        { region: "Connaught Place", sales: 70000 },
        { region: "Lajpat Nagar", sales: 60000 },
      ],
    },
  },
  bangalore: {
    "all-categories": {
      totalRevenue: 820000,
      totalRevenueChange: 18.7,
      conversionRate: 3.5,
      conversionRateChange: 2.8,
      activeBuyers: 650,
      activeBuyersChange: 175.6,
      newSellers: 3200,
      newSellersChange: 18.5,
      salesOverTime: [
        { month: "Jan", sales: 1000, revenue: 400000 },
        { month: "Feb", sales: 1100, revenue: 450000 },
        { month: "Mar", sales: 1200, revenue: 550000 },
        { month: "Apr", sales: 1300, revenue: 650000 },
        { month: "May", sales: 1400, revenue: 750000 },
        { month: "Jun", sales: 1500, revenue: 820000 },
      ],
      salesByRegion: [
        { region: "Electronics", sales: 350000 },
        { region: "Fashion", sales: 280000 },
        { region: "Home Goods", sales: 190000 },
      ],
      salesByLocalArea: [
          { area: "Koramangala", sales: 250000 },
          { area: "Indiranagar", sales: 200000 },
          { area: "Jayanagar", sales: 150000 },
          { area: "Whitefield", sales: 120000 },
          { area: "HSR Layout", sales: 100000 },
      ]
    },
     electronics: {
      totalRevenue: 350000,
      totalRevenueChange: 21.3,
      conversionRate: 4.8,
      conversionRateChange: 3.1,
      activeBuyers: 280,
      activeBuyersChange: 180.2,
      newSellers: 1300,
      newSellersChange: 20.1,
      salesOverTime: [
        { month: "Jan", sales: 400, revenue: 150000 },
        { month: "Feb", sales: 450, revenue: 180000 },
        { month: "Mar", sales: 500, revenue: 220000 },
        { month: "Apr", sales: 550, revenue: 260000 },
        { month: "May", sales: 600, revenue: 300000 },
        { month: "Jun", sales: 650, revenue: 350000 },
      ],
      salesByRegion: [
        { region: "Koramangala", sales: 100000 },
        { region: "Indiranagar", sales: 80000 },
        { region: "Whitefield", sales: 60000 },
        { region: "Jayanagar", sales: 60000 },
        { region: "HSR Layout", sales: 50000 },
      ],
    },
  },
  chennai: {
    "all-categories": {
      totalRevenue: 450000,
      totalRevenueChange: 14.2,
      conversionRate: 2.2,
      conversionRateChange: 1.8,
      activeBuyers: 300,
      activeBuyersChange: 130.2,
      newSellers: 1800,
      newSellersChange: 16.8,
      salesOverTime: [
        { month: "Jan", sales: 600, revenue: 200000 },
        { month: "Feb", sales: 650, revenue: 250000 },
        { month: "Mar", sales: 700, revenue: 300000 },
        { month: "Apr", sales: 750, revenue: 350000 },
        { month: "May", sales: 800, revenue: 400000 },
        { month: "Jun", sales: 850, revenue: 450000 },
      ],
      salesByRegion: [
        { region: "Electronics", sales: 180000 },
        { region: "Fashion", sales: 150000 },
        { region: "Home Goods", sales: 120000 },
      ],
      salesByLocalArea: [
          { area: "T. Nagar", sales: 150000 },
          { area: "Adyar", sales: 100000 },
          { area: "Velachery", sales: 80000 },
          { area: "Anna Nagar", sales: 70000 },
          { area: "Mylapore", sales: 50000 },
      ]
    },
    electronics: {
      totalRevenue: 180000,
      totalRevenueChange: 16.5,
      conversionRate: 3.2,
      conversionRateChange: 2.1,
      activeBuyers: 120,
      activeBuyersChange: 140.7,
      newSellers: 700,
      newSellersChange: 18.2,
      salesOverTime: [
        { month: "Jan", sales: 250, revenue: 80000 },
        { month: "Feb", sales: 280, revenue: 100000 },
        { month: "Mar", sales: 310, revenue: 120000 },
        { month: "Apr", sales: 340, revenue: 140000 },
        { month: "May", sales: 370, revenue: 160000 },
        { month: "Jun", sales: 400, revenue: 180000 },
      ],
      salesByRegion: [
        { region: "T. Nagar", sales: 60000 },
        { region: "Adyar", sales: 40000 },
        { region: "Velachery", sales: 30000 },
        { region: "Anna Nagar", sales: 30000 },
        { region: "Mylapore", sales: 20000 },
      ],
    },
  },
}

const chartConfig: ChartConfig = {
  sales: {
    label: "Sales (units)",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue (₹)",
    color: "hsl(var(--chart-2))",
  },
  category: {
      label: "Sales (₹)",
      color: "hsl(var(--chart-1))"
  },
  localArea: {
      label: "Sales (₹)",
      color: "hsl(var(--chart-2))"
  }
}

const formatCurrency = (value: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(value)}`

const formatCompactCurrency = (value: number) =>
  `₹${new Intl.NumberFormat("en-IN", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value)}`

export default function DashboardPage() {
  const [region, setRegion] = React.useState("india")
  const [category, setCategory] = React.useState("all-categories")
  
  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
    setCategory("all-categories");
  };
  
  const data = allData[region]?.[category] || allData.india['all-categories'];
  const isAllIndiaView = region === "india";
  const isCityView = region !== "india";
  const isAllCategoriesView = category === "all-categories";
  
  const barChartData = isCityView && !isAllCategoriesView 
    ? data.salesByRegion.map(item => ({...item, region: item.region}))
    : (isCityView && isAllCategoriesView) 
      ? data.salesByLocalArea?.map(item => ({ ...item, region: item.area }))
      : data.salesByRegion;

  const barChartDataKey = isCityView && !isAllCategoriesView
    ? "region"
    : (isCityView && isAllCategoriesView)
      ? "area"
      : "region";

  const barChartFill = isCityView && !isAllCategoriesView
    ? "var(--color-category)"
    : (isCityView && isAllCategoriesView) 
      ? "var(--color-localArea)"
      : "var(--color-category)";

  const getBarChartTitle = () => {
    const regionName = region.charAt(0).toUpperCase() + region.slice(1);
    if (isAllIndiaView) return "Sales by Region";
    if (isCityView && isAllCategoriesView) return `Sales by Local Area in ${regionName}`;
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace("-"," ");
    if (isCityView && !isAllCategoriesView) return `Sales by Local Area for ${categoryName} in ${regionName}`;
    return "Sales by Category";
  }


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Marketplace Dashboard
        </h1>
        <div className="flex gap-2">
          <Select value={region} onValueChange={handleRegionChange}>
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
          <Select value={category} onValueChange={setCategory} disabled={region === 'india'}>
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
            <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">+{data.totalRevenueChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">+{data.conversionRateChange}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{data.activeBuyers}</div>
            <p className="text-xs text-muted-foreground">+{data.activeBuyersChange}% from last month</p>
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
              <div className="text-2xl font-bold">+{data.newSellers}</div>
              <p className="text-xs text-muted-foreground">
                +{data.newSellersChange}% from last month
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
              <LineChart data={data.salesOverTime}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                 <YAxis
                    yAxisId="left"
                    tickFormatter={(value) => `${value}`}
                    
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={formatCompactCurrency}
                  />
                <Tooltip
                    content={<ChartTooltipContent
                        formatter={(value, name) => {
                          if (name === "revenue") {
                            return formatCurrency(value as number)
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
            <CardTitle>{getBarChartTitle()}</CardTitle>
            <CardDescription>Current Month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={barChartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey={barChartDataKey} tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={formatCompactCurrency} />
                <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent
                        formatter={(value) => formatCurrency(value as number)}
                    />}
                />
                <Bar dataKey="sales" fill={barChartFill} radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

    
