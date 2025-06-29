import React from "react";
import { Atom } from "lucide-react";
import Quiz from "./Quiz";

const PhysicsQuiz = () => {
  const questions = [
    {
      id: 1,
      question: "What is Newton's First Law of Motion?",
      options: [
        "An object in motion stays in motion unless acted upon by an external force",
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "Energy cannot be created or destroyed, only transformed",
      ],
      correctAnswer: 0,
      explanation:
        "Newton's First Law of Motion states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force. This is also known as the law of inertia.",
    },
    {
      id: 2,
      question: "What is the SI unit of electric current?",
      options: ["Volt", "Watt", "Ampere", "Ohm"],
      correctAnswer: 2,
      explanation:
        "The ampere (A) is the SI unit of electric current. It measures the rate of flow of electric charge past a point in an electric circuit.",
    },
    {
      id: 3,
      question: "Which of the following is NOT a fundamental force in nature?",
      options: [
        "Gravitational force",
        "Electromagnetic force",
        "Strong nuclear force",
        "Centrifugal force",
      ],
      correctAnswer: 3,
      explanation:
        "The four fundamental forces in nature are gravitational, electromagnetic, strong nuclear, and weak nuclear forces. Centrifugal force is a fictitious force that appears to act on objects moving in a circular path, but it's not a fundamental force.",
    },
    {
      id: 4,
      question: "What is the formula for kinetic energy?",
      options: ["KE = mgh", "KE = 1/2 mv²", "KE = Fd", "KE = mv"],
      correctAnswer: 1,
      explanation:
        "The formula for kinetic energy is KE = 1/2 mv², where m is mass and v is velocity. It represents the energy an object possesses due to its motion.",
    },
    {
      id: 5,
      question: "Which scientist proposed the theory of general relativity?",
      options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"],
      correctAnswer: 2,
      explanation:
        "Albert Einstein proposed the theory of general relativity in 1915, which describes gravity as a geometric property of space and time, or spacetime.",
    },
    {
      id: 6,
      question: "What is the speed of light in a vacuum?",
      options: ["300,000 km/s", "343 m/s", "3,000 km/s", "186,000 miles/s"],
      correctAnswer: 0,
      explanation:
        "The speed of light in a vacuum is approximately 300,000 kilometers per second (or about 186,000 miles per second). This is denoted by the symbol 'c' in physics equations.",
    },
    {
      id: 7,
      question:
        "Which law of thermodynamics states that energy cannot be created or destroyed?",
      options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
      correctAnswer: 1,
      explanation:
        "The First Law of Thermodynamics, also known as the Law of Conservation of Energy, states that energy cannot be created or destroyed, only transformed from one form to another.",
    },
    {
      id: 8,
      question: "What is the unit of electrical resistance?",
      options: ["Watt", "Volt", "Ampere", "Ohm"],
      correctAnswer: 3,
      explanation:
        "The ohm (Ω) is the SI unit of electrical resistance. It represents the resistance that would produce a potential difference of one volt when a current of one ampere flows through it.",
    },
  ];

  return (
    <Quiz
      subject="Physics"
      icon={<Atom className="h-6 w-6 text-neon-blue" />}
      questions={questions}
      timeLimit={480} // 8 minutes
    />
  );
};

export default PhysicsQuiz;
