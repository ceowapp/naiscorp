export const services  = [
  { title: 'Production House', imgSrc: '/images/service-1.png' },
  { title: 'Applied AI Solutions', imgSrc: '/images/service-2.png' },
  { title: 'Investment & Incubation', imgSrc: '/images/service-3.png' },
  { title: 'Smart Robotics', imgSrc: '/images/service-4.png' },
  { title: 'Insurtech', imgSrc: '/images/service-5.png' },
];

export const solutions = [
  "Reliable High-Performance Computing and Distributed Systems",
  "Big Data - Data Lake - Data Warehouse",
  "AI-Powered Recognition and Automation",
  "Digital Maps and Resource Management",
  "Golf Technology Solutions",
  "SOTA Tech applications on demand",
  "Robotics and Smart Hardware",
  "Insurance Technology Solutions",
  "Business Intelligence and Enterprise Solutions",
  "E-Commerce and Consumer Platforms",
  "Industrial level AI On Demand",
];

export const offers = [
  { 
    title: 'Production House', 
    description: 'Leverage cutting-edge AI technologies to transform your business operations with our comprehensive suite of SOTA applications, custom AI assistants, and advanced data management solutions.',
    image: '/images/offer-1.png',
    color: '#FFEECC',
    chipGroups: [
      ['SOTA AI Apps', 'Private AI Assistant'],
      ['Data Warehouse', ['BigData', 'DMS']]
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 160, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } },
        { start: { x: 0, y: 120 }, end: { x: 120, y: 40 } },
        { start: { x: 0, y: 160 }, end: { x: 240, y: 40 } }
      ]
    }
  },
  { 
    title: 'Applied AI Solutions', 
    description: 'Implement powerful edge computing solutions with ROS2 integration, bringing AI capabilities directly to your devices for enhanced performance and real-time processing.',
    image: '/images/offer-2.png',
    color: '#CCE5FF',
    chipGroups: [
      ['Edge Computing', ['ROS2', 'AI on Edge']],
      ['3D Cognition Perception']
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 140, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } },
        { start: { x: 0, y: 120 }, end: { x: 180, y: 40 } }
      ]
    }
  },
  { 
    title: 'Investment', 
    description: 'Access high-performance computing solutions and real-time systems, backed by sophisticated data analytics and middleware integration for optimal business growth.',
    image: '/images/offer-3.png',
    color: '#E0FFE0',
    chipGroups: [
      ['High Performance Core', 'Realtime System'],
      ['Data Analytics', 'Middleware', 'Sale Portal']
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 180, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } },
        { start: { x: 0, y: 120 }, end: { x: 120, y: 40 } },
        { start: { x: 0, y: 160 }, end: { x: 240, y: 40 } }
      ]
    }
  },
  { 
    title: 'Smart Robotics', 
    description: 'Enhance your operations with advanced robotics solutions featuring computer vision, edge AI processing, and comprehensive automation systems.',
    image: '/images/offer-4.png',
    color: '#FFF0F0',
    chipGroups: [
      ['Computer Vision', 'AI on Edge'],
      ['Automation System']
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 160, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } }
      ]
    }
  },
  { 
    title: 'Insurtech', 
    description: 'Revolutionize insurance processes with our innovative insurtech solutions, streamlining claims management and providing advanced risk assessment tools.',
    image: '/images/offer-2.png',
    color: '#F0F0FF',
    chipGroups: [
      ['Insurance', 'Claims', 'Risk'],
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 120, y: 0 } },
        { start: { x: 0, y: 80 }, end: { x: 240, y: 0 } }
      ]
    }
  },
  { 
    title: 'Production House', 
    description: 'Create stunning visual content with our professional production services, including high-quality video production, animation, advanced editing, and VFX capabilities.',
    image: '/images/offer-2.png',
    color: '#FFEECC',
    chipGroups: [
      ['Video', 'Animation'],
      ['Editing', 'VFX']
    ],
    chipPositions: {
      0: [
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        { start: { x: 0, y: 40 }, end: { x: 140, y: 0 } }
      ],
      1: [
        { start: { x: 0, y: 80 }, end: { x: 0, y: 40 } },
        { start: { x: 0, y: 120 }, end: { x: 160, y: 40 } }
      ]
    }
  }
];

