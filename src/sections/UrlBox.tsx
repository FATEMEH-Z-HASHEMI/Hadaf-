import React from 'react';
import { useDomainsData } from "../hook/useData"
import LoaderError from '../loadingError/LoaderError';
import { RiErrorWarningLine } from "react-icons/ri";
import SimpleSnackbar from "./SnackBar"
import LongMenu from "./Menu"

interface UrlBoxProps {
    loading: boolean;
    error?: string;
    searchTerm?: string;
}

const UrlBox: React.FC<UrlBoxProps> = ({ loading, error ,searchTerm = '' }) =>  {
    const { data, error: dataError, loading: dataLoading, handleDelete } = useDomainsData();
    console.log(data)

    const filteredData = data?.filter(item => 
        item.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (dataError || !data || !Array.isArray(data)) {
        return <LoaderError loading={false} error={dataError} />;
    }
    return (
        <LoaderError loading={loading || dataLoading} error={error || dataError}>
            <div className='w-full bg-white h-[70vh] rounded-sm shadow-sm p-4'>
                <div className='h-full overflow-y-auto'>
                <table className='w-full border-collapse'> 
                    <thead>
                        <tr className='border-b text-gray-500'>
                            <td className='py-3 px-4 text-left'>
                                Domain URL
                            </td>
                            <td className='py-3 px-4 text-left'>
                                Active Status
                            </td>
                            <td className='py-3 px-4 text-left'>
                                Verification Status
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className='border-b hover:bg-gray-50'>
                                <td className='py-4 px-4 flex flex-row items-center gap-2'>
                                    <div>
                                        {item.isActive ? (
                                            <div className="w-2 h-2 rounded-full bg-activeColor"></div>
                                        ) : (
                                            <RiErrorWarningLine  className='text-notActiveColor'/>
                                        )}
                                    </div>
                                    <div>
                                    {
                                        item.domain.startsWith('http://') || item.domain.startsWith('https://') 
                                            ? item.domain 
                                            : `https://${item.domain}`
                                    }
                                    </div>
                                    <SimpleSnackbar />
                                </td>
                                <td className={`py-4 px-4 ${item.isActive ? 'text-activeColor' : 'text-notActiveColor'}`}>
                                    {item.isActive ? 'Active' : 'Not Active'}
                                </td>
                                <td className="py-4 px-4">
                                    {item.status === "verified" ? (
                                        <span className="text-activeColor flex items-center gap-1">
                                            <span>
                                                Verified
                                            </span>
                                        </span>
                                    ) : item.status === "pending" ? (
                                        <span className="text-yellow-500 flex items-center gap-1">
                                            <span>
                                                Pending
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="text-notActiveColor flex items-center gap-1">
                                            <span>
                                                Not Verified
                                            </span>
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <LongMenu domainId={item.id} onDelete={handleDelete} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </LoaderError>
    );
}

export default UrlBox;