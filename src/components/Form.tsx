import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster";
import QRCode from '../assets/QR.jpg';
import { ToastContainer } from "@/components/CustomToast";
interface FormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phoneNumber: string;
    subject: string;
    upiId: string;
}


interface Toast {
    id: string;
    message: string;
    type?: "success" | "error" | "info";
    title?: string;
}

const RegistrationForm: React.FC<FormProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        upiId: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: "success" | "error" | "info", title?: string) => {
        const newToast = {
            id: Date.now().toString(),
            message,
            type,
            title,
        };
        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            removeToast(newToast.id);
        }, 5000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };


    const formVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", damping: 20, stiffness: 200 },
        },
        exit: { y: 50, opacity: 0, transition: { duration: 0.2 } },
    };

    const subjects = [
        { value: "CE", label: "Computer Engineering" },
        { value: "ME", label: "Mechanical Engineering" },
        { value: "EE", label: "Electrical Engineering" },
        { value: "CS", label: "Computer Science" }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://p9ddheua5j.execute-api.ap-south-1.amazonaws.com/dev/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                addToast(
                    "A confirmation email will be sent shortly after we verify your payment.",
                    "success",
                    "Registration Successful! 🎉"
                );

                setFormData({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    subject: "",
                    upiId: "",
                });
            } else {
                addToast("Please try again later or contact support.", "error", "Registration Failed");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            addToast("Something went wrong. Please try again.", "error", "Error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleQRClick = () => {
        const googlePayUrl = `tez://upi/pay?pa=xyz@upi&pn=Registration%20Payment`;
        window.location.href = googlePayUrl;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm z-50">
                        <motion.div
                            className="absolute inset-0"
                            onClick={onClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative z-50 w-[90%] sm:max-w-2xl bg-[#0a0f1e]/95 border border-[#60a5fa]/20 rounded-2xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl max-h-[95%] mb-5 sm:max-h-none overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                            >
                                <X className="w-4 sm:w-5 h-4 sm:h-5" />
                            </button>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Form Section */}
                                <div className="flex-1">
                                    <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                                        Registration Form
                                    </h2>
                                    <p className="text-xs sm:text-sm text-white/60 mt-1">Fill in your details to get started</p>

                                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60a5fa]/50 focus:border-[#60a5fa] text-xs sm:text-sm text-white placeholder-white/40 transition-all"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60a5fa]/50 focus:border-[#60a5fa] text-xs sm:text-sm text-white placeholder-white/40 transition-all"
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60a5fa]/50 focus:border-[#60a5fa] text-xs sm:text-sm text-white placeholder-white/40 transition-all"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">
                                                Subject *
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60a5fa]/50 focus:border-[#60a5fa] text-xs sm:text-sm text-white transition-all"
                                            >
                                                <option value="" className="bg-[#0a0f1e] text-white">Select a subject</option>
                                                {subjects.map((subject) => (
                                                    <option key={subject.value} value={subject.value} className="bg-[#0a0f1e] text-white">
                                                        {subject.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">
                                                UPI ID *
                                            </label>
                                            <input
                                                type="text"
                                                name="upiId"
                                                value={formData.upiId}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#60a5fa]/50 focus:border-[#60a5fa] text-xs sm:text-sm text-white placeholder-white/40 transition-all"
                                                placeholder="Enter your UPI ID"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full px-6 py-3 mt-4 rounded-xl bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#c084fc] text-xs sm:text-sm text-white font-medium hover:opacity-90 transition-all duration-200 focus:ring-2 focus:ring-[#60a5fa]/50 shadow-lg shadow-[#60a5fa]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                                        </button>
                                    </form>
                                </div>

                                {/* QR Code Section */}
                                <div className="sm:w-64 flex flex-col items-center sm:mt-36 sm:justify-center h-full">
                                    <button 
                                        onClick={handleQRClick}
                                        className="group relative cursor-pointer transition-all duration-200 hover:opacity-90"
                                    >
                                        <div className="w-40 h-40 bg-white/5 rounded-2xl flex items-center justify-center p-3 border border-white/10 group-hover:border-[#60a5fa]/30 transition-colors">
                                            <Image
                                                src={QRCode}
                                                alt="QR Code"
                                                className="w-36 h-36 object-contain rounded-xl"
                                            />
                                        </div>
                                        <div className="hidden sm:flex absolute inset-0 items-center justify-center bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white text-sm font-medium">Scan with camera</p>
                                        </div>
                                    </button>
                                    <p className="text-xs sm:text-sm text-white/60 mt-4">Scan to Pay</p>
                                    <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                                        UPI ID: <span className="text-[#60a5fa]">mrharshitshukla2672@oksbi</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <ToastContainer toasts={toasts} removeToast={removeToast} />
                </>
            )}
        </AnimatePresence>
    );
};

export default RegistrationForm;