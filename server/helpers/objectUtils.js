/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */

export default class ObjectUtils {
  static convertSeatObjectToArray(data) {
    const result = [];
    data.map((items) => {
      Object.keys(items).map((keys) => {
        Object.keys(items[keys]).map((index) => {
          result.push(items[keys][index]);
        });
      });
    });
    return result;
  }

  static filterItem(data, value) {
    const messageList = [];
    let message = '';
    value.map((item) => {
      data.filter((seatNumber) => {
        if (seatNumber === Number(item)) {
          message = `seat number ${item} has been booked for this trip. Kindly choose another seat number.`;
          messageList.push(message);
        }
      });
    });
    return messageList;
  }

  static randomArray(limit) {
    const numberArray = [];
    for (let i = 1; i < limit + 1; i++) {
      numberArray.push(i);
    }
    return numberArray;
  }

  static generateSeatNumber(req) {
    let seatNumber = '';
    const numbers = ObjectUtils.randomArray(req.capacity);
    const exclude = req.takenSeats;
    exclude.push(1);
    const filtered = [];

    numbers.forEach((values) => {
      if (exclude.indexOf(values) === -1) {
        filtered.push(values);
      }
    });

    const randomSeat = Math.floor(Math.random() * filtered.length);
    seatNumber = filtered[randomSeat];
    return seatNumber;
  }

  static convertStringToTitle(word) {
    const sentence = word.split(' ');
    const container = [];
    let currentString = '';
    sentence.map((values) => {
      currentString = values.charAt(0).toUpperCase() + values.slice(1);
      container.push(currentString);
    });
    return container.join(' ');
  }
}
