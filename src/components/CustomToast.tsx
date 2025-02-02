'use client'
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
    title?: string;
}

const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    duration = 5000,
    onClose,
    title,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const variants = {
        initial: {
            opacity: 0,
            y: -20,
            x: 20,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.5,
                bounce: 0.3
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.9,
            transition: {
                duration: 0.2
            }
        }
    };

    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
                    bgColor: 'bg-green-500/10',
                    borderColor: 'border-green-500/20',
                    textColor: 'text-green-500'
                };
            case 'error':
                return {
                    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
                    bgColor: 'bg-red-500/10',
                    borderColor: 'border-red-500/20',
                    textColor: 'text-red-500'
                };
            default:
                return {
                    icon: <Info className="w-5 h-5 text-blue-500" />,
                    bgColor: 'bg-blue-500/10',
                    borderColor: 'border-blue-500/20',
                    textColor: 'text-blue-500'
                };
        }
    };

    const styles = getToastStyles();

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`fixed top-4 right-4 max-w-sm w-[90%] md:w-96 p-4 rounded-lg shadow-lg backdrop-blur-sm border ${styles.bgColor} ${styles.borderColor} z-50`}
        >
            <div className="flex items-start gap-3">
                {styles.icon}
                <div className="flex-1 min-w-0">
                    {title && (
                        <h3 className={`font-medium text-sm ${styles.textColor}`}>
                            {title}
                        </h3>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {message}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
};

// Toast Container Component to manage multiple toasts
interface Toast {
    id: string;
    message: string;
    type?: ToastType;
    title?: string;
}

interface ToastContainerProps {
    toasts: Toast[];
    removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        title={toast.title}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;