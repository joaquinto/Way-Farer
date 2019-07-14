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
}
