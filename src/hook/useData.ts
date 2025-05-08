import { useState, useEffect, useCallback } from "react";
import { getDomainsData, deleteDomain } from "../apiService/apiService";
import { DomainsItem } from "../types/Type";

export const useDomainsData = () => {
    const [data, setData] = useState<DomainsItem[]>([]);
    const [sortedData, setSortedData] = useState<DomainsItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortOption, setSortOption] = useState<'ascending' | 'descending'>('ascending');

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getDomainsData();
            setData(response);
            setSortedData(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteDomain(id);
            setData(prevData => prevData.filter(item => item.id !== id));
            setSortedData(prevData => prevData.filter(item => item.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const sortData = useCallback((option: 'ascending' | 'descending') => {
        setSortOption(option);
        const sorted = [...data].sort((a, b) => {
            const domainA = a.domain.toLowerCase();
            const domainB = b.domain.toLowerCase();
            return option === 'ascending' 
                ? domainA.localeCompare(domainB) 
                : domainB.localeCompare(domainA);
        });
        setSortedData(sorted);
    }, [data]);

    return { 
        data: sortedData, 
        error, 
        loading, 
        handleDelete, 
        sortData,
        fetchData
    };
};