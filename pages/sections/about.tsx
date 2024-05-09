
const About=()=> {
  return (
    <div className="container my-24 mx-auto md:px-6">
  <section className="mb-32 text-center lg:text-left">
    <div
      className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="flex flex-wrap items-center">
        <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
          <div className="px-6 py-12 md:px-12">
            <h2 className="display-5 mb-6 text-4xl font-bold text-primary dark:text-primary-400">
              About Us
            </h2>
            <p className="mb-12 text-neutral-500 dark:text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi culpa aliquid, iusto magni laboriosam aut vero, suscipit doloremque libero, provident saepe at eum fugiat sit! Nulla dolor asperiores officiis illum.
            </p>
          </div>
        </div>
        <div className="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  </section>
</div>
  )
}

export default About
