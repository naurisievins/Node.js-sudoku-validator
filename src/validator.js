class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {

    // Get array of all sudoku numbers.
    const sudokuNumberArray = sudoku
      .replaceAll(/[-+|]/g, '')
      .replaceAll(/(\n)/g, ' ')
      .replaceAll('  ', ' ')
      .trim()
      .split(' ')
      .map(Number);


    // Test if only numbers 1 - 9 are used to fill the puzzle (or 0 for empty cells).
    const isInRange = sudokuNumberArray.every((number) => number >= 0 && number < 10);
    if (!isInRange){
      return `Sudoku is invalid.`;
    }


    // Get array of sudoku row arrays.
    const sudokuRows = [];
    let row = [];

    sudokuNumberArray.forEach((number) => {
      row.push(number);

      if (row.length === 9) {
        sudokuRows.push(row);
        row = [];
      }
    })


    // Function to check for duplicate numbers or zeros in sudoku.
    let hasZero = false;

    const checkDuplicateNumbers = (numberArray) => { // For sudokuRows, sudokuColumns, sudokuSquares.
      let filteredArray, numberSet, notValid;

      numberArray.forEach(array => {
        filteredArray = array.filter(number => number !== 0); // Filter out zeros.
        numberSet = new Set(filteredArray); // Set of unique numbers.

        if (filteredArray.length !== array.length) { // Sets hasZero to true if array contained zeros.
          hasZero = true;
        }

        if (filteredArray.length !== numberSet.size) { // Sets notValid to true if array contained duplicate numbers.
          notValid = true;
        }
      })
      
      return notValid;
    }


    // Check for duplicate numbers in rows.
    if (checkDuplicateNumbers(sudokuRows)) {
      return `Sudoku is invalid.`;
    }


    // Get array of sudoku column arrays.
    const sudokuColumns = [];
    let col = [];

    for (let i = 0; i < 9; i++) {
      sudokuRows.forEach(row => col.push(row[i]))
      sudokuColumns.push(col);
      col = [];
    }


    // Check for duplicate numbers in columns.
    if (checkDuplicateNumbers(sudokuColumns)) {
      return `Sudoku is invalid.`;
    }


    // Get array of sudoku square arrays.
    const sudokuSquares = [];
    let square = [];
    let square1 = [];
    let square2 = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 3; j++) {
        square.push(sudokuRows[i][j]);
        square1.push(sudokuRows[i][j+3]);
        square2.push(sudokuRows[i][j+6]);
      }

      if(square.length === 9) {
        sudokuSquares.push(square, square1, square2);
        square = [];
        square1 = [];
        square2 = [];
      }
    }


    // Check for duplicate numbers in squares.
    if (checkDuplicateNumbers(sudokuSquares)) {
      return `Sudoku is invalid.`;
    }


    // No duplicate or invalid numbers - sudoku is valid.
    // Check for zeros in sudoku.
    if (hasZero) {
      return `Sudoku is valid but incomplete.`;
    }
    

    // All checks has been made. Sudoku is valid and complete.
    return `Sudoku is valid.`;

  }
}

module.exports = Validator
