type Combinable = number | string;
type conversionDescriptor = "as-number" | "as-text";

function add(
  i1: Combinable,
  i2: Combinable,
  resultConversion: conversionDescriptor
) {
  let result;
  if (typeof i1 === "number" && typeof i2 === "number") {
    result = i1 + i2;
  } else {
    result = i1.toString() + i2.toString();
  }

  if (resultConversion === "as-number") return +result;
  return result;
}

const combinedAges = add(1, 2);
const a3 = add("1", "2", "as-number");

const combinedNames = add("d", "y", "as-text");

function printResult(num): void {
  console.log(`Result: ${num}`);
}
