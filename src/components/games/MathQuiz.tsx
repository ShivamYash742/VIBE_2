import React from "react";
import { Calculator } from "lucide-react";
import Quiz from "./Quiz";

const MathQuiz = () => {
  const questions = [
    {
      id: 1,
      question: "What is the value of π (pi) to two decimal places?",
      options: ["3.14", "3.16", "3.12", "3.18"],
      correctAnswer: 0,
      explanation:
        "The value of π (pi) to two decimal places is 3.14. It is the ratio of a circle's circumference to its diameter.",
    },
    {
      id: 2,
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2x²"],
      correctAnswer: 1,
      explanation:
        "The derivative of x² is 2x. The power rule states that the derivative of x^n is n*x^(n-1).",
    },
    {
      id: 3,
      question: "What is the value of log₁₀(100)?",
      options: ["1", "2", "10", "100"],
      correctAnswer: 1,
      explanation:
        "log₁₀(100) = 2 because 10² = 100. The logarithm base 10 of a number is the power to which 10 must be raised to get that number.",
    },
    {
      id: 4,
      question: "What is the Pythagorean theorem?",
      options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "(a + b)² = c²"],
      correctAnswer: 0,
      explanation:
        "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c) is equal to the sum of squares of the other two sides (a and b): a² + b² = c².",
    },
    {
      id: 5,
      question: "What is the value of sin(90°)?",
      options: ["0", "1", "-1", "Undefined"],
      correctAnswer: 1,
      explanation:
        "The sine of 90 degrees is 1. This is a fundamental value in trigonometry.",
    },
    {
      id: 6,
      question: "What is the formula for the area of a circle?",
      options: ["A = πr", "A = 2πr", "A = πr²", "A = πd"],
      correctAnswer: 2,
      explanation:
        "The formula for the area of a circle is A = πr², where r is the radius of the circle.",
    },
    {
      id: 7,
      question: "What is the value of 5! (5 factorial)?",
      options: ["5", "25", "120", "720"],
      correctAnswer: 2,
      explanation:
        "5! = 5 × 4 × 3 × 2 × 1 = 120. Factorial is the product of all positive integers less than or equal to the given number.",
    },
    {
      id: 8,
      question: "What is the solution to the equation 2x + 5 = 15?",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
      correctAnswer: 0,
      explanation:
        "To solve 2x + 5 = 15, subtract 5 from both sides: 2x = 10. Then divide both sides by 2: x = 5.",
    },
    {
      id: 9,
      question: "What is the definition of a prime number?",
      options: [
        "A number divisible by 2",
        "A number greater than 10",
        "A number with exactly two factors: 1 and itself",
        "A number that can be expressed as a fraction",
      ],
      correctAnswer: 2,
      explanation:
        "A prime number is a natural number greater than 1 that has exactly two factors: 1 and itself. In other words, it can only be divided evenly by 1 and itself.",
    },
  ];

  return (
    <Quiz
      subject="Mathematics"
      icon={<Calculator className="h-6 w-6 text-neon-purple" />}
      questions={questions}
      timeLimit={540} // 9 minutes
    />
  );
};

export default MathQuiz;
