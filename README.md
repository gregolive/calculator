# Calculator

Rule 1: Don't divide by zero.

[Live demo](https://gregolive.github.io/calculator/) 👈

## Functionality

An online calculator made with Javascript.

- Chain multiple basic operations with the ×, ÷, +, and − buttons.
- Finish a calculation with the = button and continue again with the above operators.
- Clear all with the 'AC' button and delete a recent input with the 'DEL' button.
- All the above, along with numerical input, can be done via both mouse clicks and keyboard.
- Decimal output is rounded to 2 decimal points for simplicity and to aviod screen overflow.
- In progress calculations are displayed above the main output section of the screen for usability purposes.

## Reflection

This project surprised me with the amount of funcitons that were required for proper functionality and it felt like everytime I fixed one issue two more appeared in the process. Some examples of problems I hadn't considered of during the pseudocode stage included:

- Removing the ability of the user to click the delete button following an = operation and begin deleteing parts of the answers.
- Reusing an answer again following = when the user wants to continue operating on the output.
- Repeating operations when the = button is repeatedly pressed but not when the operator buttons are repeatedly pressed.

The final Javascript definitely could be optimized further and some of the functionality was implemented using what may not be best practices (i.e. counter used to handle consecutive operator buttons) and could be fine tuned later with additional practice in the language.

-Greg Olive