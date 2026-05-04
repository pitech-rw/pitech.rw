import About from './sections/about';
import Contactus from './sections/contactus';
import Credibility from './sections/credibility';
import Footer from './sections/footer';
import Hero from './sections/hero';
import Process from './sections/process';
import Navbar from './sections/Navbar/navbar';
import Services from './sections/services';
import SelectedWork from './sections/testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Credibility />
        <Services />
        <Process />
        <About />
        <SelectedWork />
        <Contactus />
      </main>
      <Footer />
    </div>
  );
}
