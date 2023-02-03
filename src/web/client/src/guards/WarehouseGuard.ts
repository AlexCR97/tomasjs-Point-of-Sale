import { useWarehouseSelect } from "@/components/warehouse-select";
import type { NavigationGuard } from "vue-router";

export function useWarehouseGuard(): NavigationGuard {
  return function warehouseGuard(to, from, next) {
    const warehouseSelect = useWarehouseSelect();

    if (!warehouseSelect.selectedWarehouseOrDefault) {
      return next({ name: "warehouse-not-selected" });
    }

    return next();
  };
}
