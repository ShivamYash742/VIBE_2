import { QuizQuestionData } from "../components/QuizQuestion";

// Web Development Quiz
export const webDevelopmentQuizData = {
  id: "web-development",
  title: "Web Development Quiz",
  description: "Test your knowledge of modern web development technologies and practices.",
  timeLimit: 15, // minutes
  questions: [
    {
      id: "wd-q1",
      type: "multiple-choice",
      question: "Which of the following is NOT a JavaScript framework or library?",
      options: ["React", "Angular", "Vue", "Laravel"],
      correctAnswer: "Laravel",
      explanation: "Laravel is a PHP framework, not a JavaScript framework. React, Angular, and Vue are all JavaScript frameworks/libraries.",
      points: 10,
    },
    {
      id: "wd-q2",
      type: "true-false",
      question: "CSS Grid and Flexbox serve exactly the same purpose and are interchangeable.",
      correctAnswer: "False",
      explanation: "While both are used for layout, CSS Grid is designed for two-dimensional layouts (rows and columns), while Flexbox is primarily designed for one-dimensional layouts (either rows OR columns).",
      points: 10,
    },
    {
      id: "wd-q3",
      type: "multiple-choice",
      question: "Which HTTP status code indicates a successful response?",
      options: ["200 OK", "404 Not Found", "500 Internal Server Error", "301 Moved Permanently"],
      correctAnswer: "200 OK",
      explanation: "200 OK indicates that the request has succeeded. 404 means the resource was not found, 500 indicates a server error, and 301 is a redirection status.",
      points: 10,
    },
    {
      id: "wd-q4",
      type: "fill-blank",
      question: "In React, the hook used to manage side effects is called use_____.",
      correctAnswer: "Effect",
      explanation: "useEffect is a React Hook that lets you synchronize a component with an external system and manage side effects.",
      points: 15,
    },
    {
      id: "wd-q5",
      type: "multiple-choice",
      question: "Which of these is NOT a valid way to declare a variable in JavaScript?",
      options: ["let x = 5;", "const x = 5;", "var x = 5;", "int x = 5;"],
      correctAnswer: "int x = 5;",
      explanation: "JavaScript uses 'let', 'const', and 'var' for variable declarations. 'int' is used in languages like C, C++, and Java, but not in JavaScript.",
      points: 10,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "wd-q6",
      type: "matching",
      question: "Match each HTML element with its correct purpose:",
      options: [
        "<header>", 
        "<footer>", 
        "<nav>", 
        "<main>", 
        "Introductory content or navigation", 
        "Closing section of a document", 
        "Section containing navigation links", 
        "Main content of a document"
      ],
      correctAnswer: [
        "Introductory content or navigation", 
        "Closing section of a document", 
        "Section containing navigation links", 
        "Main content of a document"
      ],
      explanation: "Semantic HTML elements help describe the meaning of content, making it more accessible and SEO-friendly.",
      points: 20,
    },
    {
      id: "wd-q7",
      type: "multiple-choice",
      question: "Which CSS property is used to create space between the elements' border and its content?",
      options: ["margin", "padding", "border-spacing", "gap"],
      correctAnswer: "padding",
      explanation: "Padding creates space between an element's border and its content. Margin creates space around elements, outside of any defined borders.",
      points: 10,
    },
    {
      id: "wd-q8",
      type: "true-false",
      question: "LocalStorage data persists even after the browser is closed and reopened.",
      correctAnswer: "True",
      explanation: "LocalStorage data has no expiration time and persists even after the browser is closed and reopened. SessionStorage, on the other hand, is cleared when the page session ends.",
      points: 10,
    },
    {
      id: "wd-q9",
      type: "multiple-choice",
      question: "Which of the following is a valid way to create a function in JavaScript?",
      options: [
        "function myFunction() {}", 
        "const myFunction = () => {}", 
        "const myFunction = function() {}", 
        "All of the above"
      ],
      correctAnswer: "All of the above",
      explanation: "JavaScript allows multiple ways to define functions: function declarations, arrow functions, and function expressions are all valid.",
      points: 15,
    },
    {
      id: "wd-q10",
      type: "fill-blank",
      question: "The CSS property ______-sizing: border-box; includes padding and border in an element's total width and height.",
      correctAnswer: "box",
      explanation: "box-sizing: border-box; makes the element maintain its actual width and height, even if padding or borders are added.",
      points: 15,
    },
  ] as QuizQuestionData[],
};

