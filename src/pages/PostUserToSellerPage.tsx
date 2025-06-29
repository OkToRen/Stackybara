import { backend } from "@/declarations/backend";
import { useAuthContext } from "@/lib/AuthContext";
import { useState, useEffect } from "react";
import { Input } from '@/components/ui/input';
import { useNavigate } from "react-router-dom";

export default function PostUserToSellerPage() {
    const auth = useAuthContext();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkStore = async () => {
            console.log(auth.principal)
            try {
                const store = await backend.getStoreProfile(auth.principal);
                console.log(store);
                if (store.length != 0) navigate('/seller/profile');
            } catch (err) {
                console.error("Error fetching store:", err);
            }
        };
        checkStore();
    }, []);

    const bindStore = (name: string, desc: string, location: string) => {
        console.log('binding store to user')
        backend.bindNewStore(auth.principal, name, desc, location)
        console.log('store successfully binded')
        navigate('/seller/profile')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-xl rounded-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-900">
                        Configure your store
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Fill in your information to begin your Shoppybara experience
                    </p>
                </div>
                <form className="mt-8 space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        bindStore(name, desc, location);
                    }}
                >
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-amber-900 mb-1">
                                Store Name
                            </label>
                            <Input className="w-full border-amber-300 focus:border-teal-400"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-amber-900 mb-1">
                                Store Description
                            </label>
                            <Input className="w-full border-amber-300 focus:border-teal-400"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-amber-900 mb-1">
                                Store Location
                            </label>
                            <Input className="w-full border-amber-300 focus:border-teal-400"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            Save Store Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}