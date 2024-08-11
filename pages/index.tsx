import Testimonials from './sections/testimonials';
import About from './sections/about';
import Contactus from './sections/contactus';
import Footer from './sections/footer';
import Navbar from './sections/navbar';

const IndexPage = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <section
        id="home"
        className="background-radial-gradient mb-32 h-screen flex items-center justify-center"
      >
        <div className="px-6 py-12 text-center md:px-12 lg:text-left">
          <div className="container mx-auto">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="mt-12 lg:mt-0">
                <h1 className="mb-12 text-5xl font-bold tracking-tight text-[hsl(218,81%,95%)] md:text-6xl xl:text-7xl">
                  We are <br />
                  <span className="text-[hsl(218,81%,75%)]">Pitech</span>
                </h1>
                <p className="text-lg text-[hsl(218,81%,95%)]">
                  We like to look at Technology as a tool that gives people
                  endless possibilities where the limit is only your
                  imagination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Testimonials />
      <Contactus />
      <Footer />
    </div>
  );
};

export default IndexPage;
