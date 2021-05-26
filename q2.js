// You have an array of lists e.g.; [[1,3], ['a'], [4,5]]. We would like to obtain all the
// permutations between the lists. The answer for this example is: (1,a,4) (1,a,5) (3,a,4)
// (3,a,5). Code a program that does this for any quantity of lists and elements on them.

const EXAMPLE = [[1, 3], ["a"], [4, 5]];

function cartesian(arr1, arr2) {
  let result = [];

  arr1.forEach((x) => {
    arr2.forEach((y) => {
      // Make sure result doesn't get nested arrays by flattening X if X is an
      // array
      if (x instanceof Array) {
        result.push([...x, y]);
      } else {
        result.push([x, y]);
      }
    });
  });

  return result;
}

function wrapper(input = EXAMPLE) {
  const len = input.length;

  let aux = input[0];

  for (let i = 1; i < len; i++) {
    aux = cartesian(aux, input[i]);
  }

  console.log(aux);
}

wrapper();
