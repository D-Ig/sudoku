module.exports = function solveSudoku(matrix) {
  const flattenData = matrix.reduce((acc, arr) => [...acc, ...arr], []);

  const checkConditions = (candidate, index) => {
    const indexRow = Math.floor(index / 9);
    const updatedMatrix = chunkIntoMatrix(flattenData);
    if (updatedMatrix[indexRow].includes(candidate)) {
      return false;
    }
    const indexCol = index % 9;
    const colAsArray = updatedMatrix.map(arr => arr[indexCol]);
    if (colAsArray.includes(candidate)) {
      return false;
    }
    const indexGrid = defineGridIndexes(indexRow, indexCol);
    const gridAsArray = flattenData.reduce(
      (acc, element, i) => (indexGrid.includes(i) ? [...acc, element] : acc), [],
    );
    if (gridAsArray.includes(candidate)) {
      return false;
    }
    return true;
  };

  const iter = (i) => {
    if (i >= flattenData.length) {
      return true;
    }
    if (flattenData[i] !== 0) {
      return iter(i + 1);
    }
    for (let num = 1; num <= 9; num += 1) {
      if (checkConditions(num, i)) {
        flattenData[i] = num;
        if (iter(i + 1)) {
          return true;
        }
      }
    }
    flattenData[i] = 0;
    return false;
  };

  iter(0);
  return chunkIntoMatrix(flattenData);
};

const chunkIntoMatrix = (arr) => {
  const iter = (size, acc) => {
    if (size >= arr.length) {
      return acc;
    }
    const newAcc = [...acc, arr.slice(size, size + 9)];
    return iter(size + 9, newAcc);
  };
  return iter(0, []);
};

const defineGridIndexes = (row, col) => {
  if (col < 3) {
    if (row < 3) {
      return [0, 1, 2, 9, 10, 11, 18, 19, 20];
    }
    if (row < 6) {
      return [27, 28, 29, 36, 37, 38, 45, 46, 47];
    }
    return [54, 54, 56, 63, 64, 65, 72, 73, 74];
  }
  if (col < 6) {
    if (row < 3) {
      return [3, 4, 5, 12, 13, 14, 21, 22, 23];
    }
    if (row < 6) {
      return [30, 31, 32, 39, 40, 41, 48, 49, 50];
    }
    return [57, 58, 59, 66, 67, 68, 75, 76, 77];
  }
  if (row < 3) {
    return [6, 7, 8, 15, 16, 17, 24, 25, 26];
  }
  if (row < 6) {
    return [33, 34, 35, 42, 43, 44, 51, 52, 53];
  }
  return [60, 61, 62, 69, 70, 71, 78, 79, 80];
};
