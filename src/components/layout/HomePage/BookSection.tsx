/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function BookSection({ data, meta }: any) {
    const router = useRouter();
    const { currentPage, totalPages } = meta;

    const handlePageChange = (page: number) => {
        router.push(`/?page=${page}`);
    };

    const renderPaginationItems = () => {
        const items = [];

        for (let page = 1; page <= totalPages; page++) {
            items.push(
                <li key={page}>
                    <Link
                        href={`?page=${page}`}
                        className={`px-3 py-2 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400`}
                    >
                        {page}
                    </Link>
                </li>
            );
        }

        return items;
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg shadow-lg p-4 bg-white">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-2">Author: {item.author}</p>
                        <p className="text-gray-600 mb-2">Genre: {item.genre}</p>
                        <p className="text-gray-600 mb-2">
                            Published: {new Date(item.publicationDate).toLocaleDateString('en-GB')}
                        </p>
                        <p className="text-gray-600 mb-2">Page Count: {item.pageCount}</p>
                        <p className="text-gray-600 mb-2">Language: {item.language}</p>
                        <p className="text-gray-600 mb-4">Publisher: {item.publisher}</p>
                    </div>
                ))}
            </div>

            <ul className="flex items-center justify-center mt-12 space-x-2">
                <li>
                    <button
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-md ${currentPage === 1 ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-gray-200 text-black hover:bg-blue-400'}`}
                    >
                        Previous
                    </button>
                </li>

                {renderPaginationItems()}

                <li>
                    <button
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-md ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-gray-200 text-black hover:bg-blue-400'}`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default BookSection;