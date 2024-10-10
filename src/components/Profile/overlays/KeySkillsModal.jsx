import React, { useState, useCallback, useMemo } from "react";
import { updateAndStoreUserData } from "../../../utils";
import { IoMdClose } from "react-icons/io";

const predefinedSkills = [
  "Spring", "Spring Boot", "Java", "React", "Node.js", "Docker", "Kubernetes",
  "HTML", "CSS", "JavaScript", "TypeScript", "MongoDB", "SQL", "NoSQL", "Git",
  "Python", "Django", "Flask", "Ruby on Rails", "C#", "ASP.NET", "C++", "Angular",
  "Vue.js", "Svelte", "Express.js", "PostgreSQL", "MySQL", "SQLite", "Redis",
  "AWS", "Google Cloud", "Azure", "Terraform", "Ansible", "Chef", "Puppet",
  "Linux", "Bash", "PowerShell", "GraphQL", "REST API", "SOAP", "JSON", "XML",
  "CI/CD", "Jenkins", "Travis CI", "CircleCI", "GitLab CI", "JIRA", "Trello",
  "Agile", "Scrum", "Kanban", "DevOps", "Microservices", "JPA", "Hibernate",
  "JUnit", "Mockito", "Cypress", "Selenium", "Cucumber", "Jest", "Mocha",
  "Chai", "PHP", "Laravel", "Symfony", "Rust", "Go", "Swift", "Objective-C",
  "Kotlin", "Android", "iOS", "React Native", "Flutter", "Xamarin", "Figma",
  "Sketch", "Adobe XD", "InVision", "SQL Server", "Oracle", "Elasticsearch",
  "Kafka", "RabbitMQ", "ActiveMQ", "Webpack", "Babel", "ESLint", "Prettier",
  "SASS", "LESS", "Tailwind CSS", "Bootstrap", "Material-UI", "Ant Design",
  "Webpack", "Vite", "Parcel", "Redux", "MobX", "Zustand", "Formik", "Yup",
  "WebSockets", "RESTful APIs", "OAuth", "JWT", "OpenID Connect", "SvelteKit",
  "Next.js", "Nuxt.js", "Gatsby", "Three.js", "D3.js", "Chart.js", "Highcharts",
  "Handlebars.js", "Mustache.js", "EJS", "Jinja2", "Twig", "Pug", "Vagrant",
  "VirtualBox", "KVM", "VMware", "Hyper-V", "Varnish", "Nginx", "Apache",
  "Lighttpd", "Tomcat", "JBoss", "WebLogic", "GlassFish", "Jetty", "Systemd",
  "Cron", "Supervisor", "PM2", "Forever", "Pandas", "NumPy", "Matplotlib",
  "Seaborn", "SciPy", "Scikit-learn", "TensorFlow", "Keras", "PyTorch", "MXNet",
  "OpenCV", "NLTK", "spaCy", "Gensim", "Hugging Face", "BERT", "GPT", "FastAPI",
  "Sanic", "Tornado", "Twisted", "Celery", "RabbitMQ", "ActiveMQ", "Kafka",
  "Zookeeper", "Hazelcast", "Consul", "Vault", "Etcd", "Prometheus", "Grafana",
  "New Relic", "Datadog", "Splunk", "Elastic Stack", "Logstash", "Kibana",
  "Fluentd", "Sentry", "Honeycomb", "PagerDuty", "Nagios", "Zabbix", "Checkmk",
  "Pingdom", "UptimeRobot", "StatusCake", "Postman", "Insomnia", "SoapUI",
  "Katalon", "TestNG", "QUnit", "Jasmine", "Karma", "Protractor", "NUnit",
  "PyTest", "Unittest", "Robot Framework", "Allure", "TestRail", "Zephyr",
  "Bugzilla", "MantisBT", "Redmine", "JMeter", "LoadRunner", "Gatling",
  "Locust", "Artillery", "BlazeMeter", "Swagger", "OpenAPI", "RAML", "Apiary",
  "HATEOAS", "HAL", "GraphQL", "Apollo", "Relay", "Prisma", "TypeORM", "Sequelize",
  "Knex.js", "Bookshelf.js", "Objection.js", "Mongoose", "Waterline", "Doctrine",
  "Eloquent", "ActiveRecord", "SQLAlchemy", "Peewee", "Django ORM", "Tortoise ORM",
  "Kivy", "PyQT", "Tkinter", "wxPython", "PySide", "Qt", "JavaFX", "Swing",
  "SWT", "JFace", "AWT", "GTK+", "WxWidgets", "Electron", "Tauri", "Capacitor",
  "Cordova", "PhoneGap", "Ionic", "Onsen UI", "Framework7", "NativeScript",
  "Weex", "Expo", "Unity", "Unreal Engine", "Godot", "CryEngine", "Panda3D",
  "Three.js", "Babylon.js", "PlayCanvas", "Blender", "Maya", "3ds Max", "ZBrush",
  "Substance Painter", "Cinema 4D", "After Effects", "Premiere Pro", "Final Cut Pro",
  "DaVinci Resolve", "Audacity", "Ableton Live", "FL Studio", "Logic Pro",
  "Pro Tools", "Cubase", "Reaper", "GarageBand", "P5.js", "Processing",
  "Arduino", "Raspberry Pi", "ESP32", "MicroPython", "CircuitPython", "Fritzing",
  "LabVIEW", "MATLAB", "Simulink", "Ansys", "SolidWorks", "AutoCAD", "Fusion 360",
  "CATIA", "NX", "Creo", "Pro/ENGINEER", "Inventor", "Rhino", "Alias", "Revit",
  "SketchUp", "V-Ray", "Corona Renderer", "Lumion", "Enscape", "Unreal Studio",
  "Substance Designer", "Arnold", "Redshift", "Octane", "Houdini", "Nuke",
  "Silhouette", "Mocha", "PFTrack", "3DEqualizer", "Boujou", "Syntheyes",
  "Xcode", "Android Studio", "IntelliJ IDEA", "PyCharm", "WebStorm", "CLion",
  "Rider", "RubyMine", "PhpStorm", "NetBeans", "Eclipse", "VSCode", "Sublime Text",
  "Atom", "Vim", "Emacs", "Notepad++", "UltraEdit", "Brackets", "Code::Blocks",
  "Jupyter", "Colab", "Spyder", "RStudio", "PyCharm", "IDLE", "Thonny", "Wing",
  "Anaconda", "Miniconda", "Pipenv", "Poetry", "Conda", "Virtualenv", "Docker Compose",
  "Podman", "LXC", "Singularity", "Vagrant", "Minikube", "Kubeadm", "Helm",
  "Istio", "Linkerd", "Envoy", "Contour", "NGINX Ingress", "Traefik", "Skupper",
  "MetalLB", "Calico", "Flannel", "Weave", "Cilium", "Multus", "SR-IOV", "Envoy Proxy",
  "HAProxy", "Varnish", "Memcached", "Squid", "Couchbase", "Cassandra", "InfluxDB",
  "TimescaleDB", "Druid", "Pinot", "Apache Arrow", "Parquet", "Avro", "ORC", "Feather",
  "Google BigQuery", "AWS Redshift", "Azure Synapse", "Snowflake", "Presto", "Trino",
  "Dremio", "ClickHouse", "Greenplum", "CockroachDB", "ScyllaDB", "FoundationDB",
  "VoltDB", "Aerospike", "MemSQL", "CrateDB", "BigTable", "HBase", "Accord Project",
  "Hyperledger Fabric", "Corda", "Quorum", "IPFS", "Ethereum", "Solidity", "Web3.js",
  "Truffle", "Ganache", "OpenZeppelin", "Hardhat", "Remix", "Metamask", "Ledger",
  "Trezor", "Polkadot", "Substrate", "Cosmos", "Solana", "Near Protocol", "Avalanche",
  "Chainlink", "Dapp", "DeFi", "NFT", "IPFS", "Swarm", "Arweave", "Filecoin", "Celo",
  "Alfajores", "Polygon", "Binance Smart Chain", "Lisk", "EOS", "Cardano", "Tezos"
];


