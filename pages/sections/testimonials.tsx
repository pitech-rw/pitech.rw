const Testimonials = () => {
  return (
    <div className="container my-24 mx-auto md:px-6 scroll-mt-24" id="projects">
      <section className="mb-32">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Companies we worked together
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="mb-6 lg:mb-0">
            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="p-6">
                <div className="flex flex-wrap items-center">
                  <div className="flex-basis w-full shrink-0 grow-0 px-3 lg:w-5/12">
                    <div className="w-25 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:cursor-pointer flex items-center">
                      <img className="flex items-center h-12 w-auto " src="/irpv.svg" alt="Igenagaciro Logo"></img>
                    </div>
                  </div>
                  <div className="flex-basis w-full shrink-0 grow-0 px-3 lg:w-7/12">
                    <h5 className="mb-4 font-bold">Igenagaciro</h5>
                      <p><a href="https://igenagaciro.irpv.rw/"></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 lg:mb-0">
            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="p-6">
                <div className="flex flex-wrap items-center">
                  <div className="flex-basis w-full shrink-0 grow-0 px-3 lg:w-5/12">
                    <div className="w-25 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:cursor-pointer flex items-center">
                      <img src="/safari.png" alt="Safari Logo"></img>
                    </div>
                  </div>
                  <div className="flex-basis w-full shrink-0 grow-0 px-3 lg:w-7/12">
                    <h5 className="mb-4 font-bold">Feru Energy</h5>
                      <p><a href="https://www.safaricharger.com/"></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 lg:mb-0">
            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="p-6">
                <div className="flex flex-wrap items-center">
                  <div className="flex-basis w-full shrink-0 grow-0 px-3 lg:w-5/12">
                    <div className="w-25 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:cursor-pointer flex items-center">
                      <img src="/gorillagames.png" alt="Gorilla games Logo"></img>
                    </div>
                  </div>
                  <div className="flex-basis w-full shrink-0 grow-0 px-3 lg:w-7/12">
                    <h5 className="mb-4 font-bold">PlayGorilla Games</h5>
                      <a href="https://www.playgorillagames.com/"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
