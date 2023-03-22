class Validator {
  static validate(sudoku) {
    const validator = new Validator();
    const sudokuNumberArray = validator.getSudokuNumberArray(sudoku);

    return validator.validate(sudokuNumberArray)
  }


  // Get array of all sudoku numbers.
  getSudokuNumberArray(sudoku) {
    const sudokuNumberArray = sudoku
      .replaceAll(/[-+|]/g, '') // Replace all '-', '+', '|' to ''.
      .replaceAll(/(\n\n|\n)/g, ' ') // Replace all '\n' or '\n\n' to ' '.
      .trim()
      .split(' ')
      .map(Number); // Converts each array element to number.

    return sudokuNumberArray;
  }


  // Check for duplicate numbers in sudoku.
  checkDuplicateNumbers(numberArray) { // For sudokuRows, sudokuColumns, sudokuSquares.
    let filteredArray, numberSet;
    let hasDuplicates = false;

    numberArray.forEach(array => {
      filteredArray = array.filter(number => number !== 0); // Filter out zeros.
      numberSet = new Set(filteredArray); // Set of unique numbers.

      if (filteredArray.length !== numberSet.size) { // Sets hasDuplicates to true if array contained duplicate numbers.
        hasDuplicates = true;
      }
    })
    
    return hasDuplicates;
  }


  // Check for zeros in sudoku.
  checkZeros(sudokuNumberArray) {
    if (sudokuNumberArray.includes(0)) {
      return true
    }
  }

  // Validate sudoku.
  validate(sudokuNumberArray) {

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

      if (row.length === 9) { // 9 for numbers in row.
        sudokuRows.push(row);
        row = [];
      }
    })


    // Check for duplicate numbers in rows.
    if (this.checkDuplicateNumbers(sudokuRows)) {
      return `Sudoku is invalid.`;
    }


    // Get array of sudoku column arrays.
    const sudokuColumns = [];
    let col = [];

    for (let i = 0; i < 9; i++) { // 9 for numbers in column.
      sudokuRows.forEach(row => col.push(row[i]))
      sudokuColumns.push(col);
      col = [];
    }


    // Check for duplicate numbers in columns.
    if (this.checkDuplicateNumbers(sudokuColumns)) {
      return `Sudoku is invalid.`;
    }


    // Get array of sudoku square arrays.
    const sudokuSquares = [];
    let square = [];
    let square1 = [];
    let square2 = [];

    for (let i = 0; i < 9; i++) { // 9 for rows in sudoku.
      for (let j = 0; j < 3; j++) {
        square.push(sudokuRows[i][j]); // Iterating through row gets first 3 of 9 numbers of row.
        square1.push(sudokuRows[i][j+3]); // Iterating through row gets middle 3 of 9 numbers of row.
        square2.push(sudokuRows[i][j+6]); // Iterating through row gets last 3 of 9 numbers of row.
      }

      if(square.length === 9) { // 9 for numbers in square.
        sudokuSquares.push(square, square1, square2);
        square = [];
        square1 = [];
        square2 = [];
      }
    }


    // Check for duplicate numbers in squares.
    if (this.checkDuplicateNumbers(sudokuSquares)) {
      return `Sudoku is invalid.`;
    }


    // No duplicate or invalid numbers - sudoku is valid.
    // Check for zeros in sudoku.
    if (this.checkZeros(sudokuNumberArray)) {
      return `Sudoku is valid but incomplete.`;
    }
    

    // All checks has been made. Sudoku is valid and complete.
    return `Sudoku is valid.`;

  }
}

module.exports = Validator