const KeySkillsModal = ({ showModal, onClose, currentSkills }) => {
  const [newSkills, setNewSkills] = useState([]);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState(""); // Store input value
  const [filteredSkills, setFilteredSkills] = useState([]); // Store matching skills

  const handleInputChange = useCallback((e) => {
    const input = e.target.value;
    setSkillInput(input);

    // Filter predefined skills based on input
    const matches = predefinedSkills.filter((skill) =>
      skill.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSkills(matches);
  }, []);

  const handleAdd = useCallback(
    (newSkill) => {
      if (
        newSkill &&
        !currentSkills.includes(newSkill) &&
        !newSkills.includes(newSkill)
      ) {
        setNewSkills((prevSkills) => [...prevSkills, newSkill]);
        setSkillInput(""); // Clear input after adding
        setFilteredSkills([]); // Clear suggestions
      } else {
        setError("Skill already exists or is empty");
        setTimeout(() => setError(""), 3000);
      }
    },
    [currentSkills, newSkills]
  );

  const handleUpdate = useCallback(() => {
    const skillsData = {
      skills: [...currentSkills, ...newSkills],
    };
    updateAndStoreUserData(skillsData);
    onClose();
  }, [currentSkills, newSkills, onClose]);

  const removeNewSkill = useCallback((skillToRemove) => {
    setNewSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  }, []);

  const AddedSkills = useMemo(
    () =>
      newSkills.map((skill) => (
        <div
          key={skill}
          className="bg-blue-100 rounded-lg p-2 flex items-center justify-between"
        >
          <span className="text-sm font-medium text-blue-700 truncate">
            {skill}
          </span>
          <button
            onClick={() => removeNewSkill(skill)}
            className="ml-2 text-blue-400 hover:text-red-500 transition-colors"
            aria-label={`Remove ${skill}`}
          >
            <IoMdClose size={16} />
          </button>
        </div>
      )),
    [newSkills, removeNewSkill]
  );

  if (!showModal) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Key Skills
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          Add new skills to appear in searches. You can remove skills from your
          profile page.
        </p>
        <div className="mb-4 relative">
          <input
            type="text"
            value={skillInput}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Start typing a skill..."
          />
          {filteredSkills.length > 0 && (
            <ul className="absolute bg-white border border-gray-200 rounded-md w-full mt-2 max-h-40 overflow-y-auto z-10">
              {filteredSkills.map((skill) => (
                <li
                  key={skill}
                  onClick={() => handleAdd(skill)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="grid grid-cols-2 gap-2 mb-4">{AddedSkills}</div>
        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Save New Skills
        </button>
      </div>
    </div>
  );
};

export default KeySkillsModal;
