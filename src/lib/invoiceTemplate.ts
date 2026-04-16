export const generateInvoiceHtml = (order: any) => {
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

  return `<!DOCTYPE html>
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
    <div style="height:4px;background:linear-gradient(90deg,#3b82f6 0%,#06b6d4 50%,#10b981 100%);border-radius:2px;margin-bottom:36px"></div>
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
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:18px 22px;margin-bottom:32px">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin-bottom:10px">Bill To</div>
      <div style="font-size:15px;font-weight:600;color:#0f172a;margin-bottom:4px;font-family:'Noto Sans Bengali',Inter,sans-serif">${order.customer_name || "Guest Customer"}</div>
      <div style="font-size:12px;color:#64748b;line-height:1.7">
        ${order.phone ? `<div>📞 ${order.phone}</div>` : ''}
        ${order.customer_email ? `<div>✉ ${order.customer_email}</div>` : ''}
        ${order.address ? `<div>📍 ${order.address}</div>` : ''}
      </div>
    </div>
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
    <div style="margin-top:40px;padding-top:24px;border-top:1px solid #f1f5f9">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin-bottom:8px">Payment Method</div>
      <p style="font-size:12px;color:#64748b">Cash on Delivery (COD)</p>
    </div>
    <div style="margin-top:32px;text-align:center">
      <p style="font-size:13px;color:#94a3b8;font-style:italic">Thank you for choosing Newlife Homeo Hall</p>
    </div>
  </div>
  <div class="footer-band" style="display:flex;justify-content:space-between;align-items:center">
    <div style="font-size:10px;color:#94a3b8;line-height:1.6">
      <span style="font-weight:600;color:#e2e8f0">Newlife Homeo Hall</span> • Rampal, Bagerhat • +880 1911 734 726
    </div>
    <div style="font-size:9px;color:#64748b">Generated on ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</div>
  </div>
</div>
</body></html>`;
};

export const openInvoice = (order: any) => {
  const html = generateInvoiceHtml(order);
  const w = window.open("", "_blank");
  if (w) {
    w.document.write(html);
    w.document.close();
  }
};
