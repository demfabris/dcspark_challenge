// You have an array of characters (string) that may be '1', '0' o '*'. e.g. 10*00*0. The
// program needs to generate an output of all the possible combinations by replacing * with
// an 0 and 1. I.e. input> 10**0 output> 10000, 10010, 10100, 10110. Input > *0 output >
// 00, 10.
//
// While your program will take longer to run based on the number of possible combinations,
// your program shouldn't crash (or hang) on an input with many Xs.
//
// RES: I believe the optimal runtime for this scenario is O(2^n) anyway. There
// is a recursive approach but please read on to see why i would not implement
// it IRL.
//
// Or explain how you technically would approach this further.
//
// RES: On a real world scenario i would yield result values as they don't require
// the whole runtime to start popping. Note that when the variants doesn't
// contain `*` anymore they're imediately pushed to result array so we could use
// a shared buffer to get things running quicker and minimize idle time.
//
// What is the big 0 notation for your program?
//
// RES: O(2^(n-1)*s) = O(2^n)

const EXAMPLE = "1***";
const DEPTH_LIMIT = 17;

function genVariants(input) {
  // Utility function to replace it's first `*` occurence with two variants: one
  // with `0` and the other with `1`
  let variantZero = [...input];
  let variantOne = [...input];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "*") {
      variantZero.splice(i, 1, "0");
      variantOne.splice(i, 1, "1");

      return [variantZero.join(""), variantOne.join("")];
    }
  }
}

function wrapper(input = EXAMPLE) {
  if (!input) return void null;

  let starCount = [...input].reduce((acc, c) => (c === "*" ? ++acc : acc));
  if (starCount >= DEPTH_LIMIT) {
    console.log("It would take too long");
    return void null;
  }

  const hashSet = [input];
  const result = [];

  while (hashSet.length) {
    let entry = hashSet.shift();

    let [variantZero, variantOne] = genVariants(entry);

    if ([...variantZero].includes("*")) {
      hashSet.push(variantZero, variantOne);
    } else {
      result.push(variantZero, variantOne);
    }
  }

  console.log(result);
}

wrapper();
