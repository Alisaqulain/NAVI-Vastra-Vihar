"use client";

import { useEffect, useState, useMemo } from "react";
import { Inventory, InventoryTransaction } from "@/lib/models";
import { inventoryRepository } from "@/lib/repositories";
import { formatDateTime } from "@/lib/utils";
import { DataTable, Column } from "@/components/admin/DataTable";
import { InventoryAdjustModal } from "@/components/admin/InventoryAdjustModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackagePlus, Settings2 } from "lucide-react";

const statusVariant = {
  in_stock: "success" as const,
  low_stock: "warning" as const,
  out_of_stock: "destructive" as const,
};

export default function AdminInventoryPage() {
  const [items, setItems] = useState<Inventory[]>([]);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);
  const [modalMode, setModalMode] = useState<"adjust" | "threshold">("adjust");
  const [modalOpen, setModalOpen] = useState(false);

  const load = async () => {
    const [inv, txns] = await Promise.all([
      inventoryRepository.findAll(),
      inventoryRepository.getTransactions(),
    ]);
    setItems(inv);
    setTransactions(txns);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(
      (i) => i.productName.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q)
    );
  }, [items, search]);

  const openModal = (item: Inventory, mode: "adjust" | "threshold") => {
    setSelectedItem(item);
    setModalMode(mode);
    setModalOpen(true);
  };

  const columns: Column<Inventory>[] = [
    {
      key: "product",
      header: "Product",
      cell: (i) => (
        <div>
          <p className="font-medium line-clamp-1">{i.productName}</p>
          <p className="text-xs text-navy/50">{i.sku}</p>
        </div>
      ),
    },
    {
      key: "current",
      header: "Current Stock",
      cell: (i) => i.currentStock,
    },
    {
      key: "reserved",
      header: "Reserved",
      cell: (i) => i.reservedStock,
    },
    {
      key: "available",
      header: "Available",
      cell: (i) => i.availableStock,
    },
    {
      key: "threshold",
      header: "Threshold",
      cell: (i) => i.lowStockThreshold,
    },
    {
      key: "status",
      header: "Status",
      cell: (i) => (
        <Badge variant={statusVariant[i.status]}>
          {i.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-28",
      cell: (i) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => openModal(i, "adjust")} title="Adjust stock">
            <PackagePlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => openModal(i, "threshold")} title="Set threshold">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy">Inventory</h1>
        <p className="text-sm text-navy/60">Manage stock levels and track movements</p>
      </div>

      <Tabs defaultValue="stock">
        <TabsList>
          <TabsTrigger value="stock">Stock Levels</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="mt-4">
          <DataTable
            columns={columns}
            data={filtered}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search by product or SKU..."
          />
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="rounded-lg border border-beige bg-cream-light">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-beige">
                    <th className="p-4 text-left font-medium text-navy/70">Date</th>
                    <th className="p-4 text-left font-medium text-navy/70">Product</th>
                    <th className="p-4 text-left font-medium text-navy/70">Type</th>
                    <th className="p-4 text-left font-medium text-navy/70">Qty</th>
                    <th className="p-4 text-left font-medium text-navy/70">Before → After</th>
                    <th className="p-4 text-left font-medium text-navy/70">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-b border-beige last:border-0">
                      <td className="p-4 text-navy/60">{formatDateTime(txn.createdAt)}</td>
                      <td className="p-4">{items.find((i) => i.productId === txn.productId)?.productName ?? txn.productId}</td>
                      <td className="p-4 capitalize">{txn.type}</td>
                      <td className="p-4">{txn.quantity > 0 ? `+${txn.quantity}` : txn.quantity}</td>
                      <td className="p-4">{txn.previousStock} → {txn.newStock}</td>
                      <td className="p-4 text-navy/60">{txn.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <InventoryAdjustModal
        item={selectedItem}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSuccess={load}
        mode={modalMode}
      />
    </div>
  );
}
