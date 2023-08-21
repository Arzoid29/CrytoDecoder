export function createMatrix(size: number) {
    const matrix = [];
    for (let i = 0; i < size; i++) {
      matrix[i] = new Array(size).fill(0);
    }
    return matrix;
  }

  export function convertMessageToAscii(message: string) {
  let convertedMessage: number[] = [];

    for (let i = 0; i < message.length; i++) {
      const ascii = message.charCodeAt(i);
      convertedMessage.push(Number(ascii));
    }
    return convertedMessage;
  }

  export function convertAsciiToMessage(asciiArray: any) {
    let message = "";
  
    for (let i = 0; i < asciiArray.length; i++) {
      message += String.fromCharCode(asciiArray[i]);
    }
  
    return message;
  }

  export function calculateMatrixSize(numElements: number) {
    const size = Math.ceil(Math.sqrt(numElements));
    return size;
  }

  export function insertArrayIntoMatrix(matrix: Array<Array<number>>, array: Array<number>) {
    let index = 0;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (index < array.length) {
          matrix[i][j] = array[index];
          index++;
          
        } else {
          break;
        }
      }

      if (index >= array.length) {
        break;
      }
    }

    
    return matrix;
  }

  export function createKeyMatrix(size: number, maxNumber: number) {
    const matrix = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
        row.push(randomNumber);
      }
      matrix.push(row);
    }
    return matrix;
  }

  export function getReadableMatrix(matrix: any) {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    let matrixString = "[";
    for (let i = 0; i < rows; i++) {
      matrixString += "[";
      for (let j = 0; j < cols; j++) {
        const value = matrix[i][j] ?? 0;
        matrixString += value;
        if (j < cols - 1) {
          matrixString += ",";
        }
      }
      matrixString += "]";
      if (i < rows - 1) {
        matrixString += ",";
      }
    }
    matrixString += "]";
  
    return matrixString;
  }

  export function roundMatrix(matrix: number[][]) {
    return matrix.map(row => row.map(num => Math.round(num)));
  }