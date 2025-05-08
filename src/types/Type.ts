export interface DomainsItem{
    createdDate: number;
    domain: string,
    status: string,
    isActive: boolean,
    id: string,
}

export interface LoaderErrorProps {
    loading: boolean;
    error?: string;
    children: React.ReactNode;
    loadingMessage?: string;
    errorMessage?: string;
    customClass?: string;
}