import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="hero-inner">
          <h1>Fresh drops — curated for you</h1>
          <p>Electronics • Fashion • Accessories</p>
          <Link href="/products" className="btn">
            Browse Collections
          </Link>
        </div>
      </div>

      <main className="container">
        <h2 className="section-title">Welcome to Andre DC Store</h2>
        <p style={{textAlign: 'center', marginBottom: '30px'}}>
          Discover amazing products at great prices. From the latest electronics to stylish fashion and accessories.
        </p>

        <div style={{textAlign: 'center'}}>
          <Link href="/products" className="btn">
            Shop Now
          </Link>
        </div>
      </main>

      <footer className="footer">
        © 2025 andre-ecommerce
      </footer>
    </>
  );
}