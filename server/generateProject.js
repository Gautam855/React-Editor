const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Function to generate the React project zip file
function generateReactProject(userData, outputPath, res) {
    // console.log("Aur bhai");
    
    // Validate userData
    if (!userData || !userData.name || !userData.description || !userData.navItems) {
        res.status(400).send('Invalid user data');
        // console.log("no data user bhai");
        return;
    }

    const projectTemplatePath = path.resolve(__dirname, 'client');
    const projectDir = path.resolve(__dirname, 'output', 'react-project');
    const srcDir = path.resolve(projectDir, 'src/components');
    
    // Ensure the output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Copy the entire react-template folder to the output project folder, skipping certain folders
    copyFolderRecursiveSync(projectTemplatePath, projectDir);

    // Dynamically replace the 'src' folder with user content
    if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
    }
    // console.log("Verma");

    // Create a custom `Home.js` based on user input
    const reactTemplatehome = `
    import React from 'react';
    import Typed from 'typed.js';
    import './../index.css';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

    const Home = () => {
        React.useEffect(() => {
            const options = {
                strings: ['Frontend Developer', 'Coder', 'Full Stack Developer', 'Programmer'],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true,
            };
            const typed = new Typed('.typed-text', options);
            return () => {
                typed.destroy();
            };
        }, []);

        return (
            <section id="home" className="home min-h-screen flex items-center px-8 bg-[#212732]">
                <div className="flex gap-8 w-full h-full">
                    <div className="flex flex-col w-3/6 justify-center">
                        <div className="zon">
                            <h2 className="text-3xl font-semibold text-white">Hello, it's me</h2>
                            <h1 className="text-4xl font-semibold text-white">${userData.name}</h1>
                            <h2 className="text-3xl font-semibold text-white">
                                and I am a <span className="typed-text text-[#00eeff] mt-2"></span>
                            </h2>
                            <p className="mt-4 text-lg font-semibold text-white">
                                ${userData.description}
                            </p>
                        </div>
                        <div className="flex justify-center mt-6">
                            <a href="www.google.com" className="mx-2 text-4xl text-white hover:text-[#00eeff] transition-all duration-300">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="www.google.com" className="mx-2 text-4xl text-white hover:text-[#00eeff] transition-all duration-300">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="www.google.com" className="mx-2 text-4xl text-white hover:text-[#00eeff] transition-all duration-300">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                        <button className="mt-6 mx-auto px-10 py-3 bg-[#00eeff] text-[#212732] font-bold rounded-full shadow-lg hover:bg-white hover:text-[#212732] transform hover:scale-105 transition-all duration-300">
                            Download CV
                        </button>
                    </div>
                    <div className="img-box flex-1 flex justify-center items-center">
                        <img src="copy.png" alt="Profile" className="w-11/12 h-auto transform -scale-x-150 animate-floatImage" />
                    </div>
                </div>
            </section>
        );
    };

    export default Home;
    `;

    const reactTemplatenavebar = `
<nav className={\`flex items-center space-x-4 \${isResponsive ? 'block' : 'hidden md:flex'}\`}>
    <a href="#home" className="nav text-white hover:text-cyan-400 text-lg">${userData.navItems.home}</a>
    <a href="#aboutus" className="nav text-white hover:text-cyan-400 text-lg">${userData.navItems.aboutUs}</a>
    <a href="#projects" className="nav text-white hover:text-cyan-400 text-lg">${userData.navItems.projects}</a>
    <a href="#achieve" className="nav text-white hover:text-cyan-400 text-lg">${userData.navItems.achievements}</a>
    <a href="#contact" className="nav text-white hover:text-cyan-400 text-lg">${userData.navItems.contact}</a>
</nav>
<a href="#logo" className="logo text-3xl font-bold text-white">Portfolio</a>
<button className="icon md:hidden text-white" onClick={toggleNav}>
    <i className="fa fa-bars"></i>
</button>
</div>
  );
};

export default Header;

`;

    // Write the customized Home.js file inside the src folder
    try {
        fs.writeFileSync(path.join(srcDir, 'Home.js'), reactTemplatehome, 'utf-8');
    } catch (error) {
        res.status(500).send('Failed to generate Home.js file');
        return;
    }

    // Read the existing Navbar.js file content
    let existingNavbarContent2;
    try {
        const existingNavbarContent = fs.readFileSync(path.join(path.resolve(projectTemplatePath, 'src/components'), 'Navbar.js'), 'utf-8');
        // console.log("Gautam");
        const lines = existingNavbarContent.split('\n');
        const newNavbarContent1 = lines.slice(1, -1).join('\n');
        existingNavbarContent2 = newNavbarContent1;
        // console.log(existingNavbarContent2);
    } catch (error) {
        res.status(500).send('Failed to read Navbar.js file');
        return;
    }

    // Combine existing content with the new navbar template
    const newNavbarContent = existingNavbarContent2 + '\n' + reactTemplatenavebar;
    // console.log("Bhola");

    // Write the updated Navbar.js file
    try {
        fs.writeFileSync(path.join(srcDir, 'Navbar.js'), newNavbarContent, 'utf-8');
    } catch (error) {
        res.status(500).send('Failed to generate Navbar.js file');
        return;
    }
    
    // console.log("Khola");

    // Create a zip of the folder
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        // Send the zip file to the client
        res.download(outputPath, (err) => {
            // Cleanup: Delete the output folder after sending the zip
            if (!err) {
                fs.rmSync(path.resolve(__dirname, 'output'), { recursive: true, force: true });
            } else {
                console.error('Error sending the file:', err);
            }
        });
    });

    output.on('error', (err) => {
        res.status(500).send('Failed to generate project zip');
    });

    archive.pipe(output);
    archive.directory(projectDir, false);
    archive.finalize();
}

// Helper function to recursively copy a folder
function copyFolderRecursiveSync(source, target) {
    const files = fs.readdirSync(source);

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    files.forEach((file) => {
        const currentSource = path.join(source, file);
        const currentTarget = path.join(target, file);

        // Skip .git directories or other hidden files
        if (file === '.git' || file.startsWith('.')) {
            return; // Skip hidden directories or files
        }

        if (fs.statSync(currentSource).isDirectory()) {
            copyFolderRecursiveSync(currentSource, currentTarget);
        } else {
            fs.copyFileSync(currentSource, currentTarget);
        }
    });
}

module.exports = { generateReactProject };
