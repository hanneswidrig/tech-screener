import type { TopicKey } from "$lib/data/topic-group";

export type QuestionBank = { question: string; answer: string };
export const questionBank = (): Record<TopicKey, QuestionBank[]> => ({
	javascript: [
		{ question: "What is the difference between == and ===?", answer: "" },
		{ question: "What is hoisting?", answer: "" },
		{ question: "What is the diff. Between const, let and var?", answer: "" },
		{ question: "What is the async-await (What are Promises)?", answer: "" },
		{
			question: "What is the difference between array.forEach, Array.map and Array.filter?",
			answer: "",
		},
		{
			question: "What is the diff. Between a function declaration and an arrow function?",
			answer: "",
		},
		{ question: "What is a closure?", answer: "" },
		{ question: "What is currying?", answer: "" },
		{ question: "What is prototypal inheritance?", answer: "" },
	],
	typescript: [
		{
			question: "What is TypeScript, and why might you use it over native JavaScript?",
			answer: "",
		},
		{
			question: 'What does the "any" type represent? When have you previously used it?',
			answer: "",
		},
		{ question: 'What are the differences between the "any" and "unknown" types?', answer: "" },
		{
			question: "What are some built-in TypeScript utility types you've used in the past?",
			answer: "",
		},
		{ question: "What is the purpose of generics in TypeScript?", answer: "" },
		{
			question: "What is the difference between type aliases and interface declarations?",
			answer: "",
		},
		{ question: "What are some ways of narrowing a type union in TypeScript?", answer: "" },
		{ question: "Advanced Question: What is a discriminated union?", answer: "" },
		{ question: 'What does the "never"  type represent?', answer: "" },
	],
	java: [
		{ question: "What is the difference between a class and an object in Java?", answer: "" },
		{
			question:
				"What is a static variable? How many times is a static variable instantiated?",
			answer: "",
		},
		{ question: "What is a final variable? Final Method? Final Class?", answer: "" },
		{ question: "What is the difference between the JDK, the JRE, and the JVM?", answer: "" },
		{
			question: "What is the difference between equals() and == the operator in Java?",
			answer: "",
		},
		{ question: "What is the role of a try/catch/finally block?", answer: "" },
		{ question: "What does it mean if an object is immutable?", answer: "" },
		{ question: "What is the purpose of generics in Java?", answer: "" },
		{ question: "What is the purpose of reflection in Java?", answer: "" },
		{
			question:
				"What are some core JDBC components? What do they do? When would you use JDBC?",
			answer: "",
		},
		{ question: "What is the best way to prevent SQL injection vulnerabilities?", answer: "" },
		{ question: "What is Spring Framework?", answer: "" },
		{ question: "What is Spring Boot?", answer: "" },
		{ question: "What are a few core components of Spring Framework?", answer: "" },
		{ question: "What are a few important annotations used in Spring Boot?", answer: "" },
	],
	csharp: [
		{ question: "What is an Object?", answer: "" },
		{ question: "What is a Constructor?", answer: "" },
		{ question: "What is the difference between ref and out parameters?", answer: "" },
		{ question: "What is serialization?", answer: "" },
		{
			question: "What is the difference between constants and read-only variables?",
			answer: "",
		},
		{ question: "What is “this”, and where can it NOT be used?", answer: "" },
		{
			question: "What are value types and reference types? Name a few examples of each.",
			answer: "",
		},
		{ question: "What are sealed classes?", answer: "" },
		{
			question:
				"What are the differences between System.String and System.Text.StringBuilder?",
			answer: "",
		},
		{
			question: "What is the base class in .NET from which all classes are derived from?",
			answer: "",
		},
		{ question: "What is the difference between an interface and abstract class?", answer: "" },
		{ question: "What are C# attributes?", answer: "" },
		{
			question:
				"In your own words, describe in C# how to implement the singleton design pattern?",
			answer: "",
		},
		{
			question: "In your own words, describe two methods of type casting in C#? Differences?",
			answer: "",
		},
		{ question: "Is C# code managed or unmanaged code? Difference?", answer: "" },
		{
			question: "In your own words, describe why garbage collection is important in .NET?",
			answer: "",
		},
	],
	golang: [
		{ question: "What is Go?", answer: "" },
		{ question: "What are the benefits of using Go programming?", answer: "" },
		{ question: "What is static type declaration of a variable in Go?", answer: "" },
		{ question: "What is dynamic type declaration of a variable in Go?", answer: "" },
		{ question: "What is a pointer?", answer: "" },
		{ question: "What are 'packages' in a Go program?", answer: "" },
		{ question: "Can you return multiple values from a function?", answer: "" },
		{ question: "How does Go do error handling?", answer: "" },
		{ question: "What are Goroutines?", answer: "" },
		{ question: "How you can stop Goroutine?", answer: "" },
		{ question: "Do you need both GOPATH and GOROOT variables, and why?", answer: "" },
		{ question: "Is Go an object-oriented language?", answer: "" },
		{
			question: "Can Go have optional parameters or does it support method overloading?",
			answer: "",
		},
		{ question: "How do you compare two structs? What about two interfaces?", answer: "" },
	],
	python: [
		{ question: "What is the Python Language?", answer: "" },
		{ question: "What are some key features of Python?", answer: "" },
		{ question: "How is indentation important in Python?", answer: "" },
		{ question: "What is the difference between Python Arrays and lists?", answer: "" },
		{ question: "What is __init__?", answer: "" },
		{ question: "What is a lambda function?", answer: "" },
		{ question: "What is a dictionary in Python?", answer: "" },
		{ question: "What is self in Python?", answer: "" },
		{ question: "Does Python have OOps concepts?", answer: "" },
		{ question: "How are classes created in Python?", answer: "" },
		{ question: "What is monkey patching in Python?", answer: "" },
		{ question: "Does python support multiple inheritance?", answer: "" },
		{ question: "What is Polymorphism in Python?", answer: "" },
		{ question: "Define encapsulation in Python?", answer: "" },
	],
	react: [
		{ question: "What is the virtual DOM?", answer: "" },
		{
			question:
				"Are you familiar with the lifecycle methods? (name and explain atleast 3 methods)",
			answer: "",
		},
		{ question: "What is a HOC?", answer: "" },
		{ question: "Are you familiar with the Context API?", answer: "" },
		{ question: "What is JSX?", answer: "" },
		{ question: "What is Redux? When do you choose to Redux and when not?", answer: "" },
		{ question: "What is the difference between Redux and Apollo or React Query?", answer: "" },
		{ question: "What are some differences between Angular, Vue, and React?", answer: "" },
		{ question: "What is JAM stack?", answer: "" },
		{ question: "What does SPA stands for? What are the potential risks of SPA?", answer: "" },
		{ question: "What is custom hook? When do you use it?", answer: "" },
	],
	angular: [
		{ question: "What is the difference between AngularJS and Angular?", answer: "" },
		{
			question: "What are the different components of Angular? (name and explain at least 3)",
			answer: "",
		},
		{
			question: "What are the lifecycle hooks in Angular? (name and explain at least 3)",
			answer: "",
		},
		{ question: "What are observables?", answer: "" },
		{ question: "What is the difference between an Observable and a Promise?", answer: "" },
		{ question: "What is angular CLI?", answer: "" },
		{ question: "What is DI (Dependency Injection)?", answer: "" },
		{ question: "What are Angular directives?", answer: "" },
		{
			question: "What is Pipe? What are the build-in pipes in Angular? How do you use them?",
			answer: "",
		},
	],
	dotnet: [],
	node: [
		{ question: "What is Node.js?", answer: "" },
		{ question: "What is Node used for?", answer: "" },
		{ question: "What does it mean that Node is single threaded?", answer: "" },
		{ question: "What is a callback? What are they used for?", answer: "" },
		{ question: "What is NPM? What is it used for?", answer: "" },
		{ question: "What is the package.json file?", answer: "" },
		{
			question:
				"What is the purpose of package-lock.json and would you commit this to source control?",
			answer: "",
		},
		{ question: "What is the difference between odd and even versions Node?", answer: "" },
		{ question: "How do you add an external library to your Node app?", answer: "" },
		{
			question: "What function do you use to add an external library to your source file?",
			answer: "",
		},
		{ question: "What is ExpressJS?", answer: "" },
		{ question: "What is an Event Loop in Node.js?", answer: "" },
		{ question: "Describe the async/await pattern in Node apps.", answer: "" },
	],
	aws: [],
	azuredeveloper: [],
	azurearchitect: [],
});
