import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const ToastContext = createContext()

function ToastProvider({ children }) {
    const [toast, setToast] = useState({ show: false, message: '', type: '' })

    function showToast(message, type) {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 3000);
    }

    // 2. Create a function to clear it when clicked
    function closeToast() {
        setToast({ show: false, message: '', type: '' });
    }


    return (
        <>
            <ToastContext.Provider value={{ showToast }}>
                {children}
            </ToastContext.Provider>
            {toast.show && (
                <div
                    className={`z-[1000] fixed 
      /* Mobile: Top center, full width with margins */
      top-4 left-4 right-4 
      /* Desktop: Bottom right, fixed width */
      md:top-auto md:left-auto md:bottom-5 md:right-5 md:w-[350px]
      
      flex items-start justify-between gap-3 px-4 py-3.5 rounded-xl shadow-xl border font-medium text-sm
      transition-all duration-300 ease-out animate-fade-in
      ${toast.type === 'success'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-emerald-100/50'
                            : 'bg-rose-50 border-rose-200 text-rose-900 shadow-rose-100/50'
                        }`}
                >
                    <div className="flex items-start gap-3">

                        {/* Message Text */}
                        <span className="break-words leading-relaxed">{toast.message}</span>
                    </div>

                    {/* Right Side: Close Button */}
                    <button
                        onClick={closeToast}
                        className={`p-1 -mr-1 -mt-1 rounded-md transition-colors font-bold text-xs shrink-0
        ${toast.type === 'success'
                                ? 'text-emerald-500 hover:bg-emerald-100 hover:text-emerald-700'
                                : 'text-rose-500 hover:bg-rose-100 hover:text-rose-700'
                            }`}
                        aria-label="Close notification"
                    >
                        ✕
                    </button>
                </div>
            )}
        </>
    )
}

export default ToastProvider
