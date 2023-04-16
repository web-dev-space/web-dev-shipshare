import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./dashboard-service"

export const getStatsMerchantThunk = createAsyncThunk(
    'dashboard/getStatsMerchant',
    async () => {
        const stats = await service.getStatsMerchant();
        return stats;
    }
);

export const getStatsAdminThunk = createAsyncThunk(
    'dashboard/getStatsAdmin',
    async () => {
        const stats = await service.getStatsAdmin();
        return stats;
    }
);

