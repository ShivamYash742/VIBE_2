import React from "react";
import { Globe } from "lucide-react";
import Quiz from "./Quiz";

const WebDevQuiz = () => {
  const questions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Multi Language",
        "Hyper Transfer Markup Language",
        "Hyperlink Text Management Language",
      ],
      correctAnswer: 0,
      explanation:
        "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages and web applications.",
    },
    {
      id: 2,
      question:
        "Which CSS property is used to control the spacing between elements?",
      options: ["spacing", "margin", "padding", "gap"],
      correctAnswer: 1,
      explanation:
        "The margin property in CSS is used to create space around elements, outside of any defined borders. Padding creates space within the element, while gap is used in grid and flex layouts.",
    },
    {
      id: 3,
      question:
        "Which of the following is NOT a JavaScript framework or library?",
      options: ["React", "Angular", "Vue", "Pascal"],
      correctAnswer: 3,
      explanation:
        "Pascal is a programming language, not a JavaScript framework or library. React, Angular, and Vue are all popular JavaScript frameworks/libraries used for building user interfaces.",
    },
    {
      id: 4,
      question:
        "What is the purpose of the 'alt' attribute in an HTML image tag?",
      options: [
        "To specify an alternative image",
        "To provide alternative text if the image cannot be displayed",
        "To set the alignment of the image",
        "To define the altitude of the image",
      ],
      correctAnswer: 1,
      explanation:
        "The 'alt' attribute provides alternative text for an image if it cannot be displayed. It's also important for accessibility, as screen readers use this text to describe the image to visually impaired users.",
    },
    {
      id: 5,
      question: "Which HTTP status code indicates a successful response?",
      options: [
        "200 OK",
        "404 Not Found",
        "500 Internal Server Error",
        "302 Found",
      ],
      correctAnswer: 0,
      explanation:
        "The HTTP status code 200 OK indicates that the request has succeeded. 404 means the resource was not found, 500 indicates a server error, and 302 is a redirection status.",
    },
    {
      id: 6,
      question: "What is the correct way to declare a JavaScript variable?",
      options: [
        "variable name = value;",
        "var name = value;",
        "v name = value;",
        "int name = value;",
      ],
      correctAnswer: 1,
      explanation:
        "In JavaScript, variables can be declared using 'var', 'let', or 'const'. The correct syntax is 'var name = value;', 'let name = value;', or 'const name = value;'.",
    },
    {
      id: 7,
      question:
        "Which CSS property is used to change the text color of an element?",
      options: ["text-color", "font-color", "color", "text-style"],
      correctAnswer: 2,
      explanation:
        "The 'color' property in CSS is used to set the color of text. The other options are not valid CSS properties for text color.",
    },
    {
      id: 8,
      question: "What does API stand for in web development?",
      options: [
        "Application Programming Interface",
        "Automated Program Integration",
        "Advanced Programming Implementation",
        "Application Process Integration",
      ],
      correctAnswer: 0,
      explanation:
        "API stands for Application Programming Interface. It's a set of rules that allows different software applications to communicate with each other.",
    },
    {
      id: 9,
      question: "Which of the following is a CSS preprocessor?",
      options: ["jQuery", "SASS", "Bootstrap", "Node.js"],
      correctAnswer: 1,
      explanation:
        "SASS (Syntactically Awesome Style Sheets) is a CSS preprocessor that extends CSS with features like variables, nested rules, and mixins. jQuery is a JavaScript library, Bootstrap is a CSS framework, and Node.js is a JavaScript runtime.",
    },
    {
      id: 10,
      question:
        "What is the purpose of the 'localStorage' object in JavaScript?",
      options: [
        "To store data temporarily in the browser's memory",
        "To store data permanently on the server",
        "To store data persistently in the browser",
        "To store data in cookies",
      ],
      correctAnswer: 2,
      explanation:
        "The localStorage object in JavaScript allows you to store key-value pairs in a web browser with no expiration time. The data will persist even after the browser window is closed, unlike sessionStorage.",
    },
  ];

  return (
    <Quiz
      subject="Web Development"
      icon={<Globe className="h-6 w-6 text-neon-green" />}
      questions={questions}
      timeLimit={600} // 10 minutes
    />
  );
};

export default WebDevQuiz;