export const testOffers = [
  { 
    title: 'Production House', 
    description: 'Leverage cutting-edge AI technologies to transform your business operations with our comprehensive suite of SOTA applications, custom AI assistants, and advanced data management solutions.',
    image: '/images/offer-1.png',
    color: '#FFEECC',
    chipGroups: [
      ['SOTA AI Apps', 'Private AI Assistant'],
      ['Data Warehouse', ['BigData', 'DMS']]
    ]
  },
  { 
    title: 'Applied AI Solutions', 
    description: 'Implement powerful edge computing solutions with ROS2 integration, bringing AI capabilities directly to your devices for enhanced performance and real-time processing.',
    image: '/images/offer-2.png',
    color: '#CCE5FF',
    chipGroups: [
      ['Edge Computing', 'ROS2'],
      ['AI on Edge', '3D Cognition Perception']
    ]
  },
  { 
    title: 'Investment & Incubation', 
    description: 'Access high-performance computing solutions and real-time systems, backed by sophisticated data analytics and middleware integration for optimal business growth.',
    image: '/images/offer-3.png',
    color: '#E0FFE0',
    chipGroups: [
      ['High Performance Core', 'Realtime System'],
      ['Data Analytics', 'Middleware', 'Sale Portal']
    ]
  },
  { 
    title: 'Smart Robotics', 
    description: 'Enhance your operations with advanced robotics solutions featuring computer vision, edge AI processing, and comprehensive automation systems.',
    image: '/images/offer-4.png',
    color: '#FFF0F0',
    chipGroups: [
      ['Computer Vision', 'AI on Edge'],
      ['Automation System']
    ]
  },
  { 
    title: 'Insurtech', 
    description: 'Revolutionize insurance processes with our innovative insurtech solutions, streamlining claims management and providing advanced risk assessment tools.',
    image: '/images/offer-2.png',
    color: '#F0F0FF',
    chipGroups: [
      ['Insurance', 'Claims', 'Test'],
      ['Risk']
    ]
  },
  { 
    title: 'Production House', 
    description: 'Create stunning visual content with our professional production services, including high-quality video production, animation, advanced editing, and VFX capabilities.',
    image: '/images/offer-2.png',
    color: '#FFEECC',
    chipGroups: [
      ['Video', 'Animation'],
      ['Editing', 'VFX']
    ]
  },
  { 
    title: 'Applied AI Solutions', 
    description: 'Harness the power of artificial intelligence with our comprehensive AI solutions, including machine learning, natural language processing, and computer vision applications.',
    image: '/images/offer-2.png',
    color: '#CCE5FF',
    chipGroups: [
      ['ML', 'NLP'],
      ['Computer Vision', 'AI']
    ]
  },
  { 
    title: 'Investment & Incubation', 
    description: `Accelerate your startup's growth with our investment and incubation programs, providing funding opportunities and strategic guidance for sustainable development.`,
    image: '/images/offer-2.png',
    color: '#E0FFE0',
    chipGroups: [
      ['Startup', 'Funding'],
      ['Growth']
    ]
  },
  { 
    title: 'Smart Robotics', 
    description: 'Transform your operations with IoT-enabled smart robotics solutions, featuring advanced automation capabilities and seamless hardware integration.',
    image: '/images/offer-2.png',
    color: '#FFF0F0',
    chipGroups: [
      ['IoT', 'Automation'],
      ['Hardware']
    ]
  },
  { 
    title: 'Insurtech', 
    description: 'Modernize your insurance operations with digital solutions that streamline claims processing, enhance risk assessment, and improve customer experience.',
    image: '/images/offer-2.png',
    color: '#F0F0FF',
    chipGroups: [
      ['Insurance', 'Claims'],
      ['Risk']
    ]
  },
];

