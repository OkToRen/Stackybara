import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/statcard";
import { DollarSign, Package, ShoppingCart, Users, ArrowRight, TrendingUp, Download } from "lucide-react";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

type Period = 'Today' | 'This Month' | 'This Year';
type ChartPeriod = 'Week' | 'Month' | 'Year';

export default function DashboardPage() {
  const [revenuePeriod, setRevenuePeriod] = useState<Period>('Today');
  const [customerPeriod, setCustomerPeriod] = useState<Period>('Today');
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('Week');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const storeData = {
    name: "The Capy Store",
    ordersToProcess: 1,
    totalProducts: 5,
  };

  const revenueData: Record<Period, { value: string; change: string }> = {
    Today: { value: "Rp 1,350,000", change: "+10%" },
    'This Month': { value: "Rp 25,700,000", change: "+8%" },
    'This Year': { value: "Rp 150,250,000", change: "+15%" },
  };
 
  const customerData: Record<Period, { value: number; change: string }> = {
    Today: { value: 12, change: "+2" },
    'This Month': { value: 88, change: "+15" },
    'This Year': { value: 450, change: "+50" },
  };

  const chartData = {
    Week: [
      { name: 'Mon', revenue: 1200000 }, { name: 'Tue', revenue: 1350000 }, { name: 'Wed', revenue: 1100000 },
      { name: 'Thu', revenue: 1500000 }, { name: 'Fri', revenue: 1800000 }, { name: 'Sat', revenue: 2100000 },
      { name: 'Sun', revenue: 1950000 },
    ],
    Month: [
        { name: 'Week 1', revenue: 8950000 }, { name: 'Week 2', revenue: 7800000 },
        { name: 'Week 3', revenue: 9200000 }, { name: 'Week 4', revenue: 6500000 },
    ],
    Year: [
        { name: 'Jan', revenue: 15000000 }, { name: 'Feb', revenue: 12000000 }, { name: 'Mar', revenue: 18000000 },
        { name: 'Apr', revenue: 16000000 }, { name: 'May', revenue: 20000000 }, { name: 'Jun', revenue: 25000000 },
        { name: 'Jul', revenue: 22000000 }, { name: 'Aug', revenue: 28000000 }, { name: 'Sep', revenue: 31000000 },
        { name: 'Oct', revenue: 29000000 }, { name: 'Nov', revenue: 35000000 }, { name: 'Dec', revenue: 40000000 },
    ],
  };

  const recentOrders = [
    { id: 'A1B2C', customer: 'John Doe', amount: 89.99, status: 'New' },
    { id: 'D3E4F', customer: 'Jane Smith', amount: 49.98, status: 'Shipped' },
    { id: 'G5H6I', customer: 'Mike Chen', amount: 45.99, status: 'Completed' },
  ];

  const allBestSellers = [
    { name: 'Wireless Headphones', orders: 15, revenue: 1349.85 },
    { name: 'Organic T-Shirt', orders: 12, revenue: 299.88 },
    { name: 'Ergonomic Laptop Stand', orders: 8, revenue: 367.92 },
    { name: 'Portable Bluetooth Speaker', orders: 7, revenue: 559.93 },
    { name: 'Smart Fitness Watch', orders: 6, revenue: 1199.94 },
    { name: 'LED Desk Lamp', orders: 5, revenue: 199.95 },
    { name: 'Washing Machine', orders: 4, revenue: 1999.96 },
    { name: 'Windows 11 Pro Key', orders: 3, revenue: 389.97 },
    { name: 'Mechanical Keyboard', orders: 2, revenue: 259.98 },
    { name: '4K Webcam', orders: 1, revenue: 99.99 },
  ];

  const generatePDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const pdf = new jsPDF();
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const margin = 15;
      const pageWidth = pdf.internal.pageSize.getWidth();
      let yPos = 0;

      // Header
      pdf.setFillColor(13, 148, 136);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      pdf.text("Daily Performance Report", margin, 20);
      pdf.setFontSize(11);
      pdf.setTextColor(204, 251, 241);
      pdf.text(`${storeData.name} - ${today}`, margin, 27);
      yPos = 45;

      // Summary section
      pdf.setFontSize(16);
      pdf.setTextColor(4, 120, 87);
      pdf.text("Today's Summary", margin, yPos);
      yPos += 7;
      
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Total Revenue: ${revenueData.Today.value} (${revenueData.Today.change})`, margin, yPos);
      pdf.text(`New Customers: ${customerData.Today.value} (${customerData.Today.change})`, margin + 90, yPos);
      yPos += 7;
      pdf.text(`Orders to Process: ${storeData.ordersToProcess}`, margin, yPos);
      pdf.text(`Total Products Listed: ${storeData.totalProducts}`, margin + 90, yPos);
      yPos += 15;
      
      // Chart section
      const chartElement = document.getElementById('revenue-chart-for-pdf');
      if (chartElement) {
        pdf.setFontSize(16);
        pdf.setTextColor(4, 120, 87);
        pdf.text("Revenue Overview", margin, yPos);
        yPos += 5;
        
        try {
          const chartCanvas = await html2canvas(chartElement, {
            scale: 2,
            useCORS: true,
            allowTaint: false
          });
          const contentWidth = pageWidth - (margin * 2);
          const imgHeight = (chartCanvas.height * contentWidth) / chartCanvas.width;
          
          // Make sure we don't exceed page height
          if (yPos + imgHeight > pdf.internal.pageSize.getHeight() - 20) {
            pdf.addPage();
            yPos = 20;
          }
          
          pdf.addImage(chartCanvas.toDataURL('image/png'), 'PNG', margin, yPos, contentWidth, imgHeight);
          yPos += imgHeight + 15;
        } catch (chartError) {
          console.warn("Could not capture chart, skipping chart in PDF:", chartError);
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text("Chart could not be captured", margin, yPos);
          yPos += 15;
        }
      }
      
      // Add new page if needed for table
      if (yPos > pdf.internal.pageSize.getHeight() - 80) {
        pdf.addPage();
        yPos = 20;
      }
      
      // Best sellers table
      // Add table title
      pdf.setFontSize(16);
      pdf.setTextColor(4, 120, 87);
      pdf.text("Top 10 Best Selling Products", margin, yPos);
      yPos += 10;
      
      autoTable(pdf, {
        startY: yPos,
        head: [["#", "Product", "Orders Sold", "Revenue"]],
        body: allBestSellers.slice(0, 10).map((p, i) => [
          i + 1,
          p.name,
          p.orders.toString(),
          `${p.revenue.toFixed(2)}`
        ]),
        headStyles: { fillColor: [13, 148, 136] },
        styles: { font: 'helvetica', fontSize: 9 },
        columnStyles: {
            0: { halign: 'center', cellWidth: 10 },
            2: { halign: 'right' },
            3: { halign: 'right' }
        },
        margin: { left: margin, right: margin }
      });
      
      // Save the PDF
      const fileName = `ShoppyBara_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
        console.error("Failed to generate PDF:", error);
        alert(`Sorry, there was an error generating the report: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
        setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">
            Welcome back, {storeData.name}!
          </h1>
          <p className="text-lg text-amber-700">
            Here's a snapshot of your store's performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Revenue</CardTitle>
              <select
                value={revenuePeriod}
                onChange={(e) => setRevenuePeriod(e.target.value as Period)}
                className="text-xs bg-transparent border-none p-1 rounded focus:ring-0"
              >
                <option>Today</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-950">{revenueData[revenuePeriod].value}</div>
              <p className="text-xs text-amber-700">{revenueData[revenuePeriod].change} from last period</p>
            </CardContent>
          </Card>
          
          <StatCard
            title="Orders to Process"
            value={storeData.ordersToProcess}
            icon={ShoppingCart}
            description="Ready to be shipped"
          />
          <StatCard
            title="Total Products"
            value={storeData.totalProducts}
            icon={Package}
            description="Currently listed for sale"
          />
          
           <Card className="border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Total Customers</CardTitle>
              <select
                value={customerPeriod}
                onChange={(e) => setCustomerPeriod(e.target.value as Period)}
                className="text-xs bg-transparent border-none p-1 rounded focus:ring-0"
              >
                <option>Today</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-950">{customerData[customerPeriod].value}</div>
              <p className="text-xs text-amber-700">{customerData[customerPeriod].change} new customers</p>
            </CardContent>
          </Card>
        </div>

        <Card id="revenue-chart-for-pdf" className="border-amber-200 mb-8">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <CardTitle className="text-amber-900">Revenue Overview</CardTitle>
                    <p className="text-sm text-amber-700 mt-1">Your sales trend over time.</p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0 p-1 bg-amber-100 rounded-lg">
                    {(['Week', 'Month', 'Year'] as ChartPeriod[]).map((period) => (
                        <Button
                            key={period}
                            onClick={() => setChartPeriod(period)}
                            variant={chartPeriod === period ? 'default' : 'ghost'}
                            className={chartPeriod === period ? 'bg-white text-amber-900 shadow-sm' : 'text-amber-700'}
                            size="sm"
                        >
                            {period}
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={chartData[chartPeriod]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#fde68a" />
                        <XAxis dataKey="name" stroke="#92400e" fontSize={12} />
                        <YAxis stroke="#92400e" fontSize={12} tickFormatter={(value) => `Rp${value/1000}k`} />
                        <Tooltip contentStyle={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}/>
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-3 text-teal-600"/>
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-amber-100">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-semibold text-amber-950">{order.customer}</p>
                      <p className="text-sm text-amber-700">Order #{order.id}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-semibold text-amber-950">${order.amount.toFixed(2)}</p>
                       <Badge variant={order.status === 'New' ? 'default' : 'secondary'} className={order.status === 'New' ? 'bg-teal-500' : ''}>
                         {order.status}
                       </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/seller/orders">
                <Button variant="outline" className="w-full mt-4 border-amber-300 text-amber-800 hover:bg-amber-100">
                  View All Orders
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-3 text-teal-600"/>
                Best Sellers
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="divide-y divide-amber-100">
                {allBestSellers.slice(0, 3).map(product => (
                  <div key={product.name} className="flex items-center gap-4 py-3">
                    <div className="flex-1">
                      <p className="font-semibold text-amber-950">{product.name}</p>
                      <p className="text-sm text-amber-700">{product.orders} orders</p>
                    </div>
                    <p className="font-semibold text-amber-950">${product.revenue.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Link to="/seller/productmanager">
                <Button variant="outline" className="w-full mt-4 border-amber-300 text-amber-800 hover:bg-amber-100">
                  View All Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
            <Card className="border-amber-200 bg-amber-100/50">
                <CardHeader>
                    <CardTitle className="text-amber-900">Download Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-amber-800 mb-4">Generate a PDF summary of your current dashboard view.</p>
                    <Button onClick={generatePDF} disabled={isGeneratingPdf} className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    {isGeneratingPdf ? 'Generating...' : 'Generate Daily Report'}
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}