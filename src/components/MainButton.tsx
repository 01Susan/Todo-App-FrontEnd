import React from 'react';

type MainButtonProps = {
    label: string;
    onclick: () => void;
    disabled?: boolean;
    loading?: boolean; // New prop for loading state
};

const MainButton: React.FC<MainButtonProps> = ({ label, onclick, disabled, loading }) => {
    return (
        <button
            onClick={onclick}
            disabled={disabled}
            className={`relative px-4 py-2 bg-purple text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 0112 4v4a4 4 0 00-4 4H6zm2 5.291A8.004 8.004 0 014 12h4a4 4 0 004 4V22zm8-5.291A8.004 8.004 0 0112 20v-4a4 4 0 004-4h4z"
                        />
                    </svg>
                </div>
            ) : (
                label
            )}
        </button>
    );
};

export default MainButton;
