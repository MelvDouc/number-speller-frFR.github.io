import { irregulars, largeNumbers } from "./numbers.js";
import { NumberTranslation } from "./types.js";

export default class NumberSpellerFrFR {
  private static readonly irregulars: NumberTranslation = irregulars;
  private static readonly largeNumbers: string[] = largeNumbers;

  private static split2DigitNumber(n: number): number[] {
    if (n === 0)
      return [];

    if (n in this.irregulars)
      return [n];

    const realTens = Math.floor(n / 10) * 10,
      realUnits = n - realTens;
    const is70or90 = realTens === 70 || realTens === 90;
    const tens = is70or90 ? realTens - 10 : realTens,
      units = is70or90 ? realUnits + 10 : realUnits;

    return [tens, units];
  }

  private static split3DigitNumber(n: number): number[] {
    if (n < 100)
      return this.split2DigitNumber(n);

    const hundreds = Math.floor(n / 100);
    const tens = n - hundreds * 100;

    const numbers = [100, ...this.split2DigitNumber(tens)];
    if (n >= 200)
      numbers.unshift(hundreds);

    return numbers;
  }

  private static spellOut3DigitNumber(group: string): string {
    const integer = parseInt(group);
    const numbersArray = this.split3DigitNumber(integer);

    return numbersArray
      .map(num => this.irregulars[num])
      .join("-")
      .replace(/(?<=\-)cent$/, "cents")
      .replace(/quatre-vingt$/, "quatre-vingts");
  }

  private static spellOutInteger(n: number | bigint): string {
    const groups = n.toLocaleString("en-US").split(",");
    const { length } = groups;
    console.log(length);

    const strArr: string[] = [];

    for (const [index, group] of groups.entries()) {
      if (group === "000")
        continue;

      const spelledGroup = this.spellOut3DigitNumber(group);
      strArr.push(spelledGroup);

      if (index === length - 1)
        break;

      if (index === length - 2) {
        strArr.push("mille");
        continue;
      }

      let largeNumber = this.largeNumbers[length - 3 - index];
      if (+group > 1)
        largeNumber += "s";
      strArr.push(largeNumber);
    }

    return strArr.join("-")
      .replace(/un\-mille/g, "mille")
      .replace(/(cents|vingts)(?=\-mille)/, match => match.slice(0, -1));
  }

  private static getLeadingZeros(decimals: string): string {
    let count = 0;

    for (const digit of decimals) {
      if (digit !== "0")
        break;
      count++;
    }

    return `${this.irregulars[0]} `.repeat(count);
  }

  /**
   * 
   * @param {number|bigint} n Un nombre entier ou décimal de valeur compatible avec les limites de JavaScript.
   * @returns {string} Le nombre en toutes lettres selon l'orthographe de 1990.
   */
  public static spell(n: number | bigint): string {
    const [integers, decimals] = String(n).split(".");
    const integerString = this.spellOutInteger(+integers);

    if (!decimals)
      return integerString;

    const leadingZeros = this.getLeadingZeros(decimals);
    const decimalString = this.spellOutInteger(+decimals);
    return `${integerString}, ${leadingZeros + decimalString}`;
  }
}