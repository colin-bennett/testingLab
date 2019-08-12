let { ChangeHandler } = require("../src/changehandler");

describe("Tests for ChangeHandler", function() {
  // Set up a test below...
  test("The ChangeHandler class is defined.", function() {
    // Remember, you can arrange, act, and assert...start small
    expect(ChangeHandler).toBeDefined();
  });

  //   Constructor_______________________________________________________
  test("amountDue is set based on an argument.", function() {
    // Arrange
    let vendingMachine = new ChangeHandler(105);
    // Assert
    expect(vendingMachine.amountDue).toBe(105);
  });

  test("cashTendered is set to 0", function() {
    let vendingMachine = new ChangeHandler();
    expect(vendingMachine.cashTendered).toBe(0);
  });

  //   insertCoin_______________________________________________________
  test("Inserting a quarter adds 25 to cashTendered.", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("quarter");
    expect(vendingMachine.cashTendered).toBe(25);
  });

  test("Inserting a dime adds 10 to cashTendered.", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("dime");
    expect(vendingMachine.cashTendered).toBe(10);
  });

  test("Inserting a nickel adds 5 to cashTendered.", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("nickel");
    expect(vendingMachine.cashTendered).toBe(5);
  });

  test("Inserting a penny adds 1 to cashTendered.", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("penny");
    expect(vendingMachine.cashTendered).toBe(1);
  });

  test("Calling function multiple times continues to add on to the amount", function() {
    // Arrange
    const vendingMachine = new ChangeHandler(105);
    // Act
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("dime");
    vendingMachine.insertCoin("nickel");
    vendingMachine.insertCoin("penny");
    // Act & Assert
    expect(vendingMachine.cashTendered).toBe(41);
  });

  //   isPaymentSufficient_______________________________________________
  test("Returns true if cashTendered more than amountDue.", function() {
    // Arrange
    const vendingMachine = new ChangeHandler(130);
    //   Act
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    // Act & Assign
    expect(vendingMachine.isPaymentSufficient()).toBe(true);
  });

  test("Returns false if cashTendered is less than amountDue.", function() {
    const vendingMachine = new ChangeHandler(100);
    vendingMachine.insertCoin("dime");
    vendingMachine.insertCoin("dime");
    vendingMachine.insertCoin("dime");
    vendingMachine.insertCoin("dime");
    expect(vendingMachine.isPaymentSufficient()).toBe(false);
  });

  test("Returns true if cashTendered is equal to amountDue.", function() {
    const vendingMachine = new ChangeHandler(40);
    vendingMachine.insertCoin("dime");
    vendingMachine.insertCoin("dime");
    vendingMachine.insertCoin("dime");
    vendingMachine.insertCoin("dime");
    expect(vendingMachine.isPaymentSufficient()).toBe(true);
  });

  //   giveChange_______________________________________________________
  test("32 change produces: quarters: 1, dimes: 0, nickels: 1, pennies: 2.", function() {
    //   Arrange
    const vendingMachine = new ChangeHandler(100);
    // Act
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("nickel");
    vendingMachine.insertCoin("penny");
    vendingMachine.insertCoin("penny");
    // Act & Assign
    expect(vendingMachine.giveChange()).toEqual({
      quarters: 1,
      dimes: 0,
      nickels: 1,
      pennies: 2
    });
  });

  test("10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0.", function() {
    //   Arrange
    const vendingMachine = new ChangeHandler(115);
    // Act
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    // Act & Assign
    expect(vendingMachine.giveChange()).toEqual({
      quarters: 0,
      dimes: 1,
      nickels: 0,
      pennies: 0
    });
  });

  test("27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2", function() {
    const vendingMachine = new ChangeHandler(73);
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    expect(vendingMachine.giveChange()).toEqual({
      quarters: 1,
      dimes: 0,
      nickels: 0,
      pennies: 2
    });
  });

  test("68 change produces: quarters: 2, dimes: 1, nickels: 1, pennies: 3", function() {
    const vendingMachine = new ChangeHandler(132);
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");

    expect(vendingMachine.giveChange()).toEqual({
      quarters: 2,
      dimes: 1,
      nickels: 1,
      pennies: 3
    });
  });
});
