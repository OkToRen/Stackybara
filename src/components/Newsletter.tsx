import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-500 to-teal-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
          Get the latest updates on new products, exclusive deals, and
          blockchain innovations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            placeholder="Enter your email"
            className="flex-1 bg-white border-0"
          />
          <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