// Quantum Physics Quiz
export const quantumPhysicsQuizData = {
  id: "quantum-physics",
  title: "Quantum Physics Quiz",
  description: "Test your knowledge of quantum mechanics and modern physics concepts.",
  timeLimit: 20, // minutes
  questions: [
    {
      id: "qp-q1",
      type: "multiple-choice",
      question: "Which principle states that it is impossible to know both the position and momentum of a particle with perfect precision?",
      options: ["Pauli Exclusion Principle", "Heisenberg Uncertainty Principle", "Schrödinger's Principle", "Einstein's Relativity Principle"],
      correctAnswer: "Heisenberg Uncertainty Principle",
      explanation: "The Heisenberg Uncertainty Principle, formulated by Werner Heisenberg in 1927, states that the more precisely the position of a particle is determined, the less precisely its momentum can be predicted, and vice versa.",
      points: 10,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "qp-q2",
      type: "true-false",
      question: "According to quantum mechanics, light behaves as both a particle and a wave.",
      correctAnswer: "True",
      explanation: "This is known as wave-particle duality. Light can exhibit properties of both waves (interference, diffraction) and particles (photons with discrete energy).",
      points: 10,
    },
    {
      id: "qp-q3",
      type: "multiple-choice",
      question: "What is the name of the thought experiment proposed by Erwin Schrödinger involving a cat?",
      options: ["Quantum Entanglement", "Schrödinger's Cat", "Double-Slit Experiment", "EPR Paradox"],
      correctAnswer: "Schrödinger's Cat",
      explanation: "Schrödinger's Cat is a thought experiment that illustrates the problem of quantum superposition. In the experiment, a cat may be simultaneously both alive and dead, as a result of its fate being linked to a random subatomic event.",
      points: 10,
    },
    {
      id: "qp-q4",
      type: "fill-blank",
      question: "The equation E = hf relates energy to frequency, where h is known as _______'s constant.",
      correctAnswer: "Planck",
      explanation: "Planck's constant (h) is a fundamental physical constant that relates the energy of a photon to its frequency. It was first proposed by Max Planck in 1900.",
      points: 15,
    },
    {
      id: "qp-q5",
      type: "multiple-choice",
      question: "Which of these particles is a fermion?",
      options: ["Photon", "Electron", "Gluon", "Higgs boson"],
      correctAnswer: "Electron",
      explanation: "Electrons are fermions, which are particles that obey the Pauli Exclusion Principle. Photons, gluons, and the Higgs boson are all bosons.",
      points: 15,
    },
  ] as QuizQuestionData[],
};

// Advanced Calculus Quiz
export const advancedCalculusQuizData = {
  id: "advanced-calculus",
  title: "Advanced Calculus Challenge",
  description: "Test your knowledge of advanced calculus concepts and problem-solving skills.",
  timeLimit: 25, // minutes
  questions: [
    {
      id: "ac-q1",
      type: "multiple-choice",
      question: "What is the derivative of f(x) = e^(sin x)?",
      options: ["e^(sin x) · cos x", "e^(sin x) · sin x", "e^(sin x) · tan x", "e^(sin x) · cot x"],
      correctAnswer: "e^(sin x) · cos x",
      explanation: "Using the chain rule: f'(x) = e^(sin x) · d/dx(sin x) = e^(sin x) · cos x",
      points: 15,
    },
    {
      id: "ac-q2",
      type: "true-false",
      question: "The integral of sec^2(x) is tan(x) + C.",
      correctAnswer: "True",
      explanation: "The derivative of tan(x) is sec^2(x), so the integral of sec^2(x) is tan(x) + C.",
      points: 10,
    },
    {
      id: "ac-q3",
      type: "fill-blank",
      question: "The Taylor series expansion of f(x) = e^x around x = 0 is Σ(x^n/n!) from n = 0 to ______.",
      correctAnswer: "infinity",
      explanation: "The Taylor series for e^x is the infinite sum of x^n/n! from n = 0 to infinity, which converges for all real values of x.",
      points: 15,
    },
    {
      id: "ac-q4",
      type: "multiple-choice",
      question: "What is the value of the improper integral ∫(0 to ∞) e^(-x) dx?",
      options: ["0", "1", "e", "∞"],
      correctAnswer: "1",
      explanation: "The improper integral ∫(0 to ∞) e^(-x) dx = [-e^(-x)]₀^∞ = 0 - (-1) = 1",
      points: 15,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "ac-q5",
      type: "multiple-choice",
      question: "Which of the following series converges?",
      options: ["Σ 1/n", "Σ 1/n²", "Σ 1/√n", "Σ 1/ln(n)"],
      correctAnswer: "Σ 1/n²",
      explanation: "The series Σ 1/n² is the famous Basel problem, which converges to π²/6. The other series all diverge.",
      points: 15,
    },
  ] as QuizQuestionData[],
};

// Export all quizzes
export const allQuizzes = {
  "web-development": webDevelopmentQuizData,
  "quantum-physics": quantumPhysicsQuizData,
  "advanced-calculus": advancedCalculusQuizData,
}; 