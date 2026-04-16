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
    const orderDate = new Date(order.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    const invoiceNo = `INV-${order.id.slice(0, 8).toUpperCase()}`;
    const subtotal = items.reduce((s: number, item: any) => s + item.quantity * Number(item.price), 0);
    const delivery = Number(order.total) - subtotal;

    const itemRows = items.map((item: any, i: number) => `
      <tr style="${i % 2 === 0 ? '' : 'background:#f8fafc;'}">
        <td style="padding:12px 16px;font-size:13px;color:#64748b;text-align:center;border-bottom:1px solid #f1f5f9">${String(i + 1).padStart(2, '0')}</td>
        <td style="padding:12px 16px;font-size:13px;color:#1e293b;font-weight:500;border-bottom:1px solid #f1f5f9">${item.products?.name || "Product"}</td>
        <td style="padding:12px 16px;font-size:13px;color:#475569;text-align:center;border-bottom:1px solid #f1f5f9">${item.quantity}</td>
        <td style="padding:12px 16px;font-size:13px;color:#475569;text-align:right;border-bottom:1px solid #f1f5f9">৳${Number(item.price).toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
        <td style="padding:12px 16px;font-size:13px;color:#1e293b;text-align:right;font-weight:600;border-bottom:1px solid #f1f5f9">৳${(item.quantity * Number(item.price)).toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
      </tr>
    `).join("");

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Invoice ${invoiceNo}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@400;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Inter',system-ui,sans-serif;color:#1e293b;background:#f8fafc}
  .page{max-width:210mm;margin:0 auto;background:#fff;min-height:297mm;position:relative;box-shadow:0 1px 3px rgba(0,0,0,.08)}
  .content{padding:40px 48px 80px}
  .footer-band{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:20px 48px;color:#fff}
  @media print{body{background:#fff;padding:0}.page{box-shadow:none;margin:0;min-height:auto}.no-print{display:none!important}@page{margin:0;size:A4}}
</style></head><body>
<div class="no-print" style="text-align:center;padding:14px;background:#0f172a;position:sticky;top:0;z-index:10">
  <button onclick="window.print()" style="padding:10px 32px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;letter-spacing:.3px;margin-right:8px">⬇ Print / Save as PDF</button>
  <button onclick="window.close()" style="padding:10px 32px;background:transparent;color:#94a3b8;border:1px solid #334155;border-radius:6px;font-size:13px;cursor:pointer;font-family:Inter,sans-serif">Close</button>
</div>
<div class="page">
  <div class="content">
    <!-- Top accent line -->
    <div style="height:4px;background:linear-gradient(90deg,#3b82f6 0%,#06b6d4 50%,#10b981 100%);border-radius:2px;margin-bottom:36px"></div>

    <!-- Header -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px">
      <div>
        <h1 style="font-size:22px;font-weight:700;color:#0f172a;letter-spacing:-.5px;margin-bottom:2px">Newlife Homeo Hall</h1>
        <p style="font-size:12px;color:#64748b;font-weight:400">Established Healthcare & Wellness</p>
        <div style="margin-top:12px;font-size:11px;color:#94a3b8;line-height:1.8">
          <div>Dr. Amit Kumar Pal — BHMS (Gold Medalist)</div>
          <div>Rampal, Bagerhat, Bangladesh</div>
          <div>+880 1911 734 726</div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#3b82f6;margin-bottom:12px">Invoice</div>
        <table style="font-size:12px;color:#64748b;margin-left:auto;border-spacing:0">
          <tr><td style="padding:3px 0;text-align:left">Invoice No.</td><td style="padding:3px 0 3px 16px;text-align:right;font-weight:600;color:#1e293b">${invoiceNo}</td></tr>
          <tr><td style="padding:3px 0;text-align:left">Date</td><td style="padding:3px 0 3px 16px;text-align:right;font-weight:500;color:#1e293b">${orderDate}</td></tr>
          <tr><td style="padding:3px 0;text-align:left">Status</td><td style="padding:3px 0 3px 16px;text-align:right"><span style="display:inline-block;padding:2px 10px;border-radius:99px;font-size:10px;font-weight:600;letter-spacing:.3px;text-transform:uppercase;${order.status==='delivered'?'background:#dcfce7;color:#16a34a':order.status==='cancelled'?'background:#fee2e2;color:#dc2626':order.status==='shipped'?'background:#dbeafe;color:#2563eb':'background:#fef3c7;color:#d97706'}">${order.status}</span></td></tr>
        </table>
      </div>
    </div>

    <!-- Bill To -->
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:18px 22px;margin-bottom:32px">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin-bottom:10px">Bill To</div>
      <div style="font-size:15px;font-weight:600;color:#0f172a;margin-bottom:4px;font-family:'Noto Sans Bengali',Inter,sans-serif">${order.customer_name || "Guest Customer"}</div>
      <div style="font-size:12px;color:#64748b;line-height:1.7">
        ${order.phone ? `<div>📞 ${order.phone}</div>` : ''}
        ${order.customer_email ? `<div>✉ ${order.customer_email}</div>` : ''}
        ${order.address ? `<div>📍 ${order.address}</div>` : ''}
      </div>
    </div>

    <!-- Items Table -->
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      <thead>
        <tr style="border-bottom:2px solid #e2e8f0">
          <th style="padding:10px 16px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;text-align:center;width:8%">#</th>
          <th style="padding:10px 16px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;text-align:left">Description</th>
          <th style="padding:10px 16px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;text-align:center;width:10%">Qty</th>
          <th style="padding:10px 16px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;text-align:right;width:16%">Unit Price</th>
          <th style="padding:10px 16px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;text-align:right;width:16%">Amount</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <!-- Totals -->
    <div style="display:flex;justify-content:flex-end">
      <div style="width:280px">
        <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:13px;color:#64748b">
          <span>Subtotal</span><span style="color:#1e293b;font-weight:500">৳${subtotal.toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
        </div>
        ${delivery > 0 ? `<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0">
          <span>Delivery</span><span style="color:#1e293b;font-weight:500">৳${delivery.toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
        </div>` : `<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:13px;color:#64748b;border-bottom:1px solid #e2e8f0">
          <span>Delivery</span><span style="color:#16a34a;font-weight:500">Free</span>
        </div>`}
        <div style="display:flex;justify-content:space-between;padding:14px 0 0;font-size:18px;font-weight:700;color:#0f172a">
          <span>Total</span><span>৳${Number(order.total).toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
        </div>
      </div>
    </div>

    <!-- Payment Note -->
    <div style="margin-top:40px;padding-top:24px;border-top:1px solid #f1f5f9">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin-bottom:8px">Payment Method</div>
      <p style="font-size:12px;color:#64748b">Cash on Delivery (COD)</p>
    </div>

    <!-- Thank you -->
    <div style="margin-top:32px;text-align:center">
      <p style="font-size:13px;color:#94a3b8;font-style:italic">Thank you for choosing Newlife Homeo Hall</p>
    </div>
  </div>

  <!-- Footer Band -->
  <div class="footer-band" style="display:flex;justify-content:space-between;align-items:center">
    <div style="font-size:10px;color:#94a3b8;line-height:1.6">
      <span style="font-weight:600;color:#e2e8f0">Newlife Homeo Hall</span> • Rampal, Bagerhat • +880 1911 734 726
    </div>
    <div style="font-size:9px;color:#64748b">Generated on ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</div>
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
