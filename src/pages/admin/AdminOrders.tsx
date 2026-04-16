import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Package, Truck, CheckCircle, XCircle, Clock, Receipt, Copy, ChevronDown, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/shared/StatusBadge";
import { toast } from "sonner";

const statusOptions = [
  { value: "pending", label: "Pending", icon: Clock, color: "text-amber-500" },
  { value: "confirmed", label: "Confirmed", icon: CheckCircle, color: "text-blue-500" },
  { value: "processing", label: "Processing", icon: Package, color: "text-purple-500" },
  { value: "shipped", label: "Shipped", icon: Truck, color: "text-info" },
  { value: "delivered", label: "Delivered", icon: CheckCircle, color: "text-green-500" },
  { value: "cancelled", label: "Cancelled", icon: XCircle, color: "text-destructive" },
];

const AdminOrders = () => {
  const { data: orders, isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const [viewOrder, setViewOrder] = useState<any>(null);

  const handleStatusChange = (orderId: string, status: string) => {
    updateStatus.mutate({ id: orderId, status });
  };

  const handleCopyInvoice = (order: any) => {
    const items = order.order_items || [];
    const lines = [
      `=== INVOICE ===`,
      `Order ID: ${order.id.slice(0, 8).toUpperCase()}`,
      `Date: ${new Date(order.created_at).toLocaleDateString()}`,
      `Customer: ${order.customer_name || "N/A"}`,
      `Email: ${order.customer_email || "N/A"}`,
      `Phone: ${order.phone || "N/A"}`,
      `Address: ${order.address || "N/A"}`,
      `Status: ${order.status}`,
      ``,
      `--- Items ---`,
      ...items.map((item: any, i: number) =>
        `${i + 1}. ${item.products?.name || "Product"} × ${item.quantity} = ৳${(item.price * item.quantity).toFixed(2)}`
      ),
      ``,
      `Total: ৳${Number(order.total).toFixed(2)}`,
      `================`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    toast.success("Invoice copied to clipboard!");
  };

  const handleDownloadInvoice = (order: any) => {
    const items = order.order_items || [];
    const orderDate = new Date(order.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const invoiceNo = `INV-${order.id.slice(0, 8).toUpperCase()}`;

    const itemRows = items.map((item: any, i: number) => `
      <tr>
        <td style="border:1px solid #ddd;padding:8px 10px;text-align:center">${i + 1}</td>
        <td style="border:1px solid #ddd;padding:8px 10px">${item.products?.name || "Product"}</td>
        <td style="border:1px solid #ddd;padding:8px 10px;text-align:center">${item.quantity}</td>
        <td style="border:1px solid #ddd;padding:8px 10px;text-align:right">৳${Number(item.price).toFixed(2)}</td>
        <td style="border:1px solid #ddd;padding:8px 10px;text-align:right;font-weight:600">৳${(item.quantity * Number(item.price)).toFixed(2)}</td>
      </tr>
    `).join("");

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Invoice ${invoiceNo}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Segoe UI',Arial,sans-serif; color:#1a1a1a; padding:0; }
  .invoice { max-width:210mm; margin:0 auto; padding:15mm; }
  @media print { body { padding:0; } .invoice { padding:10mm 12mm; } .no-print { display:none!important; } @page { margin:0; size:A4; } }
</style></head><body>
<div class="no-print" style="text-align:center;padding:12px;background:#f5f5f5;border-bottom:1px solid #ddd">
  <button onclick="window.print()" style="padding:8px 24px;background:#1a237e;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer;margin-right:8px">🖨️ Print / Save PDF</button>
  <button onclick="window.close()" style="padding:8px 24px;background:#666;color:#fff;border:none;border-radius:8px;font-size:14px;cursor:pointer">Close</button>
</div>
<div class="invoice">
  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #1a237e;padding-bottom:15px;margin-bottom:20px">
    <div>
      <h1 style="font-size:28px;color:#1a237e;margin-bottom:4px">Newlife Homeo Hall</h1>
      <p style="font-size:12px;color:#555">Dr. Amit Kumar Pal — BHMS (Gold Medalist)</p>
      <p style="font-size:11px;color:#777">Rampal, Bagerhat</p>
      <p style="font-size:11px;color:#777">Contact: +880 1911 734 726</p>
    </div>
    <div style="text-align:right">
      <h2 style="font-size:32px;color:#1a237e;font-weight:700;letter-spacing:1px">INVOICE</h2>
      <p style="font-size:13px;color:#555;margin-top:4px"><strong>Invoice #:</strong> ${invoiceNo}</p>
      <p style="font-size:13px;color:#555"><strong>Date:</strong> ${orderDate}</p>
      <p style="font-size:13px;color:#555"><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
    </div>
  </div>

  <!-- Customer -->
  <div style="background:#f8f9fa;border-radius:8px;padding:14px 18px;margin-bottom:20px;border:1px solid #e9ecef">
    <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:8px">Bill To</h3>
    <p style="font-size:15px;font-weight:700;color:#1a1a1a">${order.customer_name || "Guest Customer"}</p>
    <p style="font-size:12px;color:#555;margin-top:2px">${order.phone || ""} ${order.customer_email ? "• " + order.customer_email : ""}</p>
    <p style="font-size:12px;color:#555">${order.address || ""}</p>
  </div>

  <!-- Items Table -->
  <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px">
    <thead>
      <tr style="background:#1a237e;color:#fff">
        <th style="border:1px solid #1a237e;padding:10px;text-align:center;width:5%">#</th>
        <th style="border:1px solid #1a237e;padding:10px;text-align:left">Product</th>
        <th style="border:1px solid #1a237e;padding:10px;text-align:center;width:10%">Qty</th>
        <th style="border:1px solid #1a237e;padding:10px;text-align:right;width:15%">Unit Price</th>
        <th style="border:1px solid #1a237e;padding:10px;text-align:right;width:15%">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${itemRows}
    </tbody>
  </table>

  <!-- Totals -->
  <div style="display:flex;justify-content:flex-end">
    <div style="width:250px">
      <div style="display:flex;justify-content:space-between;padding:10px 0;border-top:2px solid #1a237e;font-size:18px;font-weight:700;color:#1a237e">
        <span>Total</span>
        <span>৳${Number(order.total).toFixed(2)}</span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div style="margin-top:40px;border-top:1px solid #ddd;padding-top:15px;text-align:center">
    <p style="font-size:11px;color:#888">Thank you for your order!</p>
    <p style="font-size:10px;color:#aaa;margin-top:4px">Newlife Homeo Hall • Rampal, Bagerhat • +880 1911 734 726</p>
  </div>
</div>
</body></html>`;

    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  const totalRevenue = (orders || []).reduce((sum: number, o: any) => sum + Number(o.total || 0), 0);
  const pendingCount = (orders || []).filter((o: any) => o.status === "pending").length;
  const deliveredCount = (orders || []).filter((o: any) => o.status === "delivered").length;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader
        title="Order Management"
        description="Track and manage all customer orders"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Orders", value: (orders || []).length, icon: Package, color: "bg-primary/10 text-primary" },
          { label: "Pending", value: pendingCount, icon: Clock, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
          { label: "Delivered", value: deliveredCount, icon: CheckCircle, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
          { label: "Revenue", value: `৳${totalRevenue.toFixed(0)}`, icon: Receipt, color: "bg-info/10 text-info" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        data={orders || []}
        searchPlaceholder="Search orders..."
        columns={[
          {
            header: "Order ID",
            accessor: (row: any) => (
              <span className="font-mono text-xs font-medium text-foreground">#{row.id.slice(0, 8).toUpperCase()}</span>
            ),
          },
          { header: "Customer", accessor: (row: any) => row.customer_name || "Guest" },
          { header: "Phone", accessor: (row: any) => row.phone || "—" },
          {
            header: "Total",
            accessor: (row: any) => <span className="font-semibold text-foreground">৳{Number(row.total).toFixed(2)}</span>,
          },
          {
            header: "Status",
            accessor: (row: any) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                    <StatusBadge status={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-44">
                  {statusOptions.map((opt) => (
                    <DropdownMenuItem
                      key={opt.value}
                      onClick={() => handleStatusChange(row.id, opt.value)}
                      className={`flex items-center gap-2 cursor-pointer ${row.status === opt.value ? "font-semibold bg-accent" : ""}`}
                    >
                      <opt.icon className={`w-3.5 h-3.5 ${opt.color}`} />
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          },
          {
            header: "Date",
            accessor: (row: any) => new Date(row.created_at).toLocaleDateString(),
          },
          {
            header: "Actions",
            accessor: (row: any) => (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewOrder(row)} title="View">
                  <Eye className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDownloadInvoice(row)} title="Download Invoice PDF">
                  <Download className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopyInvoice(row)} title="Copy Invoice">
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            ),
          },
        ]}
      />

      {/* Order Detail / Invoice Dialog */}
      <Dialog open={!!viewOrder} onOpenChange={() => setViewOrder(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Order #{viewOrder?.id?.slice(0, 8).toUpperCase()}
            </DialogTitle>
            <DialogDescription>
              {viewOrder && new Date(viewOrder.created_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </DialogDescription>
          </DialogHeader>

          {viewOrder && (
            <div className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
                      <StatusBadge status={viewOrder.status.charAt(0).toUpperCase() + viewOrder.status.slice(1)} />
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    {statusOptions.map((opt) => (
                      <DropdownMenuItem
                        key={opt.value}
                        onClick={() => handleStatusChange(viewOrder.id, opt.value)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <opt.icon className={`w-3.5 h-3.5 ${opt.color}`} />
                        {opt.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Customer Info */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground">Name</span>
                    <p className="font-medium text-foreground">{viewOrder.customer_name || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Email</span>
                    <p className="font-medium text-foreground">{viewOrder.customer_email || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Phone</span>
                    <p className="font-medium text-foreground">{viewOrder.phone || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Address</span>
                    <p className="font-medium text-foreground">{viewOrder.address || "N/A"}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Order Items</h4>
                <div className="space-y-2">
                  {(viewOrder.order_items || []).map((item: any, i: number) => (
                    <div key={item.id || i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/60">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.products?.name || "Product"}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ৳{Number(item.price).toFixed(2)}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-foreground">৳{(item.quantity * Number(item.price)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
                <span className="text-sm font-semibold text-foreground">Total Amount</span>
                <span className="text-lg font-bold text-primary">৳{Number(viewOrder.total).toFixed(2)}</span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground" onClick={() => handleDownloadInvoice(viewOrder)}>
                  <Download className="w-3.5 h-3.5 mr-1" /> Invoice PDF
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleCopyInvoice(viewOrder)}>
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy Invoice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
