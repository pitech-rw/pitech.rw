import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import storage from '../../service/firebase';

const Contactus = () => {
  const [message, setMessage] = useState({});
  const [sent, setSent] = useState(false);
  const updateMessage = (e: any) => {
    const { name } = e.target;
    const { value } = e.target;
    setMessage((values) => ({ ...values, [name]: value }));
  };

  const saveContactMessage = async (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;


    try {
      await addDoc(collection(storage, 'contacts'), message);
      setSent(true);


      setTimeout(() => setSent(false), 5400);
      form.reset();

    } catch (e) { console.log(e) }
    console.log("The email was not sent:", message);
  };
  return (
    <div className="container my-24 mx-auto md:px-6 scroll-mt-24" id="contact">
      <section className="mb-32 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">


        <div className="flex justify-center">

          <div className="text-center md:max-w-xl lg:max-w-3xl">
            <h2 className="mb-12 px-6 text-3xl font-bold mt-5">Contact us</h2>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
            <form onSubmit={saveContactMessage}>


              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Jean Nkusi"
                  className="mt-1 mb-2 block w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-white
                 placeholder-gray-500 shadow-sm
                 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-white
                 placeholder-gray-500 shadow-sm
                 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <p className="mt-1 mb-2 text-xs text-gray-400">We’ll only use this to reply.</p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="How can we help?"
                  className="mt-2 mb-2 block w-full resize-y rounded-md border border-gray-600 bg-transparent px-3 py-2 text-white
                 placeholder-gray-500 shadow-sm
                 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400
               focus:ring-offset-2 focus:ring-offset-gray-900"
                type="submit"
              >
                Send
              </button>
              <div><label className={`text-blue-400 ${sent ? "opacity-100" : "opacity-0"}`}>
                Your message was sent successfully.
              </label></div>
            </form>
          </div>
          <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
            <div className="flex flex-wrap">
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold dark:text-white">
                      Info and sales
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-200">
                      info@pitech.rw
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-200">
                      +250788231926
                    </p>
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

export default Contactus;
