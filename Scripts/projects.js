document.addEventListener("DOMContentLoaded", function () {
  // Get all project cards
  const projectCards = document.querySelectorAll(".project-card");
  const projectDetails = document.getElementById("project-details");
  const projectPreview = document.getElementById("project-preview");
  const projectTitle = document.getElementById("project-title");
  const projectDescription = document.getElementById("project-description");
  const projectLanguages = document.getElementById("project-languages");
  const viewProjectBtn = document.getElementById("view-project-btn");

  // Default project data
  const defaultProjects = {
    // Web Development
    "Falcon Air Conditioning Website": {
      description:
        "A responsive website built with Next.js for Falcon Air Conditioning services. Features a modern UI with interactive elements and optimized performance.",
      languages: ["Next.js", "React", "JavaScript", "CSS"],
      image: "../projects/falcon-air-conditioning.jpg",
    },
    "Personal portfolio": {
      description:
        "A responsive portfolio website showcasing skills, projects, and professional experience. Built with semantic HTML, CSS, and vanilla JavaScript.",
      languages: ["HTML", "CSS", "JavaScript"],
      image: "../images/IMG20240229145746.jpg",
    },
    "Different Projects": {
      description:
        "A collection of small web projects built during learning journey, demonstrating progress in front-end development skills and techniques.",
      languages: ["HTML", "CSS", "JavaScript"],
      image: null,
    },
    "Online Library Website": {
      description:
        "A complete online library management system with user accounts, book cataloging, borrowing features, and admin dashboard.",
      languages: ["JavaScript", "HTML", "CSS", "API Integration"],
      image: null,
    },

    // Cybersecurity
    "CyberSec Toolkit": {
      description:
        "A comprehensive collection of cybersecurity tools and scripts for various security tasks, malware analysis, and testing OWASP vulnerabilities.",
      languages: ["Python", "Bash", "PowerShell"],
      image: null,
    },
    "FCAI Ciphers Examples": {
      description:
        "Implementation of various cryptographic ciphers for educational purposes, demonstrating encryption and decryption techniques.",
      languages: ["Python", "C++"],
      image: "../projects/fcai-ciphers.png",
    },
    "Malware analysis work shop": {
      description:
        "Repository containing materials from GDSC Malware analysis workshops, including analysis of ransomware, trojans, rootkits, and other malicious software.",
      languages: ["Assembly", "Python", "C++"],
      image: null,
    },
    "Hash Calculator": {
      description:
        "A tool for calculating various hash values (MD5, SHA-1, SHA-256) for files and text inputs with comparison capabilities.",
      languages: ["Python", "PyQt"],
      image: "../projects/hash-calculator.jpg",
    },
    "Key Logger": {
      description:
        "An educational key logging tool demonstrating input capture techniques. Developed for educational purposes only.",
      languages: ["Python", "C++"],
      image: "../projects/key-logger.jpg",
    },
    "Python Reverse Shell": {
      description:
        "A reverse shell implementation with persistence capabilities developed in Python, demonstrating network security concepts.",
      languages: ["Python", "Networking"],
      image: "../projects/python-reverse-shell.jpg",
    },
    "Neovim Configuration": {
      description:
        "Personalized Neovim configuration for efficient coding, featuring custom keybindings, plugins, and optimized settings.",
      languages: ["Lua", "Vim Script"],
      image: "../projects/nvim.png",
    },

    // Development
    "Binary Calculator": {
      description:
        "A calculator application that performs operations on binary numbers, including addition, subtraction, conversion between number systems.",
      languages: ["Python", "PyQt"],
      image: "../projects/binary-calculator.jpg",
    },
    "Vole Machine": {
      description:
        "A simulation of a simple machine architecture, implementing a virtual processor with custom instruction set.",
      languages: ["C++", "Assembly"],
      image: "../projects/vole-machine.jpg",
    },
    "OOP Board Games": {
      description:
        "Object-oriented implementation of classic board games with customizable rules and AI opponents.",
      languages: ["Java", "OOP Design Patterns"],
      image: "../projects/oop-board-games.jpg",
    },
    "Photoshop GUI Demo": {
      description:
        "A demonstration of a Photoshop-like GUI built with Python, featuring basic image manipulation tools and filters.",
      languages: ["Python", "PyQt", "OpenCV"],
      image: "../projects/photoshop-gui.jpg",
    },
    "Collage System Management": {
      description:
        "A comprehensive system for managing college-related tasks, student records, course information, and administrative functions.",
      languages: ["Java", "SQL", "JavaFX"],
      image: "../projects/javamanage.png",
    },
    "Math-3 Project": {
      description:
        "A specialized project for matrix calculations and implementation of Hell Cipher algorithms with mathematical applications.",
      languages: ["Python", "NumPy", "Cryptography"],
      image: null,
    },
    "powershell configuration": {
      description:
        "Custom PowerShell configuration with Oh-my-posh for improved productivity and aesthetics in Windows command-line environment.",
      languages: ["PowerShell", "JSON"],
      image: null,
    },
  };

  // Function to set project details
  function setProjectDetails(title, link) {
    // Get project data from our default dictionary or use basic info
    let project = defaultProjects[title] || {
      description:
        "A project demonstrating technical skills and problem-solving abilities.",
      languages: ["Multiple technologies"],
      image: null,
    };

    // Update the details panel
    projectTitle.textContent = title;
    projectDescription.textContent = project.description;

    // Set languages
    projectLanguages.innerHTML = "";
    project.languages.forEach((lang) => {
      const langSpan = document.createElement("span");
      langSpan.className = "language-tag";
      langSpan.textContent = lang;
      projectLanguages.appendChild(langSpan);
    });

    // Set image if available
    if (project.image) {
      projectPreview.src = project.image;
      projectPreview.classList.remove("hidden");
      document.querySelector(".project-icon-preview").classList.add("hidden");
    } else {
      projectPreview.classList.add("hidden");
      document
        .querySelector(".project-icon-preview")
        .classList.remove("hidden");
    }

    // Set link for view button
    viewProjectBtn.href = link;
  }

  // Set first project as active by default after a short delay
  setTimeout(() => {
    if (projectCards.length > 0) {
      projectCards[0].classList.add("active");
      const title = projectCards[0].querySelector("h4").textContent;
      const link = projectCards[0].getAttribute("href");
      setProjectDetails(title, link);
      projectDetails.classList.add("visible");
    }
  }, 500);

  // Add click event for each project card
  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Prevent default only if we're on a larger screen where we show details panel
      if (window.innerWidth > 768) {
        e.preventDefault();

        // Remove active class from all cards
        projectCards.forEach((c) => c.classList.remove("active"));

        // Add active class to current card
        this.classList.add("active");

        // Get project details
        const title = this.querySelector("h4").textContent;
        const link = this.getAttribute("href");

        // Set project details
        setProjectDetails(title, link);

        // Show details panel
        projectDetails.classList.add("visible");
      }
    });
  });

  // Add click event for view project button
  viewProjectBtn.addEventListener("click", function (e) {
    // Get the active project's link
    const activeProject = document.querySelector(".project-card.active");
    if (activeProject) {
      window.open(activeProject.getAttribute("href"), "_blank");
    }
  });

  // Responsive behavior - Reset details panel on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
      projectDetails.classList.remove("visible");
    } else if (document.querySelector(".project-card.active")) {
      projectDetails.classList.add("visible");
    }
  });
});
