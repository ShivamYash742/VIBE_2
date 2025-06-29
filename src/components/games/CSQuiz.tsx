import React from "react";
import { Cpu } from "lucide-react";
import Quiz from "./Quiz";

const CSQuiz = () => {
  const questions = [
    {
      id: 1,
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Program Utility",
        "Central Processor Underlying",
      ],
      correctAnswer: 0,
      explanation:
        "CPU stands for Central Processing Unit. It is the primary component of a computer that performs most of the processing inside a computer.",
    },
    {
      id: 2,
      question: "Which of the following is not a programming paradigm?",
      options: [
        "Object-Oriented Programming",
        "Functional Programming",
        "Procedural Programming",
        "Descriptive Programming",
      ],
      correctAnswer: 3,
      explanation:
        "Descriptive Programming is not a recognized programming paradigm. The main paradigms include Object-Oriented, Functional, Procedural, and Declarative programming.",
    },
    {
      id: 3,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
      correctAnswer: 1,
      explanation:
        "Binary search has a time complexity of O(log n), where n is the number of elements in the sorted array. This is because the algorithm divides the search interval in half with each step.",
    },
    {
      id: 4,
      question:
        "Which data structure operates on a Last In, First Out (LIFO) principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: 1,
      explanation:
        "A stack operates on the Last In, First Out (LIFO) principle, where the last element added is the first one to be removed. A queue, in contrast, follows First In, First Out (FIFO).",
    },
    {
      id: 5,
      question: "What is the purpose of an operating system?",
      options: [
        "To provide a user interface",
        "To manage hardware resources",
        "To run applications",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "An operating system serves multiple purposes: it provides a user interface, manages hardware resources, and provides services for applications to run. Therefore, all of the above options are correct.",
    },
    {
      id: 6,
      question: "Which of the following is not a type of database?",
      options: [
        "Relational Database",
        "NoSQL Database",
        "Object-Oriented Database",
        "Functional Database",
      ],
      correctAnswer: 3,
      explanation:
        "Functional Database is not a standard type of database. The main types include Relational (SQL), NoSQL, Object-Oriented, and Graph databases.",
    },
    {
      id: 7,
      question: "What is the purpose of a compiler?",
      options: [
        "To translate high-level code to machine code",
        "To check for syntax errors",
        "To optimize code execution",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "A compiler serves multiple purposes: it translates high-level programming code into machine code, checks for syntax errors during compilation, and often includes optimization techniques to improve code execution.",
    },
    {
      id: 8,
      question: "What is the difference between HTTP and HTTPS?",
      options: [
        "HTTPS is faster than HTTP",
        "HTTPS uses encryption for security",
        "HTTP is newer than HTTPS",
        "There is no difference",
      ],
      correctAnswer: 1,
      explanation:
        "HTTPS (Hypertext Transfer Protocol Secure) uses encryption (typically SSL/TLS) to secure the communication between the client and server, while HTTP does not. This makes HTTPS more secure for transmitting sensitive information.",
    },
    {
      id: 9,
      question: "What is recursion in programming?",
      options: [
        "A loop that never ends",
        "A function that calls itself",
        "A method of sorting data",
        "A way to allocate memory",
      ],
      correctAnswer: 1,
      explanation:
        "Recursion is a programming technique where a function calls itself to solve a problem. It typically involves breaking down a problem into smaller instances of the same problem.",
    },
    {
      id: 10,
      question:
        "Which of the following is not a principle of object-oriented programming?",
      options: [
        "Encapsulation",
        "Inheritance",
        "Polymorphism",
        "Fragmentation",
      ],
      correctAnswer: 3,
      explanation:
        "Fragmentation is not a principle of object-oriented programming. The main principles are Encapsulation, Inheritance, Polymorphism, and Abstraction.",
    },
  ];

  return (
    <Quiz
      subject="Computer Science"
      icon={<Cpu className="h-6 w-6 text-neon-orange" />}
      questions={questions}
      timeLimit={600} // 10 minutes
    />
  );
};

export default CSQuiz;
