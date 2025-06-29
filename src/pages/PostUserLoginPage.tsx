import { useState, useEffect } from 'react';
import { backend } from '@/declarations/backend';
import { useAuthContext } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import StackybaraLoadingPage from "./LoadingScreen";

export default function PostUserLoginPage() {
  const { actor, isAuthenticated, principal } = useAuthContext();
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const registerUser = (name: string, email: string, address: string, phone: string) => {
    console.log('registering user');
    const response = backend.registerUser(
       name, email, phone, address, false, auth.principal,
    );
    console.log(Array.isArray(response) ? response[0] : undefined);
    console.log('registering user finished');
    navigate('/profile');
  };

  useEffect(() => {

    console.log("isAuthenticated:", isAuthenticated);
    console.log("principal:", principal.toText());

    const fetchUser = async () => {
      if (isAuthenticated) {
        try {
          const user = await backend.getUser(auth.principal);
          console.log(user);
          if (user.length != 0) navigate('/');
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, principal, actor]);

  // Add a loading state for authentication
  if (!isAuthenticated || !principal) {
    return <StackybaraLoadingPage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-xl rounded-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-900">
            Configure your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill in your information to begin your Shoppybara experience
          </p>
        </div>
        <form className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            registerUser(name, email, address, phone);
          }}
        >
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Full Name
              </label>
              <Input className="w-full border-amber-300 focus:border-teal-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Email Address
              </label>
              <Input className="w-full border-amber-300 focus:border-teal-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Address
              </label>
              <Input className="w-full border-amber-300 focus:border-teal-400"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Phone Number
              </label>
              <Input className="w-full border-amber-300 focus:border-teal-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}
