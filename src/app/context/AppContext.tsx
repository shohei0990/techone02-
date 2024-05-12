"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";


interface YearMonth {
    year_month: string;
}

interface UsageData {
    total_users: number;
    total_meals: number;
}

interface StoreSummary {
    store_id: number;
    store: string;
    total_users: number;
    total_meals: number;
}

interface AgeGroupData {
    age_group: string;
    total_users: number;
    usage_rate: string; 
}

interface FrequencyData {
    avg: number;
    pct: number;
    gr: number;
}
  
interface UsageFrequency {
freq: {
    once: FrequencyData;
    twice: FrequencyData;
    thrice: FrequencyData;
    four: FrequencyData;
    five_plus: FrequencyData;
};
}
  

// アプリケーションコンテキストの型を定義
interface AppContextType {
    summary: UsageData | null;
    setSummary: (newSummary: UsageData) => void; 
    yearMonth: YearMonth;
    setYearMonth: (newYearMonth: YearMonth) => void; 
    storeSummaries: StoreSummary[];
    setStoreSummaries: (newStoreSummaries: StoreSummary[]) => void;
    ageGroupData: AgeGroupData[];
    setAgeGroupData: (newData: AgeGroupData[]) => void;
    usageFrequency: UsageFrequency | null;
    setUsageFrequency: (newData: UsageFrequency) => void;
    prevYearMonth: string;
    setPrevYearMonth: (newPrevYearMonth: string) => void; 
}

// コンテキストの作成
const AppContext = createContext<AppContextType>({
    summary: null, 
    setSummary: () => {},
    yearMonth: { year_month: '' }, 
    setYearMonth: () => {},
    storeSummaries: [],
    setStoreSummaries: () => {},
    ageGroupData: [],
    setAgeGroupData: () => {},
    usageFrequency: null,
    setUsageFrequency: () => {},
    prevYearMonth: '',
    setPrevYearMonth: () => {},
});


// コンテキストプロバイダー
export const AppProvider: React.FC<{ children: ReactNode }>  = ({ children }) => {
    const [yearMonth, setYearMonth] = useState<YearMonth>({ year_month: '202312' });
    const [summary, setSummary] = useState<UsageData | null>(null); 
    const [storeSummaries, setStoreSummaries] = useState<StoreSummary[]>([]);
    const [ageGroupData, setAgeGroupData] = useState<AgeGroupData[]>([]);
    const [usageFrequency, setUsageFrequency] = useState<UsageFrequency | null>(null);
    const [prevYearMonth, setPrevYearMonth] = useState<string>(''); 

    return (
        <AppContext.Provider 
            value={{ 
                summary, setSummary, 
                yearMonth, setYearMonth,
                storeSummaries, setStoreSummaries,
                ageGroupData, setAgeGroupData,
                usageFrequency, setUsageFrequency,
                prevYearMonth, setPrevYearMonth, 
            }}>
            {children}
        </AppContext.Provider>
    );
};

// コンテキストを使用するためのカスタムフック
export const useAppContext = () => {
    return useContext(AppContext);
}