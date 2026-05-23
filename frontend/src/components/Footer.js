function Footer() {

  return (

    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 text-white py-8 mt-10">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* UNIVERSITY INFO */}

        <div>

          <h2 className="text-2xl font-bold text-cyan-400 mb-3">

            🎓 Zenith Global University

          </h2>

          <p className="text-gray-300 leading-relaxed">

            Excellence in Technology, Management,
            Design, Law & Innovation.

          </p>

        </div>

        {/* CONTACT INFO */}

        <div>

          <h3 className="text-xl font-semibold text-cyan-300 mb-3">

            Contact Us

          </h3>

          <p className="text-gray-300">

            📍 Mumbai, Maharashtra, India

          </p>

          <p className="text-gray-300 mt-2">

            📧 admissions@zenithglobaluniversity.edu

          </p>

          <p className="text-gray-300 mt-2">

            📞 +91 9876543210

          </p>

        </div>

        {/* COURSES */}

        <div>

          <h3 className="text-xl font-semibold text-cyan-300 mb-3">

            Popular Programs

          </h3>

          <ul className="text-gray-300 space-y-2">

            <li>B.Tech & M.Tech</li>

            <li>MBA & BBA</li>

            <li>LLB & Integrated Law</li>

            <li>B.Arch & B.Des</li>

            <li>Fashion Designing</li>

            <li>Journalism & Hotel Management</li>

          </ul>

        </div>

      </div>

      {/* COPYRIGHT */}

      <div className="border-t border-white/10 mt-8 pt-5 text-center text-gray-400 text-sm">

        © 2026 Zenith Global University. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;