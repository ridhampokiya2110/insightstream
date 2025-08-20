
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

type CitySales = {
  city: string
  sales: number
}

type CategorySales = {
    category: string;
    sales: number;
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
  salesByCity: CitySales[]
  salesByCategory?: CategorySales[]
}

const allData: Record<string, Record<string, DashboardData>> = {
  "all-india": {
    "all-categories": {
      totalRevenue: 48590123.45,
      totalRevenueChange: 22.5,
      conversionRate: 2.8,
      conversionRateChange: 1.9,
      activeBuyers: 35000,
      activeBuyersChange: 185.3,
      newSellers: 150000,
      newSellersChange: 21.7,
      salesOverTime: [
        { month: "Jan", sales: 65000, revenue: 31000000 },
        { month: "Feb", sales: 68000, revenue: 34500000 },
        { month: "Mar", sales: 72000, revenue: 38000000 },
        { month: "Apr", sales: 78000, revenue: 41000000 },
        { month: "May", sales: 82000, revenue: 45000000 },
        { month: "Jun", sales: 85000, revenue: 48590123 },
      ],
      salesByCity: [
        { city: "Maharashtra", sales: 9800000 },
        { city: "Karnataka", sales: 8200000 },
        { city: "Delhi", sales: 7500000 },
        { city: "Tamil Nadu", sales: 6900000 },
        { city: "Uttar Pradesh", sales: 5500000 },
        { city: "West Bengal", sales: 4100000 },
        { city: "Gujarat", sales: 3800000 },
        { city: "Rajasthan", sales: 2790123 },
      ],
    },
  },
  maharashtra: {
    "all-categories": {
      totalRevenue: 9800000,
      totalRevenueChange: 25.1,
      conversionRate: 3.5,
      conversionRateChange: 2.1,
      activeBuyers: 8000,
      activeBuyersChange: 190.2,
      newSellers: 35000,
      newSellersChange: 28.3,
      salesOverTime: [
        { month: "Jan", sales: 12000, revenue: 6000000 },
        { month: "Feb", sales: 12500, revenue: 6800000 },
        { month: "Mar", sales: 13000, revenue: 7500000 },
        { month: "Apr", sales: 14000, revenue: 8200000 },
        { month: "May", sales: 14500, revenue: 9000000 },
        { month: "Jun", sales: 15000, revenue: 9800000 },
      ],
      salesByCity: [
        { city: "Mumbai", sales: 4500000 },
        { city: "Pune", sales: 3000000 },
        { city: "Nagpur", sales: 1500000 },
        { city: "Nashik", sales: 800000 },
      ],
      salesByCategory: [
        { category: "Electronics", sales: 4000000 },
        { category: "Fashion", sales: 3500000 },
        { category: "Home Goods", sales: 2300000 },
      ]
    },
    electronics: {
      totalRevenue: 4000000,
      totalRevenueChange: 28.2,
      conversionRate: 5.2,
      conversionRateChange: 2.5,
      activeBuyers: 3500,
      activeBuyersChange: 210.5,
      newSellers: 15000,
      newSellersChange: 31.1,
      salesOverTime: [
        { month: "Jan", sales: 5000, revenue: 2000000 },
        { month: "Feb", sales: 5200, revenue: 2500000 },
        { month: "Mar", sales: 5500, revenue: 3000000 },
        { month: "Apr", sales: 5800, revenue: 3400000 },
        { month: "May", sales: 6000, revenue: 3800000 },
        { month: "Jun", sales: 6200, revenue: 4000000 },
      ],
      salesByCity: [
        { city: "Mumbai", sales: 2000000 },
        { city: "Pune", sales: 1200000 },
        { city: "Nagpur", sales: 500000 },
        { city: "Nashik", sales: 300000 },
      ],
    }
  },
  karnataka: {
    "all-categories": {
      totalRevenue: 8200000,
      totalRevenueChange: 23.4,
      conversionRate: 4.1,
      conversionRateChange: 2.9,
      activeBuyers: 7500,
      activeBuyersChange: 188.1,
      newSellers: 32000,
      newSellersChange: 26.5,
      salesOverTime: [
        { month: "Jan", sales: 10000, revenue: 5000000 },
        { month: "Feb", sales: 10500, revenue: 5800000 },
        { month: "Mar", sales: 11000, revenue: 6500000 },
        { month: "Apr", sales: 11500, revenue: 7200000 },
        { month: "May", sales: 12000, revenue: 7800000 },
        { month: "Jun", sales: 12500, revenue: 8200000 },
      ],
      salesByCity: [
          { city: "Bengaluru", sales: 5500000 },
          { city: "Mysuru", sales: 1500000 },
          { city: "Mangaluru", sales: 800000 },
          { city: "Hubballi", sales: 400000 },
      ],
      salesByCategory: [
          { category: "Electronics", sales: 3800000 },
          { category: "Fashion", sales: 2800000 },
          { category: "Home Goods", sales: 1600000 },
      ]
    },
    electronics: {
        totalRevenue: 3800000,
        totalRevenueChange: 26.9,
        conversionRate: 5.9,
        conversionRateChange: 3.4,
        activeBuyers: 3200,
        activeBuyersChange: 205.2,
        newSellers: 14000,
        newSellersChange: 29.8,
        salesOverTime: [
          { month: "Jan", sales: 4000, revenue: 1800000 },
          { month: "Feb", sales: 4200, revenue: 2200000 },
          { month: "Mar", sales: 4500, revenue: 2600000 },
          { month: "Apr", sales: 4800, revenue: 3000000 },
          { month: "May", sales: 5000, revenue: 3400000 },
          { month: "Jun", sales: 5100, revenue: 3800000 },
        ],
        salesByCity: [
          { city: "Bengaluru", sales: 2500000 },
          { city: "Mysuru", sales: 700000 },
          { city: "Mangaluru", sales: 400000 },
          { city: "Hubballi", sales: 200000 },
        ],
    }
  },
  delhi: {
    "all-categories": {
        totalRevenue: 7500000,
        totalRevenueChange: 21.8,
        conversionRate: 3.9,
        conversionRateChange: 2.5,
        activeBuyers: 7000,
        activeBuyersChange: 180.4,
        newSellers: 30000,
        newSellersChange: 25.1,
        salesOverTime: [
            { month: "Jan", sales: 9000, revenue: 4500000 },
            { month: "Feb", sales: 9500, revenue: 5200000 },
            { month: "Mar", sales: 10000, revenue: 5900000 },
            { month: "Apr", sales: 10500, revenue: 6500000 },
            { month: "May", sales: 11000, revenue: 7000000 },
            { month: "Jun", sales: 11200, revenue: 7500000 },
        ],
        salesByCity: [
            { city: "New Delhi", sales: 5000000 },
            { city: "Noida", sales: 1500000 },
            { city: "Gurugram", sales: 1000000 },
        ],
        salesByCategory: [
            { category: "Electronics", sales: 3200000 },
            { category: "Fashion", sales: 2500000 },
            { category: "Home Goods", sales: 1800000 },
        ]
    },
    fashion: {
        totalRevenue: 2500000,
        totalRevenueChange: 19.2,
        conversionRate: 4.5,
        conversionRateChange: 2.2,
        activeBuyers: 3000,
        activeBuyersChange: 175.9,
        newSellers: 12000,
        newSellersChange: 22.4,
        salesOverTime: [
          { month: "Jan", sales: 3000, revenue: 1000000 },
          { month: "Feb", sales: 3200, revenue: 1200000 },
          { month: "Mar", sales: 3500, revenue: 1500000 },
          { month: "Apr", sales: 3800, revenue: 1800000 },
          { month: "May", sales: 4000, revenue: 2200000 },
          { month: "Jun", sales: 4100, revenue: 2500000 },
        ],
        salesByCity: [
          { city: "New Delhi", sales: 1500000 },
          { city: "Noida", sales: 600000 },
          { city: "Gurugram", sales: 400000 },
        ],
    }
  },
  "tamil-nadu": {
    "all-categories": {
      totalRevenue: 6900000,
      totalRevenueChange: 19.5,
      conversionRate: 3.2,
      conversionRateChange: 1.8,
      activeBuyers: 6000,
      activeBuyersChange: 165.7,
      newSellers: 28000,
      newSellersChange: 23.2,
      salesOverTime: [
        { month: "Jan", sales: 8000, revenue: 4000000 },
        { month: "Feb", sales: 8500, revenue: 4600000 },
        { month: "Mar", sales: 9000, revenue: 5200000 },
        { month: "Apr", sales: 9500, revenue: 5800000 },
        { month: "May", sales: 10000, revenue: 6400000 },
        { month: "Jun", sales: 10200, revenue: 6900000 },
      ],
      salesByCity: [
        { city: "Chennai", sales: 3500000 },
        { city: "Coimbatore", sales: 2000000 },
        { city: "Madurai", sales: 1000000 },
        { city: "Tiruchirappalli", sales: 400000 },
      ],
      salesByCategory: [
        { category: "Electronics", sales: 2800000 },
        { category: "Fashion", sales: 2200000 },
        { category: "Home Goods", sales: 1900000 },
      ]
    },
    "home-goods": {
      totalRevenue: 1900000,
      totalRevenueChange: 17.1,
      conversionRate: 3.8,
      conversionRateChange: 1.5,
      activeBuyers: 2200,
      activeBuyersChange: 155.4,
      newSellers: 10000,
      newSellersChange: 20.3,
      salesOverTime: [
        { month: "Jan", sales: 2500, revenue: 800000 },
        { month: "Feb", sales: 2700, revenue: 950000 },
        { month: "Mar", sales: 3000, revenue: 1100000 },
        { month: "Apr", sales: 3200, revenue: 1300000 },
        { month: "May", sales: 3500, revenue: 1600000 },
        { month: "Jun", sales: 3600, revenue: 1900000 },
      ],
      salesByCity: [
        { city: "Chennai", sales: 900000 },
        { city: "Coimbatore", sales: 500000 },
        { city: "Madurai", sales: 300000 },
        { city: "Tiruchirappalli", sales: 200000 },
      ],
    }
  }
};


