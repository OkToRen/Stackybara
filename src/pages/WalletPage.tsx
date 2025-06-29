"use client"

import { useState, useEffect } from "react"
import {
  Wallet,
  Copy,
  Download,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  RefreshCw,
  FileText,
  PieChart,
  BarChart3,
  Info,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockTransactions = [
  {
    id: "TXN-2025-001",
    type: "Payment",
    amount: -45.5,
    description: "Order #ORD-2025-001 - Wireless Headphones",
    date: "2025-01-15T10:30:00Z",
    status: "Completed",
  },
  {
    id: "TXN-2025-002",
    type: "Refund",
    amount: 23.99,
    description: "Refund for Order #ORD-2025-002",
    date: "2025-01-14T15:45:00Z",
    status: "Completed",
  },
  {
    id: "TXN-2025-003",
    type: "Income",
    amount: 89.99,
    description: "Sale: Smart Fitness Watch",
    date: "2025-01-13T09:15:00Z",
    status: "Completed",
  },
  {
    id: "TXN-2025-004",
    type: "Payment",
    amount: -199.99,
    description: "Order #ORD-2025-004 - Laptop Stand",
    date: "2025-01-12T14:20:00Z",
    status: "Pending",
  },
  {
    id: "TXN-2025-005",
    type: "Income",
    amount: 156.75,
    description: "Sale: Bluetooth Speaker",
    date: "2025-01-11T11:30:00Z",
    status: "Completed",
  },
]

const monthlySpendingData = [
  { month: "Aug", spending: 234.5 },
  { month: "Sep", spending: 456.75 },
  { month: "Oct", spending: 123.25 },
  { month: "Nov", spending: 678.9 },
  { month: "Dec", spending: 345.6 },
  { month: "Jan", spending: 567.8 },
]

const spendingDistributionData = [
  { category: "Electronics", amount: 1234.5, color: "#0891b2" },
  { category: "Fashion", amount: 567.25, color: "#059669" },
  { category: "Home & Garden", amount: 345.75, color: "#dc2626" },
  { category: "Books", amount: 123.5, color: "#7c3aed" },
  { category: "Others", amount: 234.8, color: "#ea580c" },
]

export default function WalletPage() {
  const [currentBalance] = useState(1247.85)
  const [walletId] = useState("stacky-wallet-2025-user-001")
  const [transactions, setTransactions] = useState(mockTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const copyWalletId = () => {
    navigator.clipboard.writeText(walletId)
    showNotification("success", "Wallet ID copied to clipboard!")
  }

  const refreshBalance = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    showNotification("success", "Balance refreshed successfully!")
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Transaction ID", "Type", "Amount (ICP)", "Description", "Date", "Status"],
      ...filteredTransactions.map((tx) => [
        tx.id,
        tx.type,
        tx.amount.toString(),
        tx.description,
        new Date(tx.date).toLocaleDateString(),
        tx.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "stackybara-transactions.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    showNotification("success", "Transaction history exported to CSV!")
  }

  const exportToPDF = () => {
    showNotification("success", "PDF export feature coming soon!")
  }

  useEffect(() => {
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((tx) => tx.type.toLowerCase() === typeFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((tx) => tx.status.toLowerCase() === statusFilter)
    }

    setFilteredTransactions(filtered)
  }, [searchTerm, typeFilter, statusFilter, transactions])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "Payment":
        return <ShoppingBag className="h-4 w-4" />
      case "Refund":
        return <RefreshCw className="h-4 w-4" />
      case "Income":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalSpentThisMonth = 567.8
  const totalIncomeThisMonth = 246.74
  const previousMonthSpending = 345.6
  const spendingChange = (((totalSpentThisMonth - previousMonthSpending) / previousMonthSpending) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 animate-fade-in ${
              notification.type === "success" ? "bg-teal-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Wallet Header */}
        <div className="mb-8">
          <Card className="border-amber-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 h-32"></div>
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <Wallet className="h-16 w-16 text-amber-600" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-amber-900 mb-2">My Stackybara Wallet</h1>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-amber-700">Wallet ID:</span>
                        <code className="bg-amber-100 px-2 py-1 rounded text-sm text-amber-800">{walletId}</code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyWalletId}
                          className="border-amber-300 text-amber-800 hover:bg-amber-100 bg-transparent"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-amber-600">
                        <Info className="h-4 w-4" />
                        <span>This wallet is for use within Stackybara only</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-amber-700 mb-1">Current Balance</div>
                      <div className="text-4xl font-bold text-amber-900 mb-2">{currentBalance.toFixed(2)} ICP</div>
                      <Button
                        size="sm"
                        onClick={refreshBalance}
                        disabled={isLoading}
                        className="bg-teal-500 hover:bg-teal-600 text-white"
                      >
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Refresh
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-900">{totalSpentThisMonth.toFixed(2)} ICP</div>
                  <div className="text-amber-700">Spent This Month</div>
                  <div
                    className={`text-sm flex items-center justify-center gap-1 mt-1 ${
                      Number.parseFloat(spendingChange) > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {Number.parseFloat(spendingChange) > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(Number.parseFloat(spendingChange))}% vs last month
                  </div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-900">{totalIncomeThisMonth.toFixed(2)} ICP</div>
                  <div className="text-teal-700">Income This Month</div>
                  <div className="text-sm text-teal-600 mt-1">From sales</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">{filteredTransactions.length}</div>
                  <div className="text-green-700">Total Transactions</div>
                  <div className="text-sm text-green-600 mt-1">This month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Tabs */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 bg-white border border-amber-200">
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="export" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Transaction History</CardTitle>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
                      <Input
                        placeholder="Search transactions or order IDs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-amber-300 focus:border-teal-400"
                      />
                    </div>
                  </div>

                  {/* Custom Type Filter */}
                  <div className="relative">
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full md:w-40 px-3 py-2 border border-amber-300 rounded-md bg-white text-amber-900 focus:border-teal-400 focus:outline-none appearance-none pr-8"
                    >
                      <option value="all">All Types</option>
                      <option value="payment">Payment</option>
                      <option value="refund">Refund</option>
                      <option value="income">Income</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 pointer-events-none" />
                  </div>

                  {/* Custom Status Filter */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full md:w-40 px-3 py-2 border border-amber-300 rounded-md bg-white text-amber-900 focus:border-teal-400 focus:outline-none appearance-none pr-8"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500 pointer-events-none" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredTransactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount (ICP)</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getTransactionIcon(transaction.type)}
                                <span className="font-medium">{transaction.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-amber-900">{transaction.description}</div>
                                <div className="text-sm text-amber-600">{transaction.id}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                              >
                                {transaction.amount > 0 ? "+" : ""}
                                {transaction.amount.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              {new Date(transaction.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(transaction.status)}
                                <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                    <p className="text-amber-700">No transactions found.</p>
                    <p className="text-sm text-amber-600 mt-2">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              {/* Monthly Spending Chart */}
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Spending Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-4 p-4">
                    {monthlySpendingData.map((data, index) => {
                      const maxSpending = Math.max(...monthlySpendingData.map((d) => d.spending))
                      const height = (data.spending / maxSpending) * 200
                      return (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                          <div className="text-xs text-amber-700 font-medium">{data.spending.toFixed(0)} ICP</div>
                          <div
                            className="w-full bg-teal-500 rounded-t-md transition-all hover:bg-teal-600 cursor-pointer"
                            style={{ height: `${height}px`, minHeight: "20px" }}
                            title={`${data.month}: ${data.spending} ICP`}
                          ></div>
                          <div className="text-sm font-medium text-amber-900">{data.month}</div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 text-center text-sm text-amber-600">
                    Spending amounts in ICP over the past 6 months
                  </div>
                </CardContent>
              </Card>

              {/* Spending Distribution */}
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Spending Distribution by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Custom Pie Chart Visualization */}
                    <div className="relative">
                      <div className="w-64 h-64 mx-auto relative">
                        {/* Pie Chart Segments */}
                        <div className="w-full h-full rounded-full overflow-hidden relative">
                          {spendingDistributionData.map((item, index) => {
                            const total = spendingDistributionData.reduce((sum, d) => sum + d.amount, 0)
                            const percentage = (item.amount / total) * 100
                            return (
                              <div
                                key={index}
                                className="absolute inset-0 rounded-full"
                                style={{
                                  background: `conic-gradient(${item.color} 0deg ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg 360deg)`,
                                  transform: `rotate(${spendingDistributionData.slice(0, index).reduce((sum, d) => sum + (d.amount / total) * 360, 0)}deg)`,
                                }}
                              />
                            )
                          })}
                        </div>
                        {/* Center Circle */}
                        <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-amber-900">
                              {spendingDistributionData.reduce((sum, d) => sum + d.amount, 0).toFixed(0)}
                            </div>
                            <div className="text-sm text-amber-700">Total ICP</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-3">
                      {spendingDistributionData.map((item, index) => {
                        const total = spendingDistributionData.reduce((sum, d) => sum + d.amount, 0)
                        const percentage = ((item.amount / total) * 100).toFixed(1)
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                              <span className="font-medium text-amber-900">{item.category}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-amber-900">{item.amount.toFixed(2)} ICP</div>
                              <div className="text-xs text-amber-600">{percentage}%</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Export Transaction Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-amber-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-amber-900">CSV Export</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-amber-700 mb-4">
                        Export your transaction history as a CSV file for use in spreadsheet applications.
                      </p>
                      <Button onClick={exportToCSV} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Export to CSV
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-amber-900">PDF Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-amber-700 mb-4">
                        Generate a comprehensive PDF report with your transaction history and analytics.
                      </p>
                      <Button onClick={exportToPDF} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Export to PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Export Information</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Exports include all filtered transactions based on your current search criteria</li>
                        <li>• CSV files can be opened in Excel, Google Sheets, or other spreadsheet applications</li>
                        <li>• PDF reports include transaction summaries and basic analytics</li>
                        <li>• All exported data is for your personal records only</li>
                      </ul>
                    </div>
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
