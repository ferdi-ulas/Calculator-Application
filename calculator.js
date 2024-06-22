class Calculator {
  static isHaveOperator(value) {
    const operators = this.getOperator();
    for (let i = 0; i < value.length; i++) {
      if (operators.has(value[i])) {
        return true;
      }
    }
    return false;
  }

  static isDotHave(value) {
    return value.includes(".");
  }

  static deleteLastCharacter(value) {
    return value.slice(0, value.length - 1);
  }

  static getOperator() {
    const map = new Map();
    map.set("+", "Toplama");
    map.set("-", "Çıkarma");
    map.set("*", "Çarpma");
    map.set("/", "Bölme");

    return map;
  }
}
