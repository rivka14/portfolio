const Experience = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description: [
        "Led development of responsive web applications using React and Next.js",
        "Collaborated with design team to implement pixel-perfect UI/UX designs",
        "Mentored junior developers and conducted code reviews",
        "Improved application performance by 40% through optimization techniques"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations LLC",
      period: "2020 - 2022",
      description: [
        "Developed and maintained full-stack web applications",
        "Built RESTful APIs using Node.js and Express.js",
        "Worked with PostgreSQL and MongoDB databases",
        "Implemented CI/CD pipelines and automated testing"
      ]
    },
    {
      title: "Junior Web Developer",
      company: "StartUp Hub",
      period: "2019 - 2020",
      description: [
        "Created responsive websites using HTML, CSS, and JavaScript",
        "Collaborated with cross-functional teams to deliver projects",
        "Learned modern development practices and version control",
        "Contributed to open source projects and community initiatives"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-300 dark:bg-blue-700"></div>
          
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>
                
                {/* Content */}
                <div className="ml-20 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {experience.title}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">
                        {experience.company}
                      </p>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mt-1 sm:mt-0">
                      {experience.period}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {experience.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;