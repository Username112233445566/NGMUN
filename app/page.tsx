import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Committees from './components/Committees';
import Registration from './components/Registration';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Committees />
        <Registration />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}