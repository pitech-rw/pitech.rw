import Testimonials from "./sections/testimonials";
import About from "./sections/about";
import Contactus from "./sections/contactus";
import Footer from "./sections/footer";

const IndexPage = () => {
  return (
    <div className="container mx-auto">
      <section className="background-radial-gradient mb-32">
        <style>
          {`.background-radial-gradient {
            background-color: hsl(218, 41%, 15%);
            background-image: radial-gradient(650px circle at 0% 0%,
                hsl(218, 41%, 35%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%),
              radial-gradient(1250px circle at 100% 100%,
                hsl(218, 41%, 45%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%);
          }`}
        </style>

        <div className="px-6 py-12 text-center md:px-12 lg:text-left">
          <div className="container mx-auto">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="mt-12 lg:mt-0">
                <h1 className="mb-12 text-5xl font-bold tracking-tight text-[hsl(218,81%,95%)] md:text-6xl xl:text-7xl">
                  We are <br /><span className="text-[hsl(218,81%,75%)]">Pitech</span>
                </h1>
                <p className="text-lg text-[hsl(218,81%,95%)]">
                  We like to look at Technology as a tool that gives people endless possibilities where the limit is only your imagination.
                </p>
              </div>
              <div className="mb-12 lg:mb-0">
                {/* <div className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden rounded-lg shadow-lg"
                  style={{ paddingTop: "56.25%" }}>
                  <iframe className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full"
                    src="https://www.youtube.com/embed/vlDzYIIOYmM?enablejsapi=1&amp;origin=https%3A%2F%2Fmdbootstrap.com"
                    allowFullScreen="" data-gtm-yt-inspected-2340190_699="true" id="240632615"></iframe>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <About/>
      <Testimonials/>
      <Contactus/>
      <Footer/>
    </div>
  )
}

export default IndexPage;
