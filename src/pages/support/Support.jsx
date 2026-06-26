import React from "react";

const Support = () => {
  return (
    <main className="bg-[#030712] min-h-screen text-white overflow-hidden">

      <div className="absolute top-32 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-52 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      {/* HERO */}
      <section className="relative py-24 border-b border-[#12192d]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex px-4 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/10 mb-6">
            <span className="text-xs tracking-[3px] text-cyan-300 uppercase">
              Premium Support
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Need <span className="text-cyan-400">Assistance?</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Get help with orders, warranty claims, technical issues, and
            product support from our dedicated team.
          </p>
        </div>
      </section>

      {/* SUPPORT OPTIONS */}
      <section className="py-20 border-b border-[#12192d]">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-black mb-10">
            Support <span className="text-cyan-400">Services</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition">
              <div className="text-4xl mb-5 text-cyan-400">📦</div>
              <h3 className="text-xl font-bold mb-3">Order Tracking</h3>
              <p className="text-gray-400">
                Track shipments and monitor delivery status.
              </p>
            </div>

            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition">
              <div className="text-4xl mb-5 text-cyan-400">🔄</div>
              <h3 className="text-xl font-bold mb-3">Returns & Refunds</h3>
              <p className="text-gray-400">
                Easy return process with fast refund support.
              </p>
            </div>

            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition">
              <div className="text-4xl mb-5 text-cyan-400">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Warranty Claims</h3>
              <p className="text-gray-400">
                Premium protection and replacement services.
              </p>
            </div>

            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition">
              <div className="text-4xl mb-5 text-cyan-400">💬</div>
              <h3 className="text-xl font-bold mb-3">Live Assistance</h3>
              <p className="text-gray-400">
                Expert help available whenever you need it.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 border-b border-[#12192d]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* FORM */}
            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8">
              <h2 className="text-3xl font-black mb-8">
                Contact <span className="text-cyan-400">Support</span>
              </h2>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400"
                />

                <textarea
                  rows="5"
                  placeholder="Describe your issue..."
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400 resize-none"
                ></textarea>

                <button className="w-full py-4 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition">
                  Send Message
                </button>

              </div>
            </div>

            {/* SUPPORT INFO */}
            <div className="space-y-6">

              <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition">
                <h3 className="text-2xl font-bold mb-3">📧 Email Support</h3>
                <p className="text-gray-400">support@techstore.com</p>
              </div>

              <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition">
                <h3 className="text-2xl font-bold mb-3">📞 Phone Support</h3>
                <p className="text-gray-400">+92 300 1234567</p>
              </div>

              <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition">
                <h3 className="text-2xl font-bold mb-3">⏰ Working Hours</h3>
                <p className="text-gray-400">
                  Monday - Saturday <br />
                  9:00 AM - 9:00 PM
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 text-center">
              <h2 className="text-4xl font-black text-cyan-400 mb-3">
                10K+
              </h2>
              <p className="text-gray-400">Customers Helped</p>
            </div>

            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 text-center">
              <h2 className="text-4xl font-black text-cyan-400 mb-3">
                24/7
              </h2>
              <p className="text-gray-400">Live Support</p>
            </div>

            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 text-center">
              <h2 className="text-4xl font-black text-cyan-400 mb-3">
                98%
              </h2>
              <p className="text-gray-400">Satisfaction Rate</p>
            </div>

            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 text-center">
              <h2 className="text-4xl font-black text-cyan-400 mb-3">
                3 Min
              </h2>
              <p className="text-gray-400">Average Response</p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Support;