import chalk from "chalk";

console.log(
  chalk.blue(
    '------------  1. Check if a string is a palindrome  ---------------'
  )
);

function isPalindrome(str) {
  const standardizedStr = str.toLowerCase().replace(/[\.|?|!|,| ]/g, '');
  const reversedStr = standardizedStr.split('').reverse().join('');
  return standardizedStr === reversedStr;
}

console.log(isPalindrome('A man, a plan, a canal, Panama!')); // true
console.log(isPalindrome('Was it a car or a cat I saw?')); // true
console.log(isPalindrome('Hello World!'));



console.log(
  chalk.blue(
    '------------  2. Reverse a String  ---------------'
  )
);

function reverseString(str) {
  const reversed = str.split('').reverse().join('');
  return reversed;
}

console.log(reverseString('Duudde!!. Just testing.'));



console.log(
  chalk.blue(
    '------------  3. Find the Longest Palindromic Substring  ---------------'
  )
);
function longestPalindromicString(str) {
  let longsetPld = '';

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < str.length; j++) {
      const subString = str.slice(i, j);
      if (isPalindrome(subString) && subString.length > longsetPld.length) {
        longsetPld = subString;
      }
    }
  }

  return longsetPld;
}

console.log(longestPalindromicString('babad')); // bab or aba
console.log(longestPalindromicString('cbbd')); // bb


console.log(
  chalk.blue(
    '------------  4. Check if Two Strings are Anagrams  ---------------'
  )
);
function areAnagrams(str1, str2) {
  return (
    str1.toLowerCase().split('').sort().join('') ===
    str2.toLowerCase().split('').sort().join('')
  );
}

console.log(areAnagrams('Listen', 'Silent')); // Output: true
console.log(areAnagrams('Hello', 'World')); // Output: false


console.log(
  chalk.blue(
    '------------  5. Remove Duplicates from a String  ---------------'
  )
);

function removeDuplicates(str) {
  const splitString = str.split('');
  const newString = [];
  splitString.forEach((letter) => {
    if (!newString.includes(letter)) {
      newString.push(letter);
    }
  });
  return newString.join('');
}

console.log(removeDuplicates('programming')); // Output: 'progamin'
console.log(removeDuplicates('hello world')); // Output: 'helo wrd'
console.log(removeDuplicates('aaaaa')); // Output: 'a'
console.log(removeDuplicates('abcd')); // Output: 'abcd'
console.log(removeDuplicates('aabbcc')); // Output: 'abc'


console.log(
  chalk.blue(
    '------------  6. Count Palindromes in a String  ---------------'
  )
);

function countPalindromes(str) {
  let plds = 0;

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      const subStr = str.slice(i, j);
      if (isPalindrome(subStr)) {
        plds++;
      }
    }
  }

  return plds;
}

console.log(countPalindromes('ababa'));    // Expected Output: 7
console.log(countPalindromes('racecar')); // Expected Output: 7
console.log(countPalindromes('aabb'));    // Expected Output: 4
console.log(countPalindromes('a'));       // Expected Output: 1
console.log(countPalindromes('abc'));     // Expected Output: 3


console.log(
  chalk.blue(
    '------------  7. Longest Common Prefix  ---------------'
  )
);

function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // Output: 'f1'
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); // Output: ''
console.log(longestCommonPrefix(['interspecies', 'interstellar', 'interstate'])); //
console.log(longestCommonPrefix(['prefix', 'prefixes', 'preform'])); //
console.log(longestCommonPrefix(['apple', 'banana', 'cherry']));  // Output: ''

console.log(
  chalk.blue(
    '------------  8. Case Insensitive Palindrome  ---------------'
  )
);

function isCaseInsensitivePalindrome(str) {
  const lowerStr = str.toLowerCase();
  return lowerStr === lowerStr.split('').reverse().join('');
}

console.log(isCaseInsensitivePalindrome('Aba')); // Output: true
console.log(isCaseInsensitivePalindrome('Racecar')); // Output: true
console.log(isCaseInsensitivePalindrome('Palindrome')); // Output: false
console.log(isCaseInsensitivePalindrome('Madam')); // Output: true
console.log(isCaseInsensitivePalindrome('Hello')); // Output: false