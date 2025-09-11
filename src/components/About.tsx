const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <div className="w-56 h-56 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-6xl">👩‍💻</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I&apos;m a passionate developer with a love for creating innovative digital solutions. 
              With expertise in modern web technologies, I enjoy building applications that 
              make a real impact.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies, contributing 
              to open source projects, or sharing knowledge with the developer community.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Problem Solver</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Team Player</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Continuous Learner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;