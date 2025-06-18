import { useUpdateCall, useQueryCall } from '@ic-reactor/react';

export default function HomePage() {
  const { data: count, refetch } = useQueryCall({
    functionName: 'get',
  });

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: refetch,
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Home Page, {count ? count.toString() : 'Loading...'}
      </h1>
      <p className="text-lg text-gray-700">
        This is a simple home page built with React and Tailwind CSS.
      </p>
    </div>
  );
}