const chartConfig: ChartConfig = {
  sales: {
    label: "Sales (units)",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue (₹)",
    color: "hsl(var(--chart-2))",
  },
  city: {
      label: "Sales (₹)",
      color: "hsl(var(--chart-1))"
  },
  category: {
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
  const [state, setState] = React.useState("all-india")
  const [category, setCategory] = React.useState("all-categories")
  
  const handleStateChange = (newState: string) => {
    setState(newState);
    setCategory("all-categories");
  };
  
  const data = allData[state]?.[category] || allData["all-india"]['all-categories'];
  const isAllIndiaView = state === "all-india";
  const isStateView = state !== "all-india";
  const isAllCategoriesView = category === "all-categories";
  
  const barChartData = isStateView && isAllCategoriesView
    ? data.salesByCity
    : isStateView && !isAllCategoriesView
      ? data.salesByCity
      : data.salesByCity;

  const barChartDataKey = isAllIndiaView ? "city" : "city";
  
  const barChartFill = isStateView && isAllCategoriesView
      ? "var(--color-city)"
      : "var(--color-category)";


  const getBarChartTitle = () => {
    const stateName = state.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    if (isAllIndiaView) return "Sales by State";
    if (isStateView && isAllCategoriesView) return `Sales by City in ${stateName}`;
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace("-"," ");
    if (isStateView && !isAllCategoriesView) return `Sales for ${categoryName} by City in ${stateName}`;
    return "Sales Data";
  }


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Marketplace Dashboard
        </h1>
        <div className="flex gap-2">
          <Select value={state} onValueChange={handleStateChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-india">All India</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
              {/* Add other 16 states here */}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory} disabled={state === 'all-india'}>
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
            <div className="text-2xl font-bold">+{data.activeBuyers.toLocaleString('en-IN')}</div>
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
              <div className="text-2xl font-bold">+{data.newSellers.toLocaleString('en-IN')}</div>
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
                    tickFormatter={(value) => `${(value as number / 1000)}k`}
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
                          return `${(value as number).toLocaleString('en-IN')} units`
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
