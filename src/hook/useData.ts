import { useState, useEffect } from "react";
import { getDomainsData, deleteDomain } from "../apiService/apiService";
import { DomainsItem } from "../types/Type";

export const useDomainsData = () => {
    const [data, setData] = useState<DomainsItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const response = await getDomainsData();
            setData(response);
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
        } catch (err) {
            setError(err.message);
        }
    };

    return { data, error, loading, handleDelete };
};