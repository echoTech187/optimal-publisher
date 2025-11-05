"use client";
import { Icon } from "@iconify/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPricingPackages, updateHkiPackage } from "@/features/hki/actions/actions";

// Helper to map color names from API to Tailwind CSS classes
const colorMap = {
    blue: {
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
        borderColor: "border-blue-600",
    },
    purple: {
        iconColor: "text-purple-600",
        bgColor: "bg-purple-100",
        buttonColor: "bg-purple-600 hover:bg-purple-700",
        borderColor: "border-purple-600",
    },
};

const PricingCard = ({ plan, onSelect, isUpdating }:{ plan: { color: string; icon: string; name: string; description: string; features: string[]; price: string; deliveryTime: string; popular: boolean; id: string; }; onSelect: (arg0: string) => void; isUpdating: boolean; }) => {
    const theme = colorMap[plan.color as keyof typeof colorMap] || colorMap.blue; // Default to blue theme

    return (
        <div className={`bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative ${plan.popular ? `border-2 ${theme.borderColor}` : ''}`}>
            {plan.popular && (
                <div className="absolute top-0 -mt-4 right-8 bg-yellow-400 text-gray-800 text-sm font-bold px-4 py-1 rounded-full flex items-center">
                    <Icon icon="ion:star" className="mr-1" />
                    Paling Populer
                </div>
            )}
            <div className="flex items-center mb-6">
                <div className={`p-4 rounded-xl ${theme.bgColor} mr-5`}>
                    <Icon icon={plan.icon} className={`text-4xl ${theme.iconColor}`} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-3xl font-bold text-gray-800">Rp {plan.price} <span className="text-lg font-normal text-gray-500">/ Sekali</span></p>
                <div className="flex items-center text-gray-500 mt-2">
                    <Icon icon="ion:time-outline" className="mr-2" />
                    <span>Terbit {plan.deliveryTime}</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                            <Icon icon="ion:checkmark-outline" className="text-green-500 text-xl mr-3" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                <button 
                    type="button" 
                    onClick={() => onSelect(plan.id)} 
                    disabled={isUpdating}
                    className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-colors ${theme.buttonColor} flex items-center justify-center disabled:bg-gray-400`}>
                    {isUpdating ? 'Memproses...' : `Pilih Paket ${plan.name}`}
                    {!isUpdating && <Icon icon="ion:arrow-forward-outline" className="ml-2" />}
                </button>
            </div>
        </div>
    );
};

function PricingPageContent() {
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(0); // To track which plan is being updated

    const searchParams = useSearchParams();
    const router = useRouter();
    const code_transaction = searchParams.get('code_transaction');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await getPricingPackages();
                setPlans(data);
            } catch (e : any) {
                setError(e.message);
                console.error("Failed to fetch pricing plans:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handlePlanSelection = async (package_id : number) => {
        if (!code_transaction) {
            alert("Error: code_transaction tidak ditemukan di URL.");
            return;
        }

        setUpdatingId(package_id);
        setError("");

        try {
            const result = await updateHkiPackage({ code_transaction, package_id });
            console.log("Update success:", result);
            // Redirect to payment page, passing the transaction code
            router.push(`/hki/payment?code_transaction=${code_transaction}`);
        } catch (e : any) {
            setError(e.message);
            console.error("Failed to update package:", e);
            alert(`Gagal memperbarui paket: ${e.message}`);
        } finally {
            setUpdatingId(0);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <p className="text-center">Loading pricing plans...</p>;
        }

        if (error && plans.length === 0) { // Only show main error if plans fail to load
            return <p className="text-center text-red-500">Error: {error}</p>;
        }

        return (
            <div className="flex flex-wrap justify-center gap-8">
                {plans.map((plan) => (
                    <PricingCard 
                        key={plan.id} 
                        plan={plan} 
                        onSelect={handlePlanSelection} 
                        isUpdating={updatingId === plan.id}
                    />
                ))}
            </div>
        );
    };
    console.log("Plans:", plans);
    console.log("Updating ID:", updatingId);
    console.log("Error:", error);
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="bg-purple-100 text-purple-700 font-semibold px-4 py-1 rounded-full text-sm">Harga Terbaik untuk Anda</span>
                    <h1 className="text-4xl font-bold text-gray-800 mt-4">Pilih Paket Pendaftaran HKI</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Pilih paket yang sesuai dengan kebutuhan anda. Semua paket sudah termasuk sertifikat resmi dan dukungan penuh.
                    </p>
                </div>
                {error && updatingId && <p className="text-center text-red-500 mt-4">Gagal memperbarui paket. Silakan coba lagi.</p>}
                {renderContent()}
                
            </div>
        </div>
    );
}

// Wrap the page with Suspense because useSearchParams requires it.
export default function HKIPricingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PricingPageContent />
        </Suspense>
    );
}