export const projectData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    image: "/images/highlight-1.png",
    description: "A full-stack e-commerce solution with real-time inventory management and secure payment processing."
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    image: "/images/highlight-1.png",
    description: "Smart conversational AI platform powered by machine learning for customer support automation."
  },
  {
    id: 3,
    title: "Health & Fitness App",
    image: "/images/highlight-1.png",
    description: "Mobile application for tracking workouts, nutrition, and personal health goals with social features."
  },
  {
    id: 4,
    title: "Smart Home Dashboard",
    image: "/images/highlight-1.png",
    description: "IoT control center for managing connected devices, energy consumption, and home automation."
  },
  {
    id: 5,
    title: "Financial Analytics",
    image: "/images/highlight-1.png",
    description: "Real-time financial data visualization and analysis tool for investment decision-making."
  },
  {
    id: 6,
    title: "Social Media Manager",
    image: "/images/highlight-1.png",
    description: "Unified platform for scheduling, analyzing, and managing multiple social media accounts."
  },
  {
    id: 7,
    title: "Learning Management",
    image: "/images/highlight-1.png",
    description: "Educational platform featuring course creation, student progress tracking, and interactive learning."
  },
  {
    id: 8,
    title: "Travel Planner",
    image: "/images/highlight-1.png",
    description: "Comprehensive travel planning tool with itinerary management and local recommendations."
  },
  {
    id: 9,
    title: "Weather Forecast",
    image: "/images/highlight-1.png",
    description: "Advanced weather prediction system with real-time updates and severe weather alerts."
  },
  {
    id: 10,
    title: "Task Management",
    image: "/images/highlight-1.png",
    description: "Collaborative project management tool with task tracking, deadlines, and team coordination."
  }
];

export const newsItems = [
  {
    imageSrc: '/images/news-1.png',
    title: 'Successfully invested and incubated startups like VGS',
    description: 'Co-fund Handapp, Vbee AI call bot, Conn- HR management, 2019-2023 in Emai- FHB Automation',
  },
  {
    imageSrc: '/images/news-1.png',
    title: 'Successfully invested and incubated startups like VGS',
    description: 'Co-fund Handapp, Vbee AI call bot, Conn- HR management, 2019-2023 in Emai- FHB Automation',
  },
  {
    imageSrc: '/images/news-1.png',
    title: 'Successfully invested and incubated startups like VGS',
    description: 'Co-fund Handapp, Vbee AI call bot, Conn- HR management, 2019-2023 in Emai- FHB Automation',
  },
  {
    imageSrc: '/images/news-1.png',
    title: 'Successfully invested and incubated startups like VGS',
    description: 'Co-fund Handapp, Vbee AI call bot, Conn- HR management, 2019-2023 in Emai- FHB Automation',
  },
];

export const whyItems = [
  {
    imageSrc: '/images/mission-1.png',
    title: 'Cost Saving',
    description: 'Helping clients reduce expenses by automating processes and optimizing energy use.',
  },
  {
    imageSrc: '/images/mission-2.png',
    title: 'Increased Efficiency',
    description: 'Delivering technologies that streamline operations and improve productivity across industries.',
  },
  {
    imageSrc: '/images/mission-3.png',
    title: 'Future-Proof Solutions',
    description: 'Providing scalable systems that adapt to evolving business needs, ensuring long-term operational success.',
  },
];

export const infoData = [
  {
    title: "Energy-Efficient Technologies",
    color: "blue",
    points: [
      "Developing AI and robotics systems that consume less energy while maintaining performance.",
      "Leveraging low-power computing technologies like analog chips to reduce operational energy costs."
    ]
  },
  {
    title: "Sustainable Automation",
    color: "green",
    points: [
      "Transforming industries with AI-driven solutions to streamline processes and reduce waste.",
      "Providing automated systems that improve efficiency, accuracy, and turnaround time."
    ]
  },
  {
    title: "Boosting Productivity Through Technology",
    color: "cyan",
    points: [
      "Offering AI tools to automate repetitive tasks, freeing resources for high-value activities.",
      "Creating integrated systems for data-driven decision-making to enhance business scalability."
    ]
  },
  {
    title: "Operational Cost Reduction",
    color: "orange",
    points: [
      "Utilizing AI for predictive analytics and maintenance, reducing downtime and repair costs.",
      "Enhancing efficiency in industries like insurance and F&B with AI-driven claims assessments and resource allocation."
    ]
  }
];

export const navbarLinks = ['Home', 'About', 'Divisions', 'Our Solutions', 'Technology', 'Careers', 'Contact'];

export const contactFields = [
  { label: "Name", type: "text", placeholder: "Your name" },
  { label: "Phone number", type: "tel", placeholder: "Your phone number" },
  { label: "Email", type: "email", placeholder: "Email" },
];