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

  static generateSeatNumber(req) {
    let seatNumber = '';
    const numbers = Array.from({ length: req.capacity }, (x, value) => value + 1);
    const exclude = req.takenSeats;
    exclude.push(1);
    const availableSeat = numbers.filter(value => !exclude.includes(value));

    const randomSeat = Math.floor(Math.random() * availableSeat.length);
    seatNumber = availableSeat[randomSeat];
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
